import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
export default function FAQs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "How do I place an order using the QR code?",
      answer:
        "Simply scan the QR code on your table using your smartphone camera. This will open the menu on your device. Select your items, add them to your cart, and proceed to checkout.",
    },
    {
      question: "Do I need to create an account to place an order?",
      answer:
        "No, you don't need to create an account. You can place an order as a guest. However, creating an account allows you to save your preferences and view your order history.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit and debit cards, as well as popular digital wallets like Google Pay and Apple Pay. Cash payments may also be available depending on the restaurant.",
    },
    {
      question: "How do I know my order has been confirmed?",
      answer:
        "Once you place your order, the restaurant will send you an OTP for confirmation. Enter the OTP on your device to confirm your order. You'll also receive a confirmation message on your screen.",
    },
    {
      question: "Can I modify or cancel my order after placing it?",
      answer:
        "You can modify or cancel your order within 2 minutes of placing it. After that, the restaurant will start preparing your food, and changes may not be possible.",
    },
    {
      question: "What if I have dietary restrictions or allergies?",
      answer:
        "You can specify dietary restrictions or allergies in the special instructions section while placing your order. Our system will notify the restaurant to accommodate your needs.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes, we use advanced encryption and security measures to protect your personal information. Your data is never shared with third parties without your consent.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team via the 'Support' section in the app or by emailing support@qreats.com. We're available 24/7 to assist you.",
    },
  ];
  return (
    <div className="bg-gray-50 py-8 sm:py-16 px-4 sm:px-6 lg:px-8 h-[500px] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#FF6B2B] text-center mb-6 sm:mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto"> {/* Added max-height and overflow-y */}
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-4 sm:p-6 focus:outline-none"
              >
                <span className="text-base sm:text-lg font-semibold text-gray-800 text-left">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF6B2B]" />
                ) : (
                  <ChevronDown className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF6B2B]" />
                )}
              </button>
              {activeIndex === index && (
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}