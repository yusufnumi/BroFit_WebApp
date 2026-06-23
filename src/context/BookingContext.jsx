import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BookingContext = createContext(null);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [membership, setMembership] = useState(null);

  // Load user's bookings and membership when user changes
  useEffect(() => {
    if (user) {
      const storedBookings = localStorage.getItem(`brofit_bookings_${user.id}`);
      const storedMembership = localStorage.getItem(`brofit_membership_${user.id}`);
      
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      } else {
        setBookings([]);
      }
      
      if (storedMembership) {
        const membershipData = JSON.parse(storedMembership);
        // Check if membership is still active
        if (new Date(membershipData.endDate) > new Date()) {
          setMembership(membershipData);
        } else {
          setMembership(null);
          localStorage.removeItem(`brofit_membership_${user.id}`);
        }
      } else {
        setMembership(null);
      }
    } else {
      setBookings([]);
      setMembership(null);
    }
  }, [user]);

  // Book a class
  const bookClass = (classData) => {
    if (!user) {
      return { success: false, message: 'Please log in to book a class' };
    }

    if (!membership) {
      return { success: false, message: 'Active membership required to book classes' };
    }

    // Check if already booked
    if (bookings.find(b => b.classId === classData.id)) {
      return { success: false, message: 'You have already booked this class' };
    }

    const newBooking = {
      id: Date.now(),
      classId: classData.id,
      className: classData.name,
      instructor: classData.instructor,
      day: classData.day,
      time: classData.time,
      duration: classData.duration,
      type: classData.type,
      bookedAt: new Date().toISOString()
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem(`brofit_bookings_${user.id}`, JSON.stringify(updatedBookings));

    return { success: true, message: 'Class booked successfully!' };
  };

  // Cancel a booking
  const cancelBooking = (bookingId) => {
    if (!user) {
      return { success: false, message: 'Please log in' };
    }

    const updatedBookings = bookings.filter(b => b.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem(`brofit_bookings_${user.id}`, JSON.stringify(updatedBookings));

    return { success: true, message: 'Booking cancelled successfully' };
  };

  // Check if a class is booked
  const isClassBooked = (classId) => {
    return bookings.some(b => b.classId === classId);
  };

  // Purchase membership
  const purchaseMembership = (plan) => {
    if (!user) {
      return { success: false, message: 'Please log in to purchase a membership' };
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.duration);

    const membershipData = {
      id: Date.now(),
      planId: plan.id,
      planName: plan.name,
      duration: plan.duration,
      price: plan.price,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      purchasedAt: new Date().toISOString()
    };

    setMembership(membershipData);
    localStorage.setItem(`brofit_membership_${user.id}`, JSON.stringify(membershipData));

    return { success: true, message: 'Membership purchased successfully!' };
  };

  // Cancel membership
  const cancelMembership = () => {
    if (!user) {
      return { success: false, message: 'Please log in' };
    }

    setMembership(null);
    localStorage.removeItem(`brofit_membership_${user.id}`);

    return { success: true, message: 'Membership cancelled' };
  };

  // Check if user has active membership
  const hasActiveMembership = () => {
    return membership !== null && new Date(membership.endDate) > new Date();
  };

  // Get remaining days in membership
  const getMembershipDaysRemaining = () => {
    if (!membership) return 0;
    const now = new Date();
    const end = new Date(membership.endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const value = {
    bookings,
    membership,
    bookClass,
    cancelBooking,
    isClassBooked,
    purchaseMembership,
    cancelMembership,
    hasActiveMembership,
    getMembershipDaysRemaining
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingContext;
