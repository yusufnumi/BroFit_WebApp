import { 
  Activity, 
  Bike, 
  Dumbbell, 
  Music, 
  Heart,
  Sparkles
} from 'lucide-react';

const classIcons = {
  yoga: Heart,
  cycling: Bike,
  pilates: Sparkles,
  zumba: Music,
  strength: Dumbbell,
  hiit: Activity
};

const classColors = {
  yoga: 'bg-purple-100 text-purple-600 border-purple-200',
  cycling: 'bg-blue-100 text-blue-600 border-blue-200',
  pilates: 'bg-pink-100 text-pink-600 border-pink-200',
  zumba: 'bg-yellow-100 text-yellow-600 border-yellow-200',
  strength: 'bg-red-100 text-red-600 border-red-200',
  hiit: 'bg-orange-100 text-orange-600 border-orange-200'
};

const ClassCard = ({ classData, onBook, isBooked, canBook, isLoggedIn }) => {
  const Icon = classIcons[classData.type] || Activity;
  const colorClass = classColors[classData.type] || 'bg-gray-100 text-gray-600 border-gray-200';
  const spotsLeft = classData.capacity - classData.enrolled;
  const isFull = spotsLeft === 0;

  const getButtonState = () => {
    if (!isLoggedIn) {
      return { text: 'Login Required', disabled: true, className: 'bg-gray-300 text-gray-500 cursor-not-allowed' };
    }
    if (isBooked) {
      return { text: 'Booked ✓', disabled: true, className: 'bg-green-500 text-white cursor-default' };
    }
    if (!canBook) {
      return { text: 'Membership Required', disabled: true, className: 'bg-gray-300 text-gray-500 cursor-not-allowed' };
    }
    if (isFull) {
      return { text: 'Class Full', disabled: true, className: 'bg-gray-300 text-gray-500 cursor-not-allowed' };
    }
    return { text: 'Book Now', disabled: false, className: 'bg-orange-500 hover:bg-orange-600 text-white' };
  };

  const buttonState = getButtonState();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100">
      {/* Header */}
      <div className={`p-4 border-b ${colorClass}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${colorClass}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{classData.name}</h3>
              <p className="text-sm text-gray-600">{classData.instructor}</p>
            </div>
          </div>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${colorClass}`}>
            {classData.level}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <p className="text-sm text-gray-600 line-clamp-2">{classData.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-500">
            <span>{classData.day}</span>
            <span>{classData.time}</span>
            <span>{classData.duration} min</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Spots Available</span>
            <span className={`font-medium ${isFull ? 'text-red-500' : spotsLeft <= 3 ? 'text-orange-500' : 'text-green-500'}`}>
              {spotsLeft} / {classData.capacity}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all ${isFull ? 'bg-red-400' : spotsLeft <= 3 ? 'bg-orange-400' : 'bg-green-400'}`}
              style={{ width: `${(classData.enrolled / classData.capacity) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t">
        <button
          onClick={() => onBook(classData)}
          disabled={buttonState.disabled}
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${buttonState.className}`}
          title={!canBook && isLoggedIn ? 'You need an active membership to book classes' : ''}
        >
          {buttonState.text}
        </button>
      </div>
    </div>
  );
};

export default ClassCard;
