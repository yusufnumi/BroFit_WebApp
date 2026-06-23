import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import PricingCard from '../components/PricingCard';
import CheckoutModal from '../components/CheckoutModal';
import pricingData from '../data/pricing.json';
import { AlertCircle, Check } from 'lucide-react';

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuth();
  const { membership } = useBooking();
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/pricing', message: 'Please log in to purchase a membership' } });
      return;
    }
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
  };

  const benefits = [
    'Access to all gym equipment',
    'Free fitness assessment',
    'Mobile app access',
    'Locker room facilities',
    'Towel service',
    'Free parking'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Simple, Transparent <span className="text-orange-500">Pricing</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that fits your fitness journey. All plans include full gym access 
            and our core amenities.
          </p>
        </div>
      </section>

      {/* Current Membership Alert */}
      {membership && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
            <Check className="h-6 w-6 text-green-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800">
                You have an active {membership.planName} membership
              </p>
              <p className="text-sm text-green-600">
                Valid until {new Date(membership.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {pricingData.plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onSelect={handleSelectPlan}
                isCurrentPlan={membership?.planId === plan.id}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Not Logged In Notice */}
      {!isAuthenticated && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-800">
                Login required to purchase
              </p>
              <p className="text-sm text-orange-600">
                Please create an account or log in to purchase a membership plan.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* All Plans Include */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Plans <span className="text-orange-500">Include</span>
            </h2>
            <p className="text-gray-600">
              Every membership comes with these essential benefits
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-orange-500" />
                </div>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Pricing <span className="text-orange-500">FAQ</span>
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Can I cancel my membership?</h3>
              <p className="text-gray-600">
                Yes, you can cancel your membership at any time from your dashboard. 
                Cancellations take effect at the end of your current billing period.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Can I upgrade my plan?</h3>
              <p className="text-gray-600">
                Absolutely! You can upgrade your plan at any time. The price difference 
                will be prorated for the remaining time in your current period.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Is there a trial period?</h3>
              <p className="text-gray-600">
                We offer a free day pass for first-time visitors. Come check out our 
                facilities before committing to a membership!
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Are classes included?</h3>
              <p className="text-gray-600">
                Group classes are included with the Popular and Premium plans. Starter 
                plan members can purchase class packs separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showModal}
        onClose={handleCloseModal}
        plan={selectedPlan}
      />
    </div>
  );
};

export default PricingPage;
