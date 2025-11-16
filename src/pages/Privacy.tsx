import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="section-container max-w-4xl">
          <h1 className="mb-6">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your privacy is at the core of everything we do. Learn how we collect, use, and safeguard your information.
          </p>
          
          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="mb-4">
                Welcome to <strong>Infinitive Cloud</strong>. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our cloud, hosting, development, and AI services. By using our site and services, you agree to the terms described in this policy.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> January 2025
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What Information Do We Collect?</h2>
              <p className="mb-4">We collect various types of information to provide and improve our services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Personal Details:</strong> Name, email address, phone number, and billing address</li>
                <li><strong>Account Information:</strong> Username, password, and account preferences</li>
                <li><strong>Transactional Data:</strong> Secure payment details, order history, and invoices</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and location data</li>
                <li><strong>Cookies:</strong> Website usage patterns, preferences, and session information</li>
                <li><strong>Communication Data:</strong> Support tickets, emails, and chat conversations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How Do We Use Your Information?</h2>
              <p className="mb-4">We use the collected information for the following purposes:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, operate, and maintain our cloud and hosting services</li>
                <li>Process transactions securely and manage billing</li>
                <li>Personalize your experience with tailored content and recommendations</li>
                <li>Enhance customer support and resolve technical issues promptly</li>
                <li>Send service updates, account notifications, and important announcements</li>
                <li>Send promotional emails, newsletters, and special offers (with your consent)</li>
                <li>Improve our website, services, and user experience</li>
                <li>Prevent fraud, detect abuse, and ensure platform security</li>
                <li>Comply with legal obligations and respond to lawful requests</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">How Do We Protect Your Information?</h2>
              <p className="mb-4">Your data security is our top priority. We implement industry-standard security measures:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>SSL Encryption:</strong> All data transfers are encrypted using 256-bit SSL/TLS encryption</li>
                <li><strong>Secure Payment Processing:</strong> We use PCI-DSS compliant payment gateways for all transactions</li>
                <li><strong>Firewall Protection:</strong> Advanced firewalls protect our servers from unauthorized access</li>
                <li><strong>Regular Security Audits:</strong> Continuous monitoring and vulnerability assessments</li>
                <li><strong>Malware Scanning:</strong> Real-time malware detection and prevention systems</li>
                <li><strong>Access Controls:</strong> Restricted access to authorized personnel only with multi-factor authentication</li>
                <li><strong>Data Backups:</strong> Regular automated backups to prevent data loss</li>
                <li><strong>Security Updates:</strong> Timely software updates and security patches</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies Policy</h2>
              <p className="mb-4">
                We use cookies to enhance your browsing experience and improve our services. Cookies are small text files stored on your device that help us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your login credentials and preferences</li>
                <li>Personalize content based on your interests</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Provide targeted advertisements and promotions</li>
                <li>Maintain security and prevent fraud</li>
              </ul>
              <p className="mt-4">
                You can disable cookies in your browser settings, but please note that certain features of our website may not function properly without cookies enabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Third-Party Disclosure</h2>
              <p className="mb-4">
                We value your privacy and do not sell, trade, or rent your personal information to third parties. However, we may share your data with trusted partners under strict confidentiality agreements:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Payment Processors:</strong> Secure payment gateways to process transactions</li>
                <li><strong>Hosting Providers:</strong> Infrastructure partners that host our servers and data centers</li>
                <li><strong>Service Providers:</strong> Third-party vendors who assist in delivering our services</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our legal rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and review your personal information</li>
                <li>Request corrections to inaccurate data</li>
                <li>Request deletion of your personal data (subject to legal obligations)</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions or concerns about this Privacy Policy, please contact us:
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

export default Privacy;
