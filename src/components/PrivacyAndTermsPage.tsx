"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertCircle, 
  ShieldCheck, 
  FileText, 
  Home, 
  Globe, 
  Users, 
  Lock, 
  BookOpen 
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

const PrivacyAndTermsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('terms');

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="w-full">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Excuse Me Platform
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
          <Tabs 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="terms" className="flex items-center">
                <FileText className="mr-2" size={18} /> Terms of Service
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center">
                <ShieldCheck className="mr-2" size={18} /> Privacy Policy
              </TabsTrigger>
            </TabsList>

            <TabsContent value="terms">
              <div className="space-y-6">
                <Section title="1. Introduction and Definitions" icon={BookOpen}>
                  <div className="space-y-4">
                    <p>
                      Welcome to Excuse Me, a restaurant management tool developed by Midnight Solutions. 
                      This platform facilitates restaurant operations through QR-based menus, order processing, 
                      and administrative functionality.
                    </p>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h3 className="font-semibold mb-2">Key Definitions:</h3>
                      <ul className="list-disc list-inside">
                        <li><strong>"We/Our/Us":</strong> Midnight Solutions</li>
                        <li><strong>"User/You":</strong> Restaurant owners, managers, staff, and customers</li>
                        <li><strong>"Platform":</strong> Digital service for restaurant management</li>
                      </ul>
                    </div>
                  </div>
                </Section>

                <Section title="2. Platform Usage" icon={Users}>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">For Restaurants</h3>
                    <ul className="list-disc list-inside mb-4">
                      <li>Manage digital menus</li>
                      <li>Receive and process customer orders</li>
                      <li>Workflow automation</li>
                    </ul>

                    <h3 className="font-semibold text-lg">For Customers</h3>
                    <ul className="list-disc list-inside">
                      <li>Scan QR code to access digital menu</li>
                      <li>Place orders through the platform</li>
                    </ul>

                    <div className="bg-yellow-50 p-3 rounded-lg mt-4">
                      <h4 className="font-semibold text-yellow-700 mb-2">Important Notes</h4>
                      <ul className="list-disc list-inside text-yellow-800">
                        <li>Order placement does not guarantee order acceptance</li>
                        <li>Restaurant manages order fulfillment and modifications</li>
                        <li>Midnight Solutions is not liable for order-related issues</li>
                      </ul>
                    </div>
                  </div>
                </Section>

                <Section title="3. Payment Terms" icon={Globe}>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Key Payment Characteristics</h3>
                    <ul className="list-disc list-inside">
                      <li>No payment processing by Excuse Me platform</li>
                      <li>Restaurants responsible for all payment-related activities</li>
                      <li>Full accountability for financial transactions</li>
                    </ul>

                    <div className="bg-red-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-red-700 mb-2">Important Disclaimer</h4>
                      <p className="text-red-800">
                        Restaurants bear full responsibility for payment processing, 
                        refunds, and compliance with financial regulations.
                      </p>
                    </div>
                  </div>
                </Section>

                <Section title="4. Legal Jurisdiction" icon={Home}>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Dispute Resolution</h3>
                    <ul className="list-disc list-inside">
                      <li>Governed by laws of India</li>
                      <li>Disputes resolved through binding arbitration</li>
                      <li>Arbitration in Pune, Maharashtra</li>
                      <li>Class action lawsuits waived</li>
                    </ul>
                  </div>
                </Section>
              </div>
            </TabsContent>

            <TabsContent value="privacy">
              <div className="space-y-6">
                <Section title="1. Data Collection" icon={Lock}>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">What We Collect</h3>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">Restaurant Data</h4>
                      <ul className="list-disc list-inside text-green-900">
                        <li>Business name</li>
                        <li>Contact details</li>
                        <li>Menu information</li>
                        <li>Operational statistics</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2">Customer Data Policy</h4>
                      <p className="text-red-900 font-bold">
                        NO customer personal data is collected or stored
                      </p>
                    </div>
                  </div>
                </Section>

                <Section title="2. Data Usage and Security" icon={AlertCircle}>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">How We Use Data</h3>
                    <ul className="list-disc list-inside">
                      <li>Platform performance enhancement</li>
                      <li>User experience improvement</li>
                      <li>Operational analytics provision</li>
                    </ul>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Data Protection Commitment</h4>
                      <p className="text-blue-900">
                        We do not sell, rent, or commercialize any collected data. 
                        Information is used exclusively for platform services.
                      </p>
                    </div>
                  </div>
                </Section>

                <Section title="3. Contact Information" icon={Users}>
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyAndTermsPage;