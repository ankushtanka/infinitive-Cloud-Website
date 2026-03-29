import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';

async function callMiddleware(params: Record<string, string>): Promise<any> {
  const url = `${MIDDLEWARE_URL}?${new URLSearchParams(params).toString()}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    const text = await res.text();
    try { return JSON.parse(text); } catch { console.error('Non-JSON response:', text.substring(0, 500)); return null; }
  } finally { clearTimeout(timer); }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action } = body;

    if (!action) {
      return new Response(JSON.stringify({ error: 'Missing action parameter' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    let result: any;

    switch (action) {
      case 'DomainTransfer': {
        const { domain, eppcode, firstName, lastName, email, phone, address1, city, state, postcode, country, regperiod } = body;
        if (!domain || !eppcode || !email) {
          return new Response(JSON.stringify({ error: 'domain, eppcode, and email are required' }), {
            status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Create or get client
        const clientData = await callMiddleware({
          action: 'AddClient',
          firstname: firstName || 'Domain',
          lastname: lastName || 'Transfer',
          email,
          phonenumber: phone || '',
          address1: address1 || '',
          city: city || '',
          state: state || '',
          postcode: postcode || '',
          country: country || 'IN',
          password2: crypto.randomUUID().slice(0, 16),
        });

        let clientId: number;
        if (clientData?.result === 'success') {
          clientId = clientData.clientid;
        } else if (clientData?.message?.toLowerCase().includes('duplicate') || clientData?.message?.toLowerCase().includes('already exists')) {
          const existing = await callMiddleware({ action: 'GetClientsDetails', email });
          if (existing?.result === 'success') {
            clientId = existing.id || existing.userid || existing.client?.id;
          } else {
            return new Response(JSON.stringify({ error: 'Failed to find existing client' }), {
              status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
          }
        } else {
          return new Response(JSON.stringify({ error: 'Failed to create client', details: clientData }), {
            status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Place transfer order
        const orderParams: Record<string, string> = {
          action: 'AddOrder',
          clientid: String(clientId),
          paymentmethod: body.paymentMethod || 'razorpay',
          'domains[0]': domain,
          'domaintype[0]': 'transfer',
          'regperiod[0]': String(regperiod || 1),
          'eppcode[0]': eppcode,
        };

        if (body.nameservers) {
          const ns = body.nameservers.filter((n: string) => n.trim());
          ns.forEach((n: string, i: number) => { orderParams[`nameserver${i + 1}`] = n.trim(); });
        }

        result = await callMiddleware(orderParams);

        if (result?.result === 'success' && body.razorpayPaymentId && result.invoiceid) {
          await callMiddleware({
            action: 'AddInvoicePayment',
            invoiceid: String(result.invoiceid),
            transid: body.razorpayPaymentId,
            gateway: 'razorpay',
          });
          await callMiddleware({
            action: 'AcceptOrder',
            orderid: String(result.orderid),
          });
        }

        return new Response(JSON.stringify({
          success: result?.result === 'success',
          orderId: result?.orderid,
          invoiceId: result?.invoiceid,
          clientId,
          message: result?.message || (result?.result === 'success' ? 'Transfer initiated successfully' : 'Transfer failed'),
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      case 'GetNameservers': {
        const { domain } = body;
        if (!domain) {
          return new Response(JSON.stringify({ error: 'domain is required' }), {
            status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        result = await callMiddleware({ action: 'DomainGetNameservers', domain });
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'UpdateNameservers': {
        const { domain, nameservers } = body;
        if (!domain || !nameservers || !Array.isArray(nameservers)) {
          return new Response(JSON.stringify({ error: 'domain and nameservers array required' }), {
            status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        const nsParams: Record<string, string> = { action: 'DomainUpdateNameservers', domain };
        nameservers.forEach((ns: string, i: number) => { nsParams[`ns${i + 1}`] = ns.trim(); });
        result = await callMiddleware(nsParams);
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'GetWhoisInfo': {
        const { domain } = body;
        if (!domain) {
          return new Response(JSON.stringify({ error: 'domain is required' }), {
            status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        result = await callMiddleware({ action: 'DomainWhois', domain });
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'UpdateWhoisInfo': {
        const { domain, contactdetails } = body;
        if (!domain || !contactdetails) {
          return new Response(JSON.stringify({ error: 'domain and contactdetails required' }), {
            status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        const whoisParams: Record<string, string> = { action: 'DomainUpdateWhoisInfo', domain };
        // Flatten contact details for WHMCS
        for (const [type, fields] of Object.entries(contactdetails as Record<string, Record<string, string>>)) {
          for (const [key, value] of Object.entries(fields)) {
            whoisParams[`contactdetails[${type}][${key}]`] = value;
          }
        }
        result = await callMiddleware(whoisParams);
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'DomainRenew': {
        const { domain, regperiod, email } = body;
        if (!domain) {
          return new Response(JSON.stringify({ error: 'domain is required' }), {
            status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        result = await callMiddleware({
          action: 'DomainRenew',
          domain,
          regperiod: String(regperiod || 1),
        });

        if (result?.result === 'success' && body.razorpayPaymentId && result.invoiceid) {
          await callMiddleware({
            action: 'AddInvoicePayment',
            invoiceid: String(result.invoiceid),
            transid: body.razorpayPaymentId,
            gateway: 'razorpay',
          });
        }

        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'GetTLDPricing': {
        result = await callMiddleware({ action: 'GetTLDPricing' });
        return new Response(JSON.stringify(result), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'GetClientDomains': {
        const { email } = body;
        if (!email) {
          return new Response(JSON.stringify({ error: 'email is required' }), {
            status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        // Get client ID first
        const clientInfo = await callMiddleware({ action: 'GetClientsDetails', email });
        if (clientInfo?.result !== 'success') {
          return new Response(JSON.stringify({ error: 'Client not found', domains: [] }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        const cid = clientInfo.id || clientInfo.userid || clientInfo.client?.id;
        result = await callMiddleware({ action: 'GetClientsDomains', clientid: String(cid), limitnum: '100' });
        return new Response(JSON.stringify({
          ...result,
          clientId: cid,
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }

      default:
        return new Response(JSON.stringify({ error: `Unknown action: ${action}` }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
  } catch (error) {
    console.error('Domain management error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', message: error.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
