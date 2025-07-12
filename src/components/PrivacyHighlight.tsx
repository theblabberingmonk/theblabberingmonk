
import React from "react";
import { Shield, Key, BookOpen, Lock } from "lucide-react";

const PrivacyHighlight = () => {
  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your API keys and data are encrypted and secure"
    },
    {
      icon: Key,
      title: "Bring Your Own Key",
      description: "Store your API keys securely for seamless access"
    },
    {
      icon: BookOpen,
      title: "Progress Tracking",
      description: "We save your learning progress across all tracks"
    },
    {
      icon: Lock,
      title: "Secure Storage",
      description: "Your data is encrypted and only accessible to you"
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
            Your Journey is <span className="text-tbm-500">Yours</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Create an account to unlock the full power of TBM Labs. Your API keys, progress, and preferences are stored securely.
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
                <h4 className="font-semibold text-gray-900">Create Account</h4>
                <p className="text-gray-600 text-sm">Sign up to unlock all features and track progress</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-tbm-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <h4 className="font-semibold text-gray-900">Add Your Keys</h4>
                <p className="text-gray-600 text-sm">Securely store your API keys for all tools</p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-tbm-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <h4 className="font-semibold text-gray-900">Start Creating</h4>
                <p className="text-gray-600 text-sm">Access all tools and track your learning journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyHighlight;
