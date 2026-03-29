import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

const FUNC_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/domain-management`;

async function callDomainApi(body: Record<string, any>) {
  const res = await fetch(FUNC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export function useDomainTransfer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const transfer = useCallback(async (data: {
    domain: string;
    eppcode: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address1?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    regperiod?: number;
    nameservers?: string[];
    razorpayPaymentId?: string;
    paymentMethod?: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callDomainApi({ action: 'DomainTransfer', ...data });
      if (res.success) {
        setResult(res);
      } else {
        setError(res.error || res.message || 'Transfer failed');
      }
      return res;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { transfer, loading, error, result };
}

export function useNameservers() {
  const [loading, setLoading] = useState(false);
  const [nameservers, setNameservers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getNameservers = useCallback(async (domain: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callDomainApi({ action: 'GetNameservers', domain });
      const ns = [res.ns1, res.ns2, res.ns3, res.ns4, res.ns5].filter(Boolean);
      setNameservers(ns);
      return ns;
    } catch (e: any) {
      setError(e.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNameservers = useCallback(async (domain: string, ns: string[]) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callDomainApi({ action: 'UpdateNameservers', domain, nameservers: ns });
      if (res.result === 'success') {
        setNameservers(ns);
      } else {
        setError(res.message || 'Failed to update nameservers');
      }
      return res;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { nameservers, getNameservers, updateNameservers, loading, error };
}

export function useWhoisInfo() {
  const [loading, setLoading] = useState(false);
  const [whoisData, setWhoisData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getWhois = useCallback(async (domain: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callDomainApi({ action: 'GetWhoisInfo', domain });
      setWhoisData(res);
      return res;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateWhois = useCallback(async (domain: string, contactdetails: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callDomainApi({ action: 'UpdateWhoisInfo', domain, contactdetails });
      if (res.result === 'success') {
        setWhoisData(contactdetails);
      } else {
        setError(res.message || 'Failed to update WHOIS info');
      }
      return res;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { whoisData, getWhois, updateWhois, loading, error };
}

export function useDomainRenewal() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const renew = useCallback(async (domain: string, regperiod = 1, razorpayPaymentId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callDomainApi({ action: 'DomainRenew', domain, regperiod, razorpayPaymentId });
      if (res.result !== 'success') {
        setError(res.message || 'Renewal failed');
      }
      return res;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { renew, loading, error };
}

export function useTLDPricing() {
  const [loading, setLoading] = useState(false);
  const [pricing, setPricing] = useState<any>(null);

  const fetchPricing = useCallback(async () => {
    setLoading(true);
    try {
      const res = await callDomainApi({ action: 'GetTLDPricing' });
      setPricing(res.pricing || res);
      return res;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { pricing, fetchPricing, loading };
}

export function useClientDomains() {
  const [loading, setLoading] = useState(false);
  const [domains, setDomains] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchDomains = useCallback(async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await callDomainApi({ action: 'GetClientDomains', email });
      const domainList = res.domains?.domain || [];
      setDomains(Array.isArray(domainList) ? domainList : [domainList]);
      return res;
    } catch (e: any) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { domains, fetchDomains, loading, error };
}
