"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Lock, 
  AlertCircle, 
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

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card className="w-full">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Privacy Policy
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
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;