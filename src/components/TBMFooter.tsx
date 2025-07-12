
import React from "react";
import { Link } from "react-router-dom";
import { Brain, Github, Twitter, Mail } from "lucide-react";

const TBMFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200" id="contact">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-tbm-500" />
              <span className="text-2xl font-bold text-gray-900">TBM Labs</span>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              The Blabbering Mong - A privacy-first AI playground where you bring your own keys and explore the power of artificial intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-tbm-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-tbm-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:hello@theblabberingmong.com" className="text-gray-400 hover:text-tbm-500 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#tools" className="text-gray-600 hover:text-tbm-500 transition-colors">Data Analyst</a></li>
              <li><a href="#tools" className="text-gray-600 hover:text-tbm-500 transition-colors">Email Summarizer</a></li>
              <li><a href="#tools" className="text-gray-600 hover:text-tbm-500 transition-colors">Translator</a></li>
              <li><a href="#tools" className="text-gray-600 hover:text-tbm-500 transition-colors">Text-to-Speech</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-gray-600 hover:text-tbm-500 transition-colors">Blog</Link></li>
              <li><Link to="/track/fundamentals" className="text-gray-600 hover:text-tbm-500 transition-colors">LLM Fundamentals</Link></li>
              <li><Link to="/track/data-scientist" className="text-gray-600 hover:text-tbm-500 transition-colors">Data Science</Link></li>
              <li><Link to="/track/engineer" className="text-gray-600 hover:text-tbm-500 transition-colors">Engineering</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2024 TBM Labs. Privacy-first AI playground. No data or keys are stored.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-tbm-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-tbm-500 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TBMFooter;
