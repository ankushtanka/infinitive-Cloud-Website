CREATE TABLE IF NOT EXISTS public.whmcs_order_syncs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id TEXT NOT NULL UNIQUE,
  gateway_order_id TEXT,
  whmcs_order_id TEXT,
  whmcs_invoice_id TEXT,
  status TEXT NOT NULL DEFAULT 'processing',
  response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.whmcs_order_syncs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No direct select on whmcs_order_syncs"
ON public.whmcs_order_syncs
FOR SELECT
USING (false);

CREATE POLICY "No direct insert on whmcs_order_syncs"
ON public.whmcs_order_syncs
FOR INSERT
WITH CHECK (false);

CREATE POLICY "No direct update on whmcs_order_syncs"
ON public.whmcs_order_syncs
FOR UPDATE
USING (false)
WITH CHECK (false);

CREATE POLICY "No direct delete on whmcs_order_syncs"
ON public.whmcs_order_syncs
FOR DELETE
USING (false);

CREATE OR REPLACE FUNCTION public.update_whmcs_order_syncs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

DROP TRIGGER IF EXISTS update_whmcs_order_syncs_updated_at ON public.whmcs_order_syncs;

CREATE TRIGGER update_whmcs_order_syncs_updated_at
BEFORE UPDATE ON public.whmcs_order_syncs
FOR EACH ROW
EXECUTE FUNCTION public.update_whmcs_order_syncs_updated_at();

CREATE INDEX IF NOT EXISTS idx_whmcs_order_syncs_created_at ON public.whmcs_order_syncs(created_at DESC);