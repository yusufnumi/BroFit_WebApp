import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { 
  User, 
  Calendar, 
  CreditCard, 
  Clock,
  X,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Activity
} from 'lucide-react';
import { useState } from 'react';

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { 
    bookings, 
    membership, 
    cancelBooking, 
    cancelMembership,
    getMembershipDaysRemaining 
  } = useBooking();
  const [notification, setNotification] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/dashboard', message: 'Please log in to view your dashboard' }} />;
  }

  const handleCancelBooking = (bookingId) => {
    const result = cancelBooking(bookingId);
    setNotification({
      type: result.success ? 'success' : 'error',
      message: result.message
    });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCancelMembership = () => {
    const result = cancelMembership();
    setNotification({
      type: result.success ? 'success' : 'error',
      message: result.message
    });
    setShowCancelConfirm(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const daysRemaining = getMembershipDaysRemaining();

  return (
    <div className="min-h-screen bg-gray-50">
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

      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome back, <span className="text-orange-500">{user?.name?.split(' ')[0]}</span>!
              </h1>
              <p className="text-gray-400">{user?.email}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Membership Status */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-orange-500" />
                  Membership Status
                </h2>
              </div>
              
              {membership ? (
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Active
                        </span>
                        <span className="text-lg font-bold text-gray-900">{membership.planName}</span>
                      </div>
                      <p className="text-gray-500 mt-1">
                        {membership.duration} month plan
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">{daysRemaining}</p>
                      <p className="text-sm text-gray-500">days remaining</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Start Date</span>
                      <span className="font-medium">{new Date(membership.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">End Date</span>
                      <span className="font-medium">{new Date(membership.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-gray-600">Amount Paid</span>
                      <span className="font-medium">${membership.price}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      Cancel Membership
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Membership</h3>
                  <p className="text-gray-600 mb-4">
                    Get a membership to access classes and premium features
                  </p>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <span>View Plans</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Booked Classes */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                  My Booked Classes
                </h2>
              </div>
              
              {bookings.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Activity className="h-6 w-6 text-orange-500" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.className}</h3>
                            <p className="text-sm text-gray-500">with {booking.instructor}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium text-gray-900">{booking.day}</p>
                            <p className="text-sm text-gray-500">{booking.time} • {booking.duration} min</p>
                          </div>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel booking"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Booked Classes</h3>
                  <p className="text-gray-600 mb-4">
                    {membership 
                      ? "Browse our schedule and book your first class" 
                      : "Get a membership to start booking classes"}
                  </p>
                  <Link
                    to={membership ? "/classes" : "/pricing"}
                    className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <span>{membership ? "Browse Classes" : "Get Membership"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-gray-600">Classes Booked</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">{bookings.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-gray-600">Days Active</span>
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    {membership ? membership.duration * 30 - daysRemaining : 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/classes"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-orange-600">Book a Class</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500" />
                </Link>
                <Link
                  to="/pricing"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-orange-600">
                    {membership ? 'Change Plan' : 'Get Membership'}
                  </span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500" />
                </Link>
                <Link
                  to="/about"
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors group"
                >
                  <span className="text-gray-700 group-hover:text-orange-600">View Facilities</span>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-500" />
                </Link>
              </div>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-orange-500" />
                Account Info
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Name</span>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <span className="text-gray-500">Email</span>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <span className="text-gray-500">Member Since</span>
                  <p className="font-medium text-gray-900">
                    {membership 
                      ? new Date(membership.startDate).toLocaleDateString()
                      : 'Not a member yet'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Membership Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cancel Membership?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel your membership? You will lose access to 
              class bookings immediately.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Keep Membership
              </button>
              <button
                onClick={handleCancelMembership}
                className="flex-1 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
