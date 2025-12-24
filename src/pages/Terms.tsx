import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Terms of Service - Infinitive Cloud | Service Agreement</title>
        <meta name="description" content="Infinitive Cloud Terms of Service. Read our service agreement, usage policies, and conditions for using our cloud, hosting, and development services." />
        <link rel="canonical" href="https://infinitivecloud.com/terms" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="section-container max-w-4xl">
          <h1 className="mb-6">Terms of Service</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Please read these terms carefully before using our services.
          </p>
          
          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="mb-4">
                By accessing or using <strong>Infinitive Cloud</strong> services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> January 2025
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Services Provided</h2>
              <p className="mb-4">Infinitive Cloud provides the following services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Cloud infrastructure and hosting solutions</li>
                <li>Domain registration and management</li>
                <li>Web and mobile application development</li>
                <li>AI-powered solutions and automation tools</li>
                <li>Technical support and consulting services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">User Responsibilities</h2>
              <p className="mb-4">As a user of our services, you agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Use our services only for lawful purposes</li>
                <li>Not engage in any activity that could harm our infrastructure or other users</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not host or distribute illegal, harmful, or offensive content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Acceptable Use Policy</h2>
              <p className="mb-4">You may not use our services to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Host or distribute malware, viruses, or harmful software</li>
                <li>Conduct phishing, fraud, or other deceptive activities</li>
                <li>Send spam or unsolicited bulk emails</li>
                <li>Violate intellectual property rights</li>
                <li>Engage in illegal activities or promote violence</li>
                <li>Overload or disrupt our servers and network infrastructure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All fees are charged in advance based on your selected billing cycle</li>
                <li>Payments are processed securely through our payment partners</li>
                <li>Failed payments may result in service suspension</li>
                <li>Refunds are subject to our Refund Policy</li>
                <li>Prices are subject to change with prior notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Service Level Agreement</h2>
              <p className="mb-4">
                We strive to maintain 99.99% uptime for our hosting services. For detailed SLA terms, please refer to our <a href="/sla" className="text-primary hover:underline">Service Level Agreement</a> page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Suspension and Termination</h2>
              <p className="mb-4">We reserve the right to suspend or terminate your account if:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You violate these Terms of Service</li>
                <li>Your account is used for illegal activities</li>
                <li>Payment obligations are not met</li>
                <li>Your usage threatens our infrastructure or other users</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Limitation of Liability</h2>
              <p className="mb-4">
                Infinitive Cloud shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid by you for the services in the past 12 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Data Backup</h2>
              <p className="mb-4">
                While we perform regular backups, you are responsible for maintaining your own backups of all data and content. We are not liable for any data loss.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Modifications to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services constitutes acceptance of the modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <ul className="space-y-2">
                <li><strong>Email:</strong> <a href="mailto:info@infinitivecloud.com" className="text-primary hover:underline">info@infinitivecloud.com</a></li>
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

export default Terms;
