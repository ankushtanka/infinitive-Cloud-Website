export const WHMCS_BASE = 'https://client.infinitivecloud.com';

export const WHMCS_LOGIN_URL = `${WHMCS_BASE}/login.php`;
export const WHMCS_REGISTER_URL = `${WHMCS_BASE}/register.php`;
export const WHMCS_CLIENT_AREA_URL = `${WHMCS_BASE}/clientarea.php`;
export const WHMCS_DOMAIN_REGISTER_URL = `${WHMCS_BASE}/cart.php?a=add&domain=register`;

/** Direct add-to-cart link for a known WHMCS product ID */
export function whmcsCartUrl(pid: number): string {
  return `${WHMCS_BASE}/cart.php?a=add&pid=${pid}`;
}

/** Domain registration link — passes the searched domain name to WHMCS */
export function whmcsDomainUrl(domain: string): string {
  const [sld, ...tldParts] = domain.split('.');
  const tld = '.' + tldParts.join('.');
  return `${WHMCS_BASE}/cart.php?a=add&domain=register&query=${encodeURIComponent(sld)}&tld=${encodeURIComponent(tld)}`;
}
