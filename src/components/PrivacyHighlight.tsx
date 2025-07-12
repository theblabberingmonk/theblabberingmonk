
import React from "react";
import { Shield, Key, Trash2, Lock } from "lucide-react";

const PrivacyHighlight = () => {
  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data never leaves your browser session"
    },
    {
      icon: Key,
      title: "Bring Your Own Key",
      description: "Use your own OpenAI, Gemini, or other API keys"
    },
    {
      icon: Trash2,
      title: "No Data Storage",
      description: "We don't save your inputs, outputs, or API keys"
    },
    {
      icon: Lock,
      title: "One-Time Sessions",
      description: "Each session is independent and secure"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white" id="privacy">
      <div className="section-container">
        <div className="text-center mb-12">
          <div className="tbm-chip mx-auto mb-6">
            <span>Security & Privacy</span>
          </div>
          <h2 className="section-title mb-6">
            Your Data is <span className="text-tbm-500">Yours</span>
          </h2>
          <p className="section-subtitle mx-auto">
            We believe in absolute privacy. That's why we built TBM Labs with a zero-data-retention philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="text-center group opacity-0 animate-on-scroll"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-tbm-100 rounded-full mb-4 group-hover:bg-tbm-200 transition-colors">
                <feature.icon className="w-8 h-8 text-tbm-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-tbm-50 rounded-2xl border border-tbm-100">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-tbm-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <h4 className="font-semibold text-gray-900">Enter Your API Key</h4>
                <p className="text-gray-600 text-sm">Paste your API key securely in your browser</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-tbm-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <h4 className="font-semibold text-gray-900">Use Any Tool</h4>
                <p className="text-gray-600 text-sm">Access our suite of AI tools with your key</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-tbm-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <h4 className="font-semibold text-gray-900">Session Ends</h4>
                <p className="text-gray-600 text-sm">Close tab, everything disappears forever</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyHighlight;
