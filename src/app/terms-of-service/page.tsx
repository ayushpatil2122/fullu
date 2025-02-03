"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Scale, 
  ClipboardList, 
  ShieldCheck,
  DollarSign,
  FileText,
  Users 
} from 'lucide-react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ElementType;
}

const Section: React.FC<SectionProps> = ({ title, children, icon: Icon }) => (
  <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
    <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
      {Icon && <Icon className="mr-3 text-blue-600" size={24} />}
      {title}
    </h2>
    <div className="text-gray-700">{children}</div>
  </div>
);

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="w-full">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Terms of Service
            </CardTitle>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Effective Date: 01/02/2025
              </p>
              <p className="text-sm text-gray-600">
                Last Updated: 01/02/2025
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-6">
            <Section title="1. Introduction and Definitions" icon={Scale}>
              <div className="space-y-4">
                <p className="mb-3">
                  Welcome to Excuse Me, a restaurant management tool developed by Midnight Solutions. 
                  These Terms govern your use of our platform for restaurant operations and order management.
                </p>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Key Definitions</h4>
                  <ul className="list-disc list-inside text-blue-900">
                    <li><strong>"We"</strong>: Midnight Solutions, the platform owner</li>
                    <li><strong>"User"</strong>: Restaurant owners, managers, staff, and customers</li>
                    <li><strong>"Platform"</strong>: Excuse Me digital service for restaurant management</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="2. Platform Usage" icon={ClipboardList}>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">For Restaurants</h3>
                <ul className="list-disc list-inside mb-3">
                  <li>Manage digital menus</li>
                  <li>Process customer orders</li>
                  <li>Automate workflow</li>
                </ul>

                <h3 className="font-semibold text-lg">For Customers</h3>
                <p>
                  Scan QR code to access digital menu and place orders seamlessly.
                </p>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Important Notes</h4>
                  <ul className="list-disc list-inside text-yellow-900">
                    <li>Order placement does not guarantee order acceptance</li>
                    <li>Order fulfillment managed entirely by the restaurant</li>
                    <li>Midnight Solutions not liable for order-related issues</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="3. Payment Terms" icon={DollarSign}>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Payment Policies</h3>
                <div className="bg-red-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">No Payment Processing</h4>
                  <p className="text-red-900">
                    Excuse Me does NOT process, store, or facilitate any payment transactions.
                  </p>
                </div>

                <h4 className="font-semibold">Restaurant Responsibilities</h4>
                <ul className="list-disc list-inside">
                  <li>Manage all payment processing</li>
                  <li>Handle refunds and payment disputes</li>
                  <li>Ensure compliance with financial regulations</li>
                </ul>
              </div>
            </Section>

            <Section title="4. Data and Content" icon={FileText}>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Content License</h3>
                <p>
                  Restaurants grant Midnight Solutions a limited, non-exclusive license to use 
                  uploaded content for platform functionality.
                </p>

                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Important Restrictions</h4>
                  <ul className="list-disc list-inside text-green-900">
                    <li>No reverse engineering</li>
                    <li>No commercial exploitation</li>
                    <li>No reproduction of platform components</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="5. Legal and Dispute Resolution" icon={ShieldCheck}>
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Governing Jurisdiction</h3>
                <p>
                  Terms governed by laws of India. Disputes resolved through arbitration 
                  in Pune, Maharashtra.
                </p>

                <div className="bg-purple-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">Dispute Resolution</h4>
                  <ul className="list-disc list-inside text-purple-900">
                    <li>Binding arbitration under Indian Arbitration Act</li>
                    <li>Arbitration in Pune, Maharashtra</li>
                    <li>Class action lawsuits waived</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section title="6. Contact Information" icon={Users}>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Reach Out to Midnight Solutions</h3>
                <div className="space-y-2">
                  <p><strong>Email:</strong> midnightsolutions750@gmail.com</p>
                  <p><strong>Phone:</strong> +91 9423515112, +91 7028374623</p>
                  <p>
                    <strong>Address:</strong> R cube, Tanaji Nagar, Mohan Nagar, 
                    Dhankawadi, Pune, Maharashtra, 411043
                  </p>
                </div>
              </div>
            </Section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfServicePage;