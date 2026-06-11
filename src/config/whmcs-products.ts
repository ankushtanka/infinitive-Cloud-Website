// WHMCS product catalog configuration.
// Set `pid` to the WHMCS product ID for each plan.
// Plans with pid: null display static fallback prices and link to /contact.

export interface PlanConfig {
  pid: number | null;
  name: string;
  popular?: boolean;
  specs?: string[];
  features: string[];
  fallbackMonthly: number;
  fallbackAnnually: number;
  originalPrice: number;
}

export interface CategoryConfig {
  id: string;
  title: string;
  description: string;
  cartType: string;
  plans: PlanConfig[];
}

export const PRODUCT_CATEGORIES: CategoryConfig[] = [
  {
    id: "web-hosting",
    title: "Web Hosting",
    description: "Blazing-fast SSD hosting with free domain, SSL & AI tools",
    cartType: "shared-hosting",
    plans: [
      {
        pid: 1,
        name: "Starter",
        // PID 1 = Starter (confirmed)
        fallbackMonthly: 199,
        fallbackAnnually: 1428,
        originalPrice: 199,
        features: [
          "1 Website",
          "10 GB NVMe SSD",
          "Free SSL Certificate",
          "2 Email Accounts",
          "LiteSpeed Web Server",
          "Daily Automatic Backups",
          "Imunify360 Security",
          "Free Migration",
          "24/7 Support",
        ],
      },
      {
        pid: 2,
        name: "Premium",
        // PID 2 = Premium (confirmed)
        fallbackMonthly: 349,
        fallbackAnnually: 2628,
        originalPrice: 349,
        features: [
          "5 Websites",
          "30 GB NVMe SSD",
          "Free Domain (1 Year)",
          "Free SSL & CDN",
          "25 Email Accounts",
          "Daily Automatic Backups",
          "LiteSpeed Web Server",
          "24/7 Support",
          "Imunify360 Security",
        ],
      },
      {
        pid: 3,
        name: "Business",
        popular: true,
        // PID 3 = Business (confirmed)
        fallbackMonthly: 549,
        fallbackAnnually: 4188,
        originalPrice: 549,
        features: [
          "Unlimited Websites",
          "100 GB NVMe SSD",
          "Free Domain (1 Year)",
          "Free SSL & CDN",
          "Unlimited Email Accounts",
          "Daily Automatic Backups",
          "Staging Environment",
          "Priority 24/7 Support",
          "Imunify360 Security",
        ],
      },
    ],
  },
  {
    id: "cloud-hosting",
    title: "Cloud Hosting",
    description: "Fully managed cloud with 20x more resources, dedicated IPs & priority support",
    cartType: "cloud-hosting",
    plans: [
      {
        pid: null, // TODO: set WHMCS product ID for Cloud Startup
        name: "Cloud Startup",
        specs: ["2 CPU Cores", "4 GB RAM", "100 GB NVMe"],
        fallbackMonthly: 469,
        fallbackAnnually: 5628,
        originalPrice: 2351,
        features: [
          "100 Websites",
          "Dedicated IP Address",
          "Priority 24/7 Support",
          "Free SSL & CDN",
          "Daily Backups",
          "100 PHP Workers",
          "99.9% Uptime SLA",
          "Free Domain (1 Year)",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for Cloud Professional
        name: "Cloud Professional",
        popular: true,
        specs: ["4 CPU Cores", "8 GB RAM", "200 GB NVMe"],
        fallbackMonthly: 699,
        fallbackAnnually: 8388,
        originalPrice: 3527,
        features: [
          "200 Websites",
          "Dedicated IP Address",
          "Priority 24/7 Support",
          "Free SSL & CDN",
          "Daily Backups",
          "200 PHP Workers",
          "99.9% Uptime SLA",
          "Free Domain (1 Year)",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for Cloud Enterprise
        name: "Cloud Enterprise",
        specs: ["8 CPU Cores", "16 GB RAM", "300 GB NVMe"],
        fallbackMonthly: 1169,
        fallbackAnnually: 14028,
        originalPrice: 5879,
        features: [
          "300 Websites",
          "Dedicated IP Address",
          "Priority 24/7 Support",
          "Free SSL & CDN",
          "Daily Backups",
          "300 PHP Workers",
          "99.9% Uptime SLA",
          "Free Domain (1 Year)",
        ],
      },
    ],
  },
  {
    id: "vps-hosting",
    title: "VPS Hosting",
    description: "Full root access on AMD EPYC-powered servers with NVMe SSD",
    cartType: "vps-hosting",
    plans: [
      {
        pid: null, // TODO: set WHMCS product ID for KVM 1
        name: "KVM 1",
        specs: ["1 vCPU Core", "4 GB RAM", "50 GB NVMe"],
        fallbackMonthly: 335,
        fallbackAnnually: 4020,
        originalPrice: 1175,
        features: [
          "4 TB Bandwidth",
          "1 Gbps Network Speed",
          "Free Weekly Backups",
          "Free Snapshot",
          "Dedicated IP",
          "Full Root Access",
          "AMD EPYC Processor",
          "Firewall Management",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for KVM 2
        name: "KVM 2",
        popular: true,
        specs: ["2 vCPU Cores", "8 GB RAM", "100 GB NVMe"],
        fallbackMonthly: 469,
        fallbackAnnually: 5628,
        originalPrice: 1511,
        features: [
          "8 TB Bandwidth",
          "1 Gbps Network Speed",
          "Free Weekly Backups",
          "Free Snapshot",
          "Dedicated IP",
          "Full Root Access",
          "AMD EPYC Processor",
          "Firewall Management",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for KVM 4
        name: "KVM 4",
        specs: ["4 vCPU Cores", "16 GB RAM", "200 GB NVMe"],
        fallbackMonthly: 669,
        fallbackAnnually: 8028,
        originalPrice: 2519,
        features: [
          "16 TB Bandwidth",
          "1 Gbps Network Speed",
          "Free Weekly Backups",
          "Free Snapshot",
          "Dedicated IP",
          "Full Root Access",
          "AMD EPYC Processor",
          "Firewall Management",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for KVM 8
        name: "KVM 8",
        specs: ["8 vCPU Cores", "32 GB RAM", "400 GB NVMe"],
        fallbackMonthly: 1339,
        fallbackAnnually: 16068,
        originalPrice: 5039,
        features: [
          "32 TB Bandwidth",
          "1 Gbps Network Speed",
          "Free Weekly Backups",
          "Free Snapshot",
          "Dedicated IP",
          "Full Root Access",
          "AMD EPYC Processor",
          "Firewall Management",
        ],
      },
    ],
  },
  {
    id: "wordpress-hosting",
    title: "WordPress Hosting",
    description: "Managed WordPress with AI tools, auto-updates & staging environments",
    cartType: "wordpress-hosting",
    plans: [
      {
        pid: null, // TODO: set WHMCS product ID for WordPress Premium
        name: "Premium",
        fallbackMonthly: 129,
        fallbackAnnually: 1548,
        originalPrice: 1091,
        features: [
          "Up to 3 Websites",
          "20 GB SSD Storage",
          "Free Domain (1 Year)",
          "Free SSL Certificate",
          "Weekly Auto Backups",
          "Managed WordPress",
          "Free Site Migration",
          "2 Email Accounts/Site",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for WordPress Business + AI
        name: "Business + AI",
        popular: true,
        fallbackMonthly: 199,
        fallbackAnnually: 2388,
        originalPrice: 1595,
        features: [
          "Up to 50 Websites",
          "50 GB NVMe Storage",
          "AI Website Builder",
          "AI Agent for WordPress",
          "AI Troubleshooter",
          "Daily Backups",
          "WordPress Staging Tool",
          "Free CDN & SSL",
          "5 Email Accounts/Site",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for WordPress Cloud Startup + AI
        name: "Cloud Startup + AI",
        fallbackMonthly: 469,
        fallbackAnnually: 5628,
        originalPrice: 2351,
        features: [
          "Up to 100 Websites",
          "100 GB NVMe Storage",
          "4 GB RAM & 2 CPU Cores",
          "AI Tools Included",
          "Dedicated IP Address",
          "Priority 24/7 Support",
          "100 PHP Workers",
          "Daily Backups",
          "10 Email Accounts/Site",
        ],
      },
    ],
  },
  {
    id: "email-hosting",
    title: "Business Email",
    description: "Professional email hosting with your own domain",
    cartType: "email-hosting",
    plans: [
      {
        pid: null, // TODO: set WHMCS product ID for Business Starter email
        name: "Business Starter",
        fallbackMonthly: 79,
        fallbackAnnually: 948,
        originalPrice: 169,
        features: [
          "10 GB Storage",
          "Custom Domain Email",
          "Webmail Access",
          "Calendar & Contacts",
          "Anti-Spam Protection",
          "IMAP/POP3 Support",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for Business Premium email
        name: "Business Premium",
        popular: true,
        fallbackMonthly: 149,
        fallbackAnnually: 1788,
        originalPrice: 299,
        features: [
          "50 GB Storage",
          "Custom Domain Email",
          "Webmail Access",
          "Calendar & Contacts",
          "Advanced Anti-Spam",
          "Priority Support",
          "Email Aliases",
          "Auto-Reply Rules",
        ],
      },
    ],
  },
  {
    id: "reseller-hosting",
    title: "Reseller & Agency Hosting",
    description: "White-label hosting to start your own hosting business",
    cartType: "reseller-hosting",
    plans: [
      {
        pid: null, // TODO: set WHMCS product ID for Agency Starter
        name: "Agency Starter",
        fallbackMonthly: 539,
        fallbackAnnually: 6468,
        originalPrice: 1679,
        features: [
          "50 Websites",
          "50 GB NVMe Storage",
          "White-Label Panel",
          "Client Management",
          "Free SSL & CDN",
          "Daily Backups",
          "Priority Support",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for Agency Pro
        name: "Agency Pro",
        popular: true,
        fallbackMonthly: 899,
        fallbackAnnually: 10788,
        originalPrice: 2855,
        features: [
          "100 Websites",
          "100 GB NVMe Storage",
          "White-Label Panel",
          "Client Management",
          "Dedicated IP",
          "Free SSL & CDN",
          "Daily Backups",
          "Priority 24/7 Support",
          "Reseller API Access",
        ],
      },
      {
        pid: null, // TODO: set WHMCS product ID for Agency Enterprise
        name: "Agency Enterprise",
        fallbackMonthly: 1599,
        fallbackAnnually: 19188,
        originalPrice: 5039,
        features: [
          "300 Websites",
          "200 GB NVMe Storage",
          "White-Label Panel",
          "Full Client Management",
          "Dedicated IP",
          "Free SSL & CDN",
          "Daily Backups",
          "Priority 24/7 Support",
          "Reseller API Access",
          "Custom Branding",
        ],
      },
    ],
  },
];
