import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SLA = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="section-container max-w-4xl">
          <h1 className="mb-6">Service Level Agreement (SLA)</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Our commitment to reliability, performance, and uptime.
          </p>
          
          <div className="space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="mb-4">
                <strong>Infinitive Cloud</strong> is committed to providing reliable, high-performance cloud and hosting services. This Service Level Agreement (SLA) defines our uptime guarantees, performance standards, and compensation policies.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> January 2025
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Uptime Guarantee</h2>
              <p className="mb-4">
                We guarantee <strong>99.99% uptime</strong> for all our hosting and cloud infrastructure services.
              </p>
              <div className="bg-muted/50 p-6 rounded-lg my-4">
                <h3 className="font-bold mb-2">Uptime Calculation</h3>
                <p className="text-sm">
                  Uptime is calculated as the percentage of time our services are available during a calendar month, excluding scheduled maintenance windows.
                </p>
                <p className="text-sm mt-2">
                  <strong>Uptime % = (Total Minutes in Month - Downtime Minutes) / Total Minutes in Month × 100</strong>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Scheduled Maintenance</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Scheduled maintenance is announced at least 72 hours in advance</li>
                <li>Maintenance windows are typically scheduled during low-traffic periods</li>
                <li>Emergency maintenance may be performed without notice if required for security or stability</li>
                <li>Scheduled maintenance time is excluded from uptime calculations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Service Level Credits</h2>
              <p className="mb-4">
                If we fail to meet our uptime guarantee, you may be eligible for service credits:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                <div>
                  <p className="font-bold">99.9% - 99.99% uptime</p>
                  <p className="text-sm">10% service credit</p>
                </div>
                <div>
                  <p className="font-bold">99.0% - 99.9% uptime</p>
                  <p className="text-sm">25% service credit</p>
                </div>
                <div>
                  <p className="font-bold">95.0% - 99.0% uptime</p>
                  <p className="text-sm">50% service credit</p>
                </div>
                <div>
                  <p className="font-bold">Below 95.0% uptime</p>
                  <p className="text-sm">100% service credit</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Performance Standards</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Server Response Time:</strong> Average response time under 200ms</li>
                <li><strong>Network Latency:</strong> Optimized routing for minimal latency</li>
                <li><strong>Storage Performance:</strong> SSD NVMe storage for fast read/write operations</li>
                <li><strong>Bandwidth:</strong> Unmetered bandwidth on most plans</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Support Response Times</h2>
              <div className="bg-muted/50 p-6 rounded-lg space-y-4">
                <div>
                  <p className="font-bold">Critical Issues (Service Down)</p>
                  <p className="text-sm">Initial response within 30 minutes, 24/7</p>
                </div>
                <div>
                  <p className="font-bold">High Priority (Major Functionality Impaired)</p>
                  <p className="text-sm">Initial response within 2 hours</p>
                </div>
                <div>
                  <p className="font-bold">Medium Priority (Minor Issues)</p>
                  <p className="text-sm">Initial response within 12 hours</p>
                </div>
                <div>
                  <p className="font-bold">Low Priority (General Inquiries)</p>
                  <p className="text-sm">Initial response within 24 hours</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Exclusions</h2>
              <p className="mb-4">This SLA does not apply to downtime caused by:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Customer's applications, content, or configurations</li>
                <li>Third-party services or infrastructure beyond our control</li>
                <li>DDoS attacks or other malicious activities targeting customer sites</li>
                <li>Force majeure events (natural disasters, wars, etc.)</li>
                <li>Scheduled maintenance with proper notice</li>
                <li>Customer's violation of Terms of Service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Claiming Service Credits</h2>
              <p className="mb-4">To claim service credits:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Submit a support ticket within 7 days of the downtime incident</li>
                <li>Provide details of the affected service and downtime period</li>
                <li>Service credits will be applied to your next billing cycle</li>
                <li>Credits are not redeemable for cash</li>
                <li>Maximum total credits per month: 100% of monthly service fee</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Monitoring and Reporting</h2>
              <p className="mb-4">
                We continuously monitor our infrastructure 24/7 using advanced monitoring tools. Uptime statistics and service status are available upon request.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-4">
                For SLA-related inquiries or to report service issues:
              </p>
              <ul className="space-y-2">
                <li><strong>Technical Support:</strong> <a href="mailto:support@infinitivecloud.com" className="text-primary hover:underline">support@infinitivecloud.com</a></li>
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

export default SLA;
