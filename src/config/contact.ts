// Centralized company contact & business config — edit once, updates everywhere
export const CONTACT = {
  phone: "+917737393087",
  phoneDisplay: "+91 8690393087",
  whatsapp: "917737393087",
  email: {
    info: "info@infinitivecloud.com",
    sales: "sales@infinitivecloud.com",
    support: "support@infinitivecloud.com",
  },
  address: "Navrangpura, Ahmedabad, India",
  company: "Infinitive Cloud Private Limited",
  website: "www.infinitivecloud.com",
  gstin: "08AAICI5380A1ZP",
  cin: "U62020RJ2025PTC109151",
} as const;

export const BILLING = {
  // GST rate — update here if government changes the rate
  gstRate: 0.18,
  gstPercent: 18,
} as const;

export const INTEGRATIONS = {
  tawkChatUrl: import.meta.env.VITE_TAWK_CHAT_URL || "https://tawk.to/chat/68fb0774603401195169c6da/1j8a9a8jf",
  tawkEmbedId: import.meta.env.VITE_TAWK_EMBED_ID || "68fb0774603401195169c6da",
  tawkWidgetId: import.meta.env.VITE_TAWK_WIDGET_ID || "1j8a9a8jf",
  whmcsBillingUrl: "https://billing.infinitivecloud.com",
} as const;
