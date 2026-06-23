import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import ClassCard from '../components/ClassCard';
import classesData from '../data/classes.json';
import { 
  Filter, 
  Search, 
  Calendar,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const ClassesPage = () => {
  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  
  const { isAuthenticated } = useAuth();
  const { bookClass, isClassBooked, hasActiveMembership } = useBooking();

  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const classTypes = ['All', 'yoga', 'cycling', 'pilates', 'zumba', 'strength', 'hiit'];

  const filteredClasses = useMemo(() => {
    return classesData.classes.filter(classItem => {
      const matchesDay = selectedDay === 'All' || classItem.day === selectedDay;
      const matchesType = selectedType === 'All' || classItem.type === selectedType;
      const matchesSearch = classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          classItem.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDay && matchesType && matchesSearch;
    });
  }, [selectedDay, selectedType, searchQuery]);

  const handleBook = (classData) => {
    const result = bookClass(classData);
    setNotification({
      type: result.success ? 'success' : 'error',
      message: result.message
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const canBook = hasActiveMembership();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Book Your <span className="text-orange-500">Classes</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from a variety of fitness classes led by our expert instructors. 
            Book your spot and start your fitness journey today!
          </p>
        </div>
      </section>

      {/* Notification */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in">
          <div className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg ${
            notification.type === 'success' 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {notification.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Membership Notice */}
      {isAuthenticated && !canBook && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-800">
                Membership Required
              </p>
              <p className="text-sm text-orange-600">
                You need an active membership to book classes.{' '}
                <Link to="/pricing" className="underline hover:text-orange-700">
                  View membership plans
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      {!isAuthenticated && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
            <AlertCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-800">
                Login to Book Classes
              </p>
              <p className="text-sm text-blue-600">
                Please{' '}
                <Link to="/login" className="underline hover:text-blue-700">
                  log in
                </Link>
                {' '}or{' '}
                <Link to="/register" className="underline hover:text-blue-700">
                  create an account
                </Link>
                {' '}to book classes.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="h-4 w-4 inline mr-1" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search by class or instructor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
              />
            </div>

            {/* Day Filter */}
            <div className="lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Day
              </label>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white"
              >
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="h-4 w-4 inline mr-1" />
                Class Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white capitalize"
              >
                {classTypes.map(type => (
                  <option key={type} value={type} className="capitalize">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedDay !== 'All' || selectedType !== 'All' || searchQuery) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedDay !== 'All' && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center">
                  {selectedDay}
                  <button
                    onClick={() => setSelectedDay('All')}
                    className="ml-2 hover:text-orange-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedType !== 'All' && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center capitalize">
                  {selectedType}
                  <button
                    onClick={() => setSelectedType('All')}
                    className="ml-2 hover:text-orange-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm flex items-center">
                  "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-orange-900"
                  >
                    ×
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedDay('All');
                  setSelectedType('All');
                  setSearchQuery('');
                }}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Classes Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {filteredClasses.length} {filteredClasses.length === 1 ? 'Class' : 'Classes'} Available
          </h2>
        </div>

        {filteredClasses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClasses.map(classItem => (
              <ClassCard
                key={classItem.id}
                classData={classItem}
                onBook={handleBook}
                isBooked={isClassBooked(classItem.id)}
                canBook={canBook}
                isLoggedIn={isAuthenticated}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Classes Found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ClassesPage;
