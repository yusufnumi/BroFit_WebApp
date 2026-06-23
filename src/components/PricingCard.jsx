import { Check, Star } from 'lucide-react';

const PricingCard = ({ plan, onSelect, isCurrentPlan }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      accent: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-300',
      accent: 'text-orange-600',
      button: 'bg-orange-500 hover:bg-orange-600'
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      accent: 'text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700'
    }
  };

  const colors = colorClasses[plan.color] || colorClasses.blue;

  return (
    <div 
      className={`relative rounded-2xl border-2 ${
        plan.highlighted 
          ? `${colors.border} ${colors.bg} shadow-xl scale-105` 
          : 'border-gray-200 bg-white shadow-lg'
      } overflow-hidden transition-transform hover:scale-[1.02]`}
    >
      {/* Popular Badge */}
      {plan.highlighted && (
        <div className="absolute top-0 right-0">
          <div className={`${colors.button} text-white px-4 py-1 text-sm font-semibold rounded-bl-lg flex items-center space-x-1`}>
            <Star className="h-4 w-4 fill-current" />
            <span>Most Popular</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="p-6 text-center">
        <h3 className={`text-xl font-bold ${colors.accent}`}>{plan.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{plan.duration} {plan.durationUnit}</p>
        
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
          <span className="text-gray-500 text-sm ml-1">total</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          ${plan.pricePerMonth}/month
        </p>
      </div>

      {/* Features */}
      <div className="px-6 pb-6">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className={`h-5 w-5 ${colors.accent} flex-shrink-0 mt-0.5`} />
              <span className="text-gray-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="p-6 pt-0">
        {isCurrentPlan ? (
          <button
            disabled
            className="w-full py-3 rounded-xl font-semibold bg-green-100 text-green-600 cursor-default"
          >
            Current Plan ✓
          </button>
        ) : (
          <button
            onClick={() => onSelect(plan)}
            className={`w-full py-3 rounded-xl font-semibold text-white transition-colors ${colors.button}`}
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default PricingCard;
