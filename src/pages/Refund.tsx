import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Refund = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Refund Policy - Infinitive Cloud | Clear & Transparent Terms</title>
        <meta name="description" content="Infinitive Cloud Refund Policy. Clear and transparent refund terms for cloud hosting, development services, and AI solutions." />
        <link rel="canonical" href="https://infinitivecloud.com/refund" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="section-container max-w-4xl">
          <h1 className="mb-6">Refund Policy</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Clear and transparent refund terms for all our services.
          </p>
          
          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Our Commitment to You</h2>
              <p className="mb-4">
                At <strong>Infinitive Cloud</strong>, we stand behind the quality of our services. This Refund Policy outlines the terms and conditions under which refunds are provided for various services. Please read this policy carefully before making a purchase.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> January 2025
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Domain Registration Refunds</h2>
              <p className="mb-4">
                <strong>Domains are a NON-REFUNDABLE product.</strong> This is an industry-standard policy as domain registrations are immediately processed with registrars.
              </p>
              
              <h3 className="font-bold mt-6 mb-3">Free Domains with Hosting Plans</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>If a free domain is registered with any hosting plan, and you later cancel the hosting service, the domain cost will be deducted from your hosting refund</li>
                <li>The deducted amount will be based on the standard retail price of the domain extension</li>
                <li>Only the remaining hosting amount (after domain cost deduction) will be refunded</li>
              </ul>

              <h3 className="font-bold mt-6 mb-3">Domain Delivery Issues</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We provide domains promptly upon order confirmation</li>
                <li>If we are unable to deliver a domain within 24 hours due to technical issues, we will issue a full refund</li>
                <li>Customers will be notified immediately if domain delivery is delayed</li>
              </ul>

              <h3 className="font-bold mt-6 mb-3">Premium Domain Pricing</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>If a domain is identified as a premium domain after purchase, we will provide either a full refund or account credit at your preference</li>
              </ul>

              <h3 className="font-bold mt-6 mb-3">Domain Suspension for Abuse</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>If you host phishing, fraudulent, or abusive content, the domain will be suspended by the registrar</li>
                <li>We are NOT responsible for domain suspensions caused by policy violations</li>
                <li>Domains are non-refundable in case of abuse-related suspensions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Web Hosting Refunds</h2>
              <p className="mb-4">
                We take pride in providing excellent customer service and reliable hosting solutions. We stand behind our services with a comprehensive money-back guarantee.
              </p>

              <h3 className="font-bold mt-6 mb-3">Service Resolution Guarantee</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We guarantee that any technical issue will be resolved within 72 hours on working days</li>
                <li>If we are unable to resolve your issue within that timeframe, we will issue a full refund</li>
              </ul>

              <h3 className="font-bold mt-6 mb-3">Money-Back Guarantee Period</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Standard Plans:</strong> 7-day money-back guarantee</li>
                <li><strong>Premium Plans:</strong> Up to 30-day money-back guarantee</li>
                <li>The specific duration is mentioned for each plan on our website</li>
              </ul>

              <h3 className="font-bold mt-6 mb-3">Eligibility Requirements</h3>
              <p className="mb-4">To be eligible for a refund, customers must meet the following requirements:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>New Customers Only:</strong> You must not have been a customer of Infinitive Cloud in the past</li>
                <li><strong>No Abuse or Misuse:</strong> No policy violations should have occurred on your service</li>
                <li><strong>No Chargebacks:</strong> You must not have initiated a dispute or chargeback with your payment provider</li>
                <li><strong>Good Standing:</strong> Your account must be in good standing with no outstanding violations</li>
              </ul>

              <h3 className="font-bold mt-6 mb-3">Refund Calculation & Deductions</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Gateway & Handling Charges:</strong> Payment gateway fees (typically 2-5%) are non-refundable</li>
                <li><strong>Setup Fees:</strong> One-time setup fees are non-refundable</li>
                <li><strong>Add-on Services:</strong> Additional services like SSL, dedicated IP, etc., are non-refundable</li>
                <li><strong>Domain Costs:</strong> Free domain costs will be deducted from the refund amount</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">VPS and Dedicated Server Refunds</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>VPS and Dedicated Servers have a 7-day money-back guarantee</li>
                <li>Setup fees and add-ons are non-refundable</li>
                <li>Refunds are processed within 7-10 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Development Services Refunds</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Custom development services are non-refundable once work has commenced</li>
                <li>Refunds may be considered for undelivered milestones or project cancellations</li>
                <li>Each case is reviewed individually</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">AI Solutions Refunds</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI solution subscriptions have a 7-day money-back guarantee</li>
                <li>Custom AI development projects are non-refundable once work begins</li>
                <li>Usage-based charges are non-refundable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
              <p className="mb-4">To request a refund:</p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Contact our support team via email or support ticket</li>
                <li>Provide your account details and reason for the refund request</li>
                <li>Allow 3-5 business days for refund review</li>
                <li>Approved refunds are processed within 7-10 business days</li>
                <li>Refunds are issued to the original payment method</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Non-Refundable Items</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Domain registrations and renewals</li>
                <li>Setup fees and installation charges</li>
                <li>SSL certificates</li>
                <li>Licenses for third-party software</li>
                <li>Add-on services (dedicated IP, etc.)</li>
                <li>Services terminated due to Terms of Service violations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">
                For refund requests or questions about this policy:
              </p>
              <ul className="space-y-2">
                <li><strong>Sales:</strong> <a href="mailto:sales@infinitivecloud.com" className="text-primary hover:underline">sales@infinitivecloud.com</a></li>
                <li><strong>Support:</strong> <a href="mailto:support@infinitivecloud.com" className="text-primary hover:underline">support@infinitivecloud.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+917737393087" className="text-primary hover:underline">+91 7737393087</a></li>
                <li><strong>Address:</strong> Navrangpura, Ahmedabad, India</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Refund;
