import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  CreditCard,
  Tag,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Wallet,
  Landmark,
  Smartphone,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useRazorpay } from "@/hooks/use-razorpay";

const billingSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15),
  companyName: z.string().trim().max(100).optional(),
  address1: z.string().trim().min(1, "Address is required").max(200),
  address2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1, "City is required").max(100),
  state: z.string().trim().min(1, "State is required").max(100),
  postcode: z.string().trim().min(1, "Postcode is required").max(10),
  country: z.string().min(1, "Country is required"),
  gstNumber: z.string().trim().max(20).optional(),
});

type BillingFormData = z.infer<typeof billingSchema>;

interface CheckoutFormProps {
  subtotal: number;
  addonsTotal: number;
  total: number;
  onBack: () => void;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh",
];

const CheckoutForm = ({ subtotal, addonsTotal, total, onBack }: CheckoutFormProps) => {
  const navigate = useNavigate();
  const { createOrder, openCheckout } = useRazorpay();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const gstRate = 0.18;
  const gstAmount = Math.round(total * gstRate);
  const grandTotal = total + gstAmount;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BillingFormData>({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      country: "IN",
    },
  });

  const navigateToConfirmation = (data: BillingFormData, paymentLabel: string, paymentId?: string) => {
    const gstAmt = Math.round(total * 0.18);
    const gt = total + gstAmt;
    const orderId = paymentId || `IC-${Date.now().toString(36).toUpperCase()}`;
    const params = new URLSearchParams({
      id: orderId,
      domain: new URLSearchParams(window.location.search).get("domain") || "example.com",
      total: gt.toString(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      payment: paymentLabel,
    });
    navigate(`/order-confirmation?${params.toString()}`);
  };

  const onSubmit = async (data: BillingFormData) => {
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the Terms of Service before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "razorpay") {
      setIsProcessing(true);
      try {
        const amountInPaise = grandTotal * 100;
        const order = await createOrder(amountInPaise);
        openCheckout({
          orderId: order.order_id,
          amount: order.amount,
          currency: order.currency,
          keyId: order.key_id,
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          onSuccess: (response) => {
            navigateToConfirmation(data, "Razorpay", response.razorpay_payment_id);
          },
          onFailure: (error) => {
            setIsProcessing(false);
            toast({
              title: "Payment Failed",
              description: error?.description || "Something went wrong. Please try again.",
              variant: "destructive",
            });
          },
        });
      } catch (err: any) {
        setIsProcessing(false);
        toast({
          title: "Payment Error",
          description: err.message || "Could not initiate payment. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      navigateToConfirmation(
        data,
        paymentMethod === "upi" ? "UPI Direct" : "Bank Transfer"
      );
    }
  };

  const applyPromo = () => {
    if (!promoCode.trim()) return;
    setPromoApplied(true);
    toast({
      title: "Promo Code",
      description: "Invalid or expired promo code.",
      variant: "destructive",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Back Button */}
      <Button
        type="button"
        variant="ghost"
        className="gap-2 text-muted-foreground hover:text-foreground mb-2"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Cart
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Billing Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <User className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Personal Information</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...register("firstName")}
                    className={errors.firstName ? "border-destructive" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-destructive">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...register("lastName")}
                    className={errors.lastName ? "border-destructive" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-destructive">{errors.lastName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      className={`pl-10 ${errors.phone ? "border-destructive" : ""}`}
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="companyName">Company Name <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="companyName"
                      placeholder="Acme Inc."
                      className="pl-10"
                      {...register("companyName")}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Billing Address</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address1">Address Line 1 <span className="text-destructive">*</span></Label>
                  <Input
                    id="address1"
                    placeholder="123, Main Street"
                    {...register("address1")}
                    className={errors.address1 ? "border-destructive" : ""}
                  />
                  {errors.address1 && (
                    <p className="text-xs text-destructive">{errors.address1.message}</p>
                  )}
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address2">Address Line 2 <span className="text-muted-foreground text-xs">(Optional)</span></Label>
                  <Input
                    id="address2"
                    placeholder="Apartment, suite, etc."
                    {...register("address2")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                  <Input
                    id="city"
                    placeholder="Mumbai"
                    {...register("city")}
                    className={errors.city ? "border-destructive" : ""}
                  />
                  {errors.city && (
                    <p className="text-xs text-destructive">{errors.city.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State <span className="text-destructive">*</span></Label>
                  <Select
                    onValueChange={(val) => setValue("state", val)}
                    defaultValue=""
                  >
                    <SelectTrigger className={errors.state ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && (
                    <p className="text-xs text-destructive">{errors.state.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postcode">Postcode / ZIP <span className="text-destructive">*</span></Label>
                  <Input
                    id="postcode"
                    placeholder="400001"
                    {...register("postcode")}
                    className={errors.postcode ? "border-destructive" : ""}
                  />
                  {errors.postcode && (
                    <p className="text-xs text-destructive">{errors.postcode.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country <span className="text-destructive">*</span></Label>
                  <Select
                    onValueChange={(val) => setValue("country", val)}
                    defaultValue="IN"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IN">🇮🇳 India</SelectItem>
                      <SelectItem value="US">🇺🇸 United States</SelectItem>
                      <SelectItem value="GB">🇬🇧 United Kingdom</SelectItem>
                      <SelectItem value="AE">🇦🇪 UAE</SelectItem>
                      <SelectItem value="SG">🇸🇬 Singapore</SelectItem>
                      <SelectItem value="AU">🇦🇺 Australia</SelectItem>
                      <SelectItem value="CA">🇨🇦 Canada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="gstNumber">GST Number <span className="text-muted-foreground text-xs">(Optional - for Indian businesses)</span></Label>
                  <Input
                    id="gstNumber"
                    placeholder="22AAAAA0000A1Z5"
                    {...register("gstNumber")}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Payment Method</h2>
              </div>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                {[
                  {
                    value: "razorpay",
                    icon: Wallet,
                    label: "Razorpay",
                    desc: "Credit/Debit Card, UPI, Net Banking, Wallets",
                  },
                  {
                    value: "upi",
                    icon: Smartphone,
                    label: "UPI Direct",
                    desc: "Google Pay, PhonePe, Paytm, BHIM UPI",
                  },
                  {
                    value: "bank",
                    icon: Landmark,
                    label: "Bank Transfer / NEFT",
                    desc: "Direct bank transfer (manual verification)",
                  },
                ].map((method) => (
                  <label
                    key={method.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      paymentMethod === method.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <RadioGroupItem value={method.value} />
                    <div
                      className={`p-2 rounded-lg ${
                        paymentMethod === method.value
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <method.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-28">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Order Summary</h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {addonsTotal > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Add-ons</span>
                    <span className="font-medium text-foreground">₹{addonsTotal.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>GST @ 18%</span>
                  <span className="font-medium text-foreground">₹{gstAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Promo Code */}
              <div className="mb-4">
                <Label className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  Apply Promo Code
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoApplied(false);
                    }}
                    className="h-9 text-sm"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={applyPromo}
                    className="shrink-0"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">Total Due</span>
                <span className="text-2xl font-black text-primary">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Inclusive of 18% GST</p>

              {/* Terms */}
              <div className="flex items-start gap-2 mt-5">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(val) => setAgreedToTerms(!!val)}
                  className="mt-0.5"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-tight cursor-pointer">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary underline">Terms of Service</a>,{" "}
                  <a href="/privacy" className="text-primary underline">Privacy Policy</a>, and{" "}
                  <a href="/refund" className="text-primary underline">Refund Policy</a>.
                </label>
              </div>

              <Button
                type="submit"
                className="w-full btn-gradient mt-5 h-12 text-base font-bold gap-2"
                disabled={isSubmitting}
              >
                <ShieldCheck className="w-5 h-5" />
                Complete Order
              </Button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3 h-3" />
                <span>Secure 256-bit SSL Encrypted Checkout</span>
              </div>
              <div className="mt-3 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground text-center">
                30-Day Money-Back Guarantee
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
