import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  orderId?: string;
  amount: number;
  currency: string;
  keyId: string;
  name: string;
  email: string;
  phone: string;
  description?: string;
  notes?: Record<string, any>;
  onSuccess: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  onFailure: (error: any) => void;
}

interface CreateRazorpayOrderOptions {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, any>;
}

export function useRazorpay() {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || document.getElementById("razorpay-sdk")) return;
    const script = document.createElement("script");
    script.id = "razorpay-sdk";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    scriptLoaded.current = true;
  }, []);

  const openCheckout = useCallback((opts: RazorpayOptions) => {
    if (!window.Razorpay) {
      opts.onFailure({ description: "Razorpay SDK not loaded. Please try again." });
      return;
    }

    const razorpayOptions: Record<string, any> = {
      key: opts.keyId,
      amount: opts.amount,
      currency: opts.currency,
      name: "Infinitive Cloud",
      description: opts.description || "Domain & Hosting Services",
      prefill: {
        name: opts.name,
        email: opts.email,
        contact: opts.phone,
      },
      notes: opts.notes,
      theme: { color: "#2563eb" },
      handler: opts.onSuccess,
      modal: {
        ondismiss: () => opts.onFailure({ description: "Payment cancelled" }),
      },
    };

    if (opts.orderId && opts.orderId.startsWith("order_")) {
      razorpayOptions.order_id = opts.orderId;
    }

    const rzp = new window.Razorpay(razorpayOptions);

    rzp.on("payment.failed", (response: any) => {
      opts.onFailure(response.error);
    });

    rzp.open();
  }, []);

  const createOrder = useCallback(async ({ amount, currency = "INR", receipt, notes }: CreateRazorpayOrderOptions) => {
    const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
    const res = await fetch(
      `https://${projectId}.supabase.co/functions/v1/create-razorpay-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency, receipt, notes }),
      }
    );
    if (!res.ok) {
      let message = "Failed to create order";
      try {
        const err = await res.json();
        message = err.error || message;
      } catch {
        // ignore non-JSON failures
      }
      throw new Error(message);
    }
    return res.json() as Promise<{ order_id: string; amount: number; currency: string; key_id: string }>;
  }, []);

  return { createOrder, openCheckout };
}
