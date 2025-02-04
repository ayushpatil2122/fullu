import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4"><strong>Effective Date:</strong> 01/02/2025</p>
      <p className="mb-8"><strong>Last Updated:</strong> 01/02/2025</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction and Definitions</h2>
        <p className="mb-4">
          Welcome to <strong>Excuse Me</strong>, a restaurant management tool developed and owned by <strong>Midnight Solutions</strong> (referred to as “we,” “our,” or “us”). This platform facilitates operations management in restaurants through QR-based menus, order processing, and administrative functionality. By accessing or using <strong>Excuse Me</strong>, the User (“you,” “your”)—including restaurant owners, managers, staff, and customers—agrees to the following terms and conditions.
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>“We,” “Our,” or “Us”</strong> refers to <strong>Midnight Solutions</strong>, the parent company that owns and operates the <strong>Excuse Me</strong> platform.</li>
          <li><strong>“User,” “You,” or “Your”</strong> refers to restaurant owners, managers, staff, and customers interacting with the platform for management and order processing.</li>
          <li><strong>Platform</strong> refers to the digital service offered by <strong>Excuse Me</strong>, specifically designed for restaurant management, not including any financial or transactional services.</li>
        </ul>
        <p>
          At the outset of using the platform, you confirm your acceptance of the following terms, which may be updated from time to time. Continued usage of the platform signifies agreement to the revised terms. Users should review the terms regularly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Acceptance of Terms</h2>
        <p>
          By accessing or using <strong>Excuse Me</strong>, you agree to these Terms. If you do not agree, please do not use our services. We reserve the right to update these Terms at any time. Continued use of <strong>Excuse Me</strong> after an update means you accept the new Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Platform Usage</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>For Restaurants:</strong> The <strong>Excuse Me</strong> platform allows restaurant owners and staff to manage operations such as updating digital menus, receiving and processing customer orders, and general workflow automation. It serves as an operational tool but does not process payments or handle financial transactions.
          </li>
          <li>
            <strong>For Customers:</strong> By scanning a QR code, customers are directed to the restaurant's digital menu, where they can place orders seamlessly through the platform. The platform facilitates interaction between the restaurant and its customers but does not collect customer personal data or payment details.
          </li>
        </ul>
        <p className="mb-4"><strong>Notes:</strong></p>
        <ol className="list-decimal pl-6 mb-4">
          <li>
            The placement of an order through <strong>Excuse Me</strong> does not guarantee order acceptance. Order fulfillment, modifications, and cancellations are entirely managed by the restaurant. <strong>Midnight Solutions</strong> is not liable for incorrect orders, service delays, or cancellations.
          </li>
          <li>
            <strong>Midnight Solutions</strong> is not responsible for regulatory compliance regarding food safety, tax obligations, or any other legal requirements imposed on restaurants. Restaurants using <strong>Excuse Me</strong> are solely responsible for ensuring compliance with all applicable laws.
          </li>
          <li>
            Support for order-related disputes must be handled directly between the customer and the restaurant. <strong>Excuse Me</strong> will only intervene if an issue is caused by a technical malfunction within the platform.
          </li>
        </ol>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Payment Terms and Responsibilities</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>No Payment Processing:</strong> The <strong>Excuse Me</strong> platform currently does not accept, store, or facilitate any form of payment transactions. All payments related to customer orders, including processing, reconciliation, and refunds, are solely the responsibility of the restaurant.
          </li>
          <li>
            <strong>Restaurant Financial Accountability:</strong> Restaurants bear full responsibility for ensuring that all payments for customer orders are processed correctly. This includes managing payments, issuing refunds, resolving payment disputes, and ensuring that all local, state, and national financial laws, including tax compliance, are followed.
          </li>
          <li>
            <strong>Third-Party Payment Integration:</strong> If a restaurant chooses to integrate a third-party payment gateway (e.g., Stripe, Square, or POS terminals), the restaurant assumes all responsibility for any issues that may arise, including transaction failures, fraud, or unauthorized transactions. The Company disclaims any liability associated with the use of third-party systems.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Restaurant Content License and Ownership</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Content License:</strong> By uploading or submitting content (such as menus, pricing, and operational data) to the platform, restaurants grant <strong>Midnight Solutions</strong> a limited, revocable, non-exclusive license to use, display, and process such content solely to enable the platform's intended functionality. Ownership of the content remains with the restaurant, and no transfer of rights occurs.
          </li>
          <li>
            <strong>Restrictions:</strong> Users are strictly prohibited from engaging in reverse engineering, reproducing, or commercially exploiting any component of the <strong>Excuse Me</strong> platform without prior written authorization.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. Data Privacy and Collection</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>No Customer Data Collection:</strong> The <strong>Excuse Me</strong> platform does not collect, store, or process any personal data from restaurant customers, such as names, contact details, or payment information. Restaurants using the platform are fully responsible for handling their customers' data in compliance with relevant privacy laws.
          </li>
          <li>
            <strong>Restaurant Information:</strong> We collect business-related information from restaurants, including menu details, operational statistics, and general data required for platform performance. This information is used strictly to provide and enhance platform services and is not shared or sold to third parties without consent.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. Restaurant Responsibilities</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Menu Accuracy:</strong> Restaurants are required to ensure that the information provided via the platform is accurate and up-to-date. This includes the availability of menu items, pricing, allergens, and other essential details that could affect the customer's experience.
          </li>
          <li>
            <strong>Compliance with Financial Laws:</strong> Restaurants are solely responsible for complying with all applicable local and national financial regulations, including tax requirements such as VAT or GST. Non-compliance may lead to suspension from the platform.
          </li>
          <li>
            <strong>Customer Grievances:</strong> Restaurants must handle any customer-related disputes (e.g., incorrect orders, payment disputes) independently. The Company will only intervene if an issue directly results from a verifiable platform defect.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Governing Law and Dispute Resolution</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Legal Jurisdiction:</strong> These terms and conditions are governed by and construed in accordance with the laws of India. Any dispute arising from the use of the platform will be resolved under these governing laws.
          </li>
          <li>
            <strong>Dispute Resolution Process:</strong> Any legal disputes between the User and <strong>Midnight Solutions</strong> will be resolved through binding arbitration under the rules of the Indian Arbitration and Conciliation Act, 1996. Arbitration will take place in Pune, Maharashtra, India, and will be administered under the rules of the relevant arbitration institution.
          </li>
          <li>
            <strong>Class Action Waiver:</strong> By using the platform, users waive their right to engage in any class-action lawsuits against the Company. Disputes must be resolved individually through arbitration or small claims adjudication.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Amendments to Terms</h2>
        <p>
          <strong>Midnight Solutions</strong> reserves the right to modify these terms of use at any time. Any changes will become effective immediately upon posting on the platform. Users are encouraged to review the terms regularly to stay informed about updates. If material changes are made to these Terms, we will notify registered restaurant users via email and post an update notification on the <strong>Excuse Me</strong> platform.
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;