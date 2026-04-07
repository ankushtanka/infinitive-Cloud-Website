// ============================================================
// WHMCS Middleware Integration
// Direct calls to middleware — no edge function proxy needed
// ============================================================

const MIDDLEWARE_URL = 'https://client.infinitivecloud.com/middleware/domainMiddleware.php';

// ============================================================
// TYPES
// ============================================================

export interface TLDPricing {
  register: string | null;
  transfer: string | null;
  renew: string | null;
}

export interface WhmcsDomainResult {
  domain: string;
  tld: string;
  available: boolean;
  status: 'available' | 'unavailable';
  message: string;
  pricing: TLDPricing;
}

export interface BulkSearchResult {
  result: 'success' | 'error';
  name: string;
  total: number;
  available: number;
  unavailable: number;
  domains: WhmcsDomainResult[];
  message?: string;
}

export interface Product {
  pid: number;
  name: string;
  description: string;
  groupname: string;
  type: string;
  pricing: Record<string, string>;
  price_monthly: string | null;
  price_annually: string | null;
}

export interface ProductsResult {
  result: 'success' | 'error';
  products: Product[];
  groups: any[];
  count: number;
  message?: string;
}

export interface InvoiceData {
  id: number;
  date: string;
  duedate: string;
  subtotal: string;
  tax: string;
  total: string;
  status: string;
  payment_url: string;
}

export interface RazorpayData {
  amount: number;
  currency: string;
  description: string;
  order_id: number | string;
  invoice_id: number | string;
  prefill: { name: string; email: string; contact: string };
  notes: Record<string, any>;
}

export interface OrderItem {
  category: 'domain' | 'hosting';
  label: string;
  icon: 'globe' | 'server';
  name: string;
  action: string;
  period: string;
  price_formatted: string;
  subtitle: string;
  description: string;
  amount: number;
}

export interface OrderResult {
  result: 'success' | 'error';
  message: string;
  order_id?: number;
  order_num?: string;
  invoice_id?: number;
  client_id?: number;
  is_new_client?: boolean;
  password?: string;
  domain?: string;
  product_id?: number;
  billing_cycle?: string;
  invoice?: InvoiceData;
  razorpay?: RazorpayData;
  items?: OrderItem[];
  total?: string;
}

export interface OrderPayload {
  clientid?: number;
  firstname?: string;
  lastname?: string;
  email?: string;
  password2?: string;
  phonenumber?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
  domain?: string;
  domain_action?: 'register' | 'transfer';
  regperiod?: number;
  eppcode?: string;
  pid?: number;
  billingcycle?: 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
  paymentmethod?: string;
  priceoverride?: number;
  domainpriceoverride?: number;
}

export interface ValidateLoginResult {
  result: 'success' | 'error';
  userid?: number;
  clientid?: number;
  message?: string;
  client?: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phonenumber?: string;
    companyname?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    domains?: any[];
  };
}

// ============================================================
// API FUNCTIONS
// ============================================================

const toPositiveNumber = (value: unknown): number | undefined => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
};

function normalizeOrderResult(result: any): OrderResult {
  if (!result || typeof result !== 'object') return result;

  return {
    ...result,
    order_id: toPositiveNumber(result.order_id),
    invoice_id: toPositiveNumber(result.invoice_id),
    client_id: toPositiveNumber(result.client_id),
    items: Array.isArray(result.items) ? result.items : [],
    total:
      result.total == null || result.total === ''
        ? undefined
        : Number(result.total).toFixed(2),
  };
}

function normalizeValidateLoginResult(result: any, requestedEmail: string): ValidateLoginResult {
  if (!result || result.result !== 'success') {
    return {
      result: 'error',
      message: result?.message || 'Invalid email or password.',
    };
  }

  const userid = toPositiveNumber(result.userid ?? result.clientid);
  if (!userid) {
    return {
      result: 'error',
      message: result?.message || 'Login succeeded but no client account was returned.',
    };
  }

  const client = result.client ?? {
    firstname: result.firstname,
    lastname: result.lastname,
    email: result.email,
    phonenumber: result.phonenumber,
    companyname: result.companyname,
    address1: result.address1,
    address2: result.address2,
    city: result.city,
    state: result.state,
    postcode: result.postcode,
    country: result.country,
    domains: result.domains,
  };

  return {
    result: 'success',
    userid,
    clientid: userid,
    message: result.message,
    client: {
      firstname: client?.firstname || '',
      lastname: client?.lastname || '',
      email: client?.email || requestedEmail,
      phonenumber: client?.phonenumber || '',
      companyname: client?.companyname || '',
      address1: client?.address1 || '',
      address2: client?.address2 || '',
      city: client?.city || '',
      state: client?.state || '',
      postcode: client?.postcode || '',
      country: client?.country || 'IN',
      domains: Array.isArray(client?.domains) ? client.domains : [],
    },
  };
}

async function api(action: string, body: Record<string, any> = {}, retries = 2): Promise<any> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(MIDDLEWARE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://infinitivecloud.com/',
          'Origin': 'https://infinitivecloud.com',
        },
        body: JSON.stringify({ action, ...body }),
      });
      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        console.error(`Middleware ${action} attempt ${attempt + 1} returned non-JSON (${res.status}):`, text.substring(0, 500));
        if (attempt < retries) {
          await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
          continue;
        }
        throw new Error(`Server returned an unexpected response. Please try again.`);
      }
      if (!res.ok) {
        console.error(`Middleware ${action} failed (${res.status}):`, data);
        throw new Error(data?.message || `HTTP ${res.status}: order failed`);
      }
      return data;
    } catch (err: any) {
      if (err.message?.includes('HTTP') || err.message?.includes('Server returned')) throw err;
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
}

/** Bulk search across all configured TLDs */
export async function bulkDomainSearch(name: string): Promise<BulkSearchResult> {
  return api('bulk_search', { name });
}

/** Get all hosting products with live pricing */
export async function fetchProducts(): Promise<ProductsResult> {
  return api('get_products');
}

/** Place a complete order — returns invoice + Razorpay checkout data */
export async function placeOrder(payload: OrderPayload): Promise<OrderResult> {
  const result = await api('complete_order', payload);
  return normalizeOrderResult(result);
}

/** Validate client login */
export async function validateLogin(email: string, password: string): Promise<ValidateLoginResult> {
  const result = await api('validate_login', { email, password });
  return normalizeValidateLoginResult(result, email);
}

/** Get client invoices */
export async function getInvoices(clientid: number) {
  return api('get_invoices', { clientid });
}

/** Get TLD-specific pricing */
export async function getTldPricing(tld: string) {
  return api('get_tld_pricing', { tld });
}

/** Get single invoice details with line items */
export async function getInvoiceDetails(invoiceid: number) {
  return api('get_invoice', { invoiceid });
}
