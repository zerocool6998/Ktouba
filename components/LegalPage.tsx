import React from 'react';

interface LegalPageProps {
  page: 'terms' | 'privacy' | 'refund';
  onBack: () => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ page, onBack }) => {
  const getTitle = () => {
    switch (page) {
      case 'terms': return 'Terms of Service';
      case 'privacy': return 'Privacy Policy';
      case 'refund': return 'Refund Policy';
    }
  };

  const getContent = () => {
    switch (page) {
      case 'terms':
        return (
          <>
            <p className="mb-4">Last Updated: March 10, 2026</p>
            <p className="mb-4">These Terms of Service (“Terms”) govern the use of the website <strong>shurekate.com</strong> and the purchase of digital products offered through the website. By accessing this website or purchasing a product, you agree to be bound by these Terms.</p>
            <p className="mb-4">If you do not agree with these Terms, you should not use the website.</p>
            
            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">1. Website Operator</h3>
            <p className="mb-4">This website is operated by:</p>
            <p className="mb-2">Business Name: <strong>Shurekate LLC</strong></p>
            <p className="mb-2">Registered Address: <strong>30 N Gould St, Ste R, Sheridan, WY 82801, United States</strong></p>
            <p className="mb-2">Jurisdiction: <strong>Wyoming, United States</strong></p>
            <p className="mb-4">Contact Email: <strong>nouaranasprofessional@gmail.com</strong></p>
            <p className="mb-4">Throughout these Terms, “Company”, “we”, “our”, and “us” refer to Shurekate LLC.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">2. Service Description</h3>
            <p className="mb-4">shurekate.com provides <strong>digital educational content in the form of downloadable ebooks</strong>.</p>
            <p className="mb-4">Topics covered may include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Artificial intelligence and technology</li>
              <li>Digital productivity and knowledge systems</li>
              <li>Lifestyle optimization, wellness, and minimalism</li>
            </ul>
            <p className="mb-4">All products sold on this website are <strong>digital goods delivered electronically</strong>. No physical products are shipped.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">3. Eligibility</h3>
            <p className="mb-4">To purchase products from this website you must:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Be at least <strong>18 years old</strong>, or the legal age of majority in your jurisdiction</li>
              <li>Provide accurate billing and contact information</li>
              <li>Use a valid payment method authorized for the transaction</li>
            </ul>
            <p className="mb-4">The Company reserves the right to refuse service or cancel transactions suspected of fraud or misuse.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">4. Product Information</h3>
            <p className="mb-4">We make reasonable efforts to accurately describe all digital products available on the website.</p>
            <p className="mb-4">However:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>All ebooks are provided <strong>for informational and educational purposes only</strong></li>
              <li>The content does <strong>not constitute legal, medical, financial, or professional advice</strong></li>
              <li>No specific outcomes or results are guaranteed</li>
            </ul>
            <p className="mb-4">Users are responsible for how they use the information contained in the materials.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">5. Pricing</h3>
            <p className="mb-4">All prices displayed on the website are listed in the applicable currency at the time of purchase and may change without prior notice.</p>
            <p className="mb-4">Applicable taxes may be applied depending on the buyer’s jurisdiction and payment processor requirements.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">6. Payments</h3>
            <p className="mb-4">Payments on this website are processed through <strong>third-party payment processors</strong>, including but not limited to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Stripe</li>
              <li>Paddle</li>
            </ul>
            <p className="mb-4">Payment information is handled securely by these providers. The Company does not store full payment card details.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">7. Delivery of Digital Products</h3>
            <p className="mb-4">After successful payment confirmation, customers will receive access to their purchased ebook through:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>A download link sent to the email address provided during checkout.</li>
            </ul>
            <p className="mb-4">Delivery typically occurs immediately after payment confirmation.</p>
            <p className="mb-4">Customers are responsible for ensuring the accuracy of the email address provided at checkout.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">8. Intellectual Property</h3>
            <p className="mb-4">All ebooks and materials available on this website are the <strong>intellectual property of Shurekate LLC or its licensors</strong> and are protected by copyright and intellectual property laws.</p>
            <p className="mb-4">Customers receive a <strong>personal, non-exclusive, non-transferable license</strong> to access and read the purchased ebook.</p>
            <p className="mb-4">Customers may not:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Redistribute or resell the ebooks</li>
              <li>Upload the content to public file-sharing platforms</li>
              <li>Reproduce the content for commercial use</li>
            </ul>
            <p className="mb-4">Unauthorized distribution may result in legal action.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">9. Acceptable Use</h3>
            <p className="mb-4">Users agree not to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Attempt unauthorized access to website systems</li>
              <li>Interfere with website functionality</li>
              <li>Use the website for unlawful activities</li>
              <li>Copy or scrape website content without permission</li>
            </ul>
            <p className="mb-4">The Company reserves the right to restrict or terminate access if these terms are violated.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">10. Limitation of Liability</h3>
            <p className="mb-4">To the maximum extent permitted by law, Shurekate LLC shall not be liable for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Indirect or consequential damages</li>
              <li>Loss of profits or business opportunities</li>
              <li>Decisions made based on information contained in the ebooks</li>
            </ul>
            <p className="mb-4">All services and digital products are provided <strong>“as is”</strong> without warranties of any kind.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">11. Changes to These Terms</h3>
            <p className="mb-4">Shurekate LLC may update these Terms at any time.</p>
            <p className="mb-4">Any updates will be posted on this page with an updated <strong>Last Updated</strong> date.</p>
            <p className="mb-4">Continued use of the website constitutes acceptance of the revised Terms.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">12. Governing Law</h3>
            <p className="mb-4">These Terms are governed by the laws of the <strong>State of Wyoming, United States</strong>.</p>
            <p className="mb-4">Any disputes arising from these Terms shall be subject to the jurisdiction of the courts located in Wyoming.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">13. Contact</h3>
            <p className="mb-4">For questions regarding these Terms:</p>
            <p className="mb-4">Email: <a href="mailto:support@shurekate.com" className="text-[#2C2A26] underline hover:text-[#5D5A53]">support@shurekate.com</a></p>
          </>
        );
      case 'privacy':
        return (
          <>
            <p className="mb-4">Last Updated: March 10, 2026</p>
            <p className="mb-4">This Privacy Policy explains how <strong>shurekate.com</strong> collects, uses, and protects personal information when users access the website or purchase digital products.</p>
            
            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">1. Information We Collect</h3>
            <p className="mb-4">We may collect the following types of information.</p>
            <p className="mb-2">Information provided by users:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Billing information</li>
              <li>Transaction confirmation data</li>
            </ul>
            <p className="mb-2 mt-4">Automatically collected information:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Website usage data</li>
            </ul>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">2. How Information Is Used</h3>
            <p className="mb-4">Personal information may be used to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Process purchases and deliver digital products</li>
              <li>Send order confirmations and download links</li>
              <li>Provide customer support</li>
              <li>Prevent fraudulent transactions</li>
              <li>Improve website functionality and services</li>
            </ul>
            <p className="mb-4">Personal data is not sold or rented to third parties.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">3. Payment Processing</h3>
            <p className="mb-4">Payments are processed through third-party payment processors such as <strong>Stripe and Paddle</strong>.</p>
            <p className="mb-4">These providers handle payment data according to their own security and privacy policies.</p>
            <p className="mb-4">The website does not directly store full payment card information.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">4. Cookies</h3>
            <p className="mb-4">This website uses cookies to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Maintain website functionality</li>
              <li>Analyze visitor behavior</li>
              <li>Improve website performance</li>
            </ul>
            <p className="mb-4">Users may disable cookies through their browser settings.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">5. Data Retention</h3>
            <p className="mb-4">Personal data is retained <strong>only as long as necessary</strong> to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Process transactions</li>
              <li>Provide customer support</li>
              <li>Comply with legal obligations</li>
            </ul>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">6. Data Security</h3>
            <p className="mb-4">Reasonable technical and organizational measures are implemented to protect personal information from unauthorized access, disclosure, or misuse.</p>
            <p className="mb-4">However, no online transmission can be guaranteed to be completely secure.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">7. Third-Party Services</h3>
            <p className="mb-4">The website may rely on third-party providers including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Payment processors</li>
              <li>Website hosting providers</li>
              <li>Analytics tools</li>
            </ul>
            <p className="mb-4">These services operate under their own privacy policies.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">8. User Rights</h3>
            <p className="mb-4">Depending on applicable laws, users may have the right to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Request access to their personal data</li>
              <li>Request correction or deletion of their data</li>
              <li>Object to certain uses of their data</li>
            </ul>
            <p className="mb-4">Requests can be submitted via the contact email listed below.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">9. Changes to This Policy</h3>
            <p className="mb-4">This Privacy Policy may be updated periodically. Changes will be reflected with a revised <strong>Last Updated</strong> date on this page.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">10. Contact</h3>
            <p className="mb-4">For privacy-related inquiries:</p>
            <p className="mb-4">Email: <a href="mailto:support@shurekate.com" className="text-[#2C2A26] underline hover:text-[#5D5A53]">support@shurekate.com</a></p>
          </>
        );
      case 'refund':
        return (
          <>
            <p className="mb-4">Last Updated: March 10, 2026</p>
            <p className="mb-4">This Refund Policy outlines the conditions under which refunds may be issued for purchases made on <strong>shurekate.com</strong>.</p>
            
            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">1. Digital Products</h3>
            <p className="mb-4">All products sold on this website are <strong>digital ebooks delivered electronically</strong>.</p>
            <p className="mb-4">Because digital products can be accessed immediately after purchase, <strong>all sales are generally considered final once the product has been delivered or downloaded</strong>.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">2. Refund Eligibility</h3>
            <p className="mb-4">Refund requests may be considered in limited situations including:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Duplicate purchases</li>
              <li>Technical issues preventing access to the product</li>
              <li>Billing errors</li>
            </ul>
            <p className="mb-4">Refund requests must be submitted within <strong>7 days of purchase</strong>.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">3. Non-Refundable Situations</h3>
            <p className="mb-4">Refunds will not be issued for:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Change of mind after purchase</li>
              <li>Failure to read product descriptions before purchase</li>
              <li>Compatibility issues with personal devices</li>
            </ul>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">4. Refund Requests</h3>
            <p className="mb-4">Refund requests must be sent to:</p>
            <p className="mb-4">Email: <a href="mailto:support@shurekate.com" className="text-[#2C2A26] underline hover:text-[#5D5A53]">support@shurekate.com</a></p>
            <p className="mb-4">Please include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Order confirmation email</li>
              <li>Purchase date</li>
              <li>Description of the issue</li>
            </ul>
            <p className="mb-4">Each request will be reviewed individually.</p>

            <hr className="my-8 border-[#E5E2DB]" />

            <h3 className="text-xl font-serif mb-4 mt-8">5. Payment Processor Disputes</h3>
            <p className="mb-4">Payments processed through third-party processors such as <strong>Stripe or Paddle</strong> may also be subject to their respective dispute and chargeback procedures.</p>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Home
        </button>

        <h1 className="text-4xl font-serif text-[#2C2A26] mb-8">{getTitle()}</h1>
        
        <div className="prose prose-stone max-w-none text-[#5D5A53]">
          {getContent()}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
