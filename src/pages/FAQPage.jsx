import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  ChevronUp, 
  Search,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import faqData from '../data/faq.json';

const FAQPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqData.faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-10 w-10 text-orange-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to the most common questions about BroFit memberships, 
            classes, and facilities.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600">
                Try searching with different keywords or browse all questions below.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-orange-500 hover:text-orange-600 font-medium"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:border-orange-200 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 font-semibold text-sm">
                        {index + 1}
                      </span>
                      <span className="font-semibold text-gray-900 text-left">
                        {faq.question}
                      </span>
                    </div>
                    {openFaq === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-orange-500 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 pb-5 pt-0">
                      <div className="pl-12 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Results count */}
          {searchQuery && filteredFaqs.length > 0 && (
            <p className="text-center text-gray-500 mt-6">
              Showing {filteredFaqs.length} of {faqData.faqs.length} questions
            </p>
          )}
        </div>
      </section>

      {/* Still Have Questions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="h-8 w-8 text-orange-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Can't find the answer you're looking for? Our friendly support team 
              is here to help you with any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Quick Links
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/classes"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                Browse Classes
              </h3>
              <p className="text-sm text-gray-600">
                Explore our wide variety of fitness classes
              </p>
            </Link>
            <Link
              to="/pricing"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                Membership Plans
              </h3>
              <p className="text-sm text-gray-600">
                Find the perfect plan for your fitness goals
              </p>
            </Link>
            <Link
              to="/about"
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                About BroFit
              </h3>
              <p className="text-sm text-gray-600">
                Learn more about our gym and facilities
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
