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
  order_id: number;
  invoice_id: number;
  prefill: { name: string; email: string; contact: string };
  notes: Record<string, any>;
}

export interface OrderResult {
  result: 'success' | 'error';
  message: string;
  order_id?: number;
  invoice_id?: number;
  client_id?: number;
  is_new_client?: boolean;
  password?: string;
  domain?: string;
  product_id?: number;
  billing_cycle?: string;
  invoice?: InvoiceData;
  razorpay?: RazorpayData;
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
}

export interface ValidateLoginResult {
  result: 'success' | 'error';
  userid?: number;
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

async function post(action: string, body: Record<string, any> = {}): Promise<any> {
  const res = await fetch(MIDDLEWARE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...body }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Middleware POST ${action} failed (${res.status}):`, text.substring(0, 300));
    throw new Error(`HTTP ${res.status}: middleware returned error`);
  }
  return res.json();
}

async function get(action: string, params: Record<string, string> = {}): Promise<any> {
  const qs = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${MIDDLEWARE_URL}?${qs}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/** Bulk search across all configured TLDs */
export async function bulkDomainSearch(name: string): Promise<BulkSearchResult> {
  return get('bulk_search', { name });
}

/** Get all hosting products with live pricing */
export async function fetchProducts(): Promise<ProductsResult> {
  return get('get_products');
}

/** Place a complete order — returns invoice + Razorpay checkout data */
export async function placeOrder(payload: OrderPayload): Promise<OrderResult> {
  return post('complete_order', payload);
}

/** Validate client login */
export async function validateLogin(email: string, password: string): Promise<ValidateLoginResult> {
  return get('validate_login', { email, password });
}

/** Get client invoices */
export async function getInvoices(clientid: number) {
  return get('get_invoices', { clientid: String(clientid) });
}

/** Get TLD-specific pricing */
export async function getTldPricing(tld: string) {
  return get('get_tld_pricing', { tld });
}
