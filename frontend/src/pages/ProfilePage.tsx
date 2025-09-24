import React, { useState, useEffect, useMemo, useCallback, type JSX } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Scissors,
  Sparkles,
  Heart,
  Star,
  Edit3,
  Trash2,
   CheckCircle,
  Clock as ClockIcon,
  RefreshCw,
} from "lucide-react";

interface Booking {
  id: string;
  name: string;
  contact: string;
  email?: string;
  selectedServices: any[];
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  createdAt: string;
}

// Cache implementation for large-scale optimization
class BookingCache {
  private cache: Map<string, { data: Booking[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  set(key: string, data: Booking[]) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string): Booking[] | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

 

const bookingCache = new BookingCache();

const ProfilePage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  // Efficient booking categorization using useMemo
  const { upcomingBookings, pastBookings } = useMemo(() => {
    const now = new Date();
    
      
    // Efficient filtering with pre-computation
    const upcoming: Booking[] = [];
    const past: Booking[] = [];
    
    bookings.forEach(booking => {
      const bookingDate = new Date(`${booking.date}T${booking.time}`);
      if (booking.status === "upcoming" && bookingDate >= now) {
        upcoming.push(booking);
      } else {
        past.push(booking);
      }
    });
    
    // Sort upcoming by date (ascending)
    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Sort past by date (descending)
    past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    return { upcomingBookings: upcoming, pastBookings: past };
  }, [bookings]);

  // Get user ID from localStorage efficiently
  useEffect(() => {
    const userBookings = localStorage.getItem("beautyBookings");
    if (userBookings) {
      try {
        const parsed = JSON.parse(userBookings);
        if (parsed.length > 0) {
          setUserId(parsed[0].contact); // Use contact as user identifier
        }
      } catch (err) {
        console.error("Error parsing user bookings:", err);
      }
    }
  }, []);

  const fetchBookings = useCallback(async (contact: string) => {
    if (!contact) return;
  
    // Check cache first
    const cached = bookingCache.get(contact);
    if (cached) {
      setBookings(cached);
      setIsLoading(false);
      return;
    }
  
    setIsLoading(true);
    setError("");
  
    try {
      const response = await fetch(`https://nails-by-shmatko.vercel.app/bookings/user/${contact}`);
  
      if (!response.ok) throw new Error(`Failed to fetch bookings: ${response.status}`);
  
      const backendBookings: Booking[] = await response.json();
  
      // Only merge if backend returned something
      const mergedBookings = backendBookings.length ? backendBookings : getLocalBookings();
  
      setBookings(mergedBookings);
      bookingCache.set(contact, mergedBookings);
  
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Using local data.");
      setBookings(getLocalBookings());
    } finally {
      setIsLoading(false);
    }
  }, []);
  

  // Efficient local storage operations
  const getLocalBookings = (): Booking[] => {
    try {
      const stored = localStorage.getItem("beautyBookings");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

 

  // Load bookings when user ID is available
  useEffect(() => {
    if (userId) {
      fetchBookings(userId);
    }
  }, [userId, fetchBookings]);

  // Optimized booking operations
  const cancelBooking = async (bookingId: string) => {
    const originalBookings = [...bookings];
    
    // Optimistic UI update
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: "cancelled" as const }
          : booking
      )
    );
    
    try {
      const response = await fetch(`https://nails-by-shmatko.vercel.app/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled" }),
      });
      
      if (!response.ok) throw new Error("Failed to cancel booking");
      
      // Invalidate cache
      bookingCache.clear();
      
    } catch (err) {
      console.error("Error cancelling booking:", err);
      // Revert optimistic update
      setBookings(originalBookings);
      setError("Failed to cancel booking");
    }
  };

  const rescheduleBooking = (booking: Booking) => {
    setEditingBooking(booking);
  };

  const updateBookingTime = async (bookingId: string, newDate: string, newTime: string) => {
    if (!bookingId) return;
    
    const originalBookings = [...bookings];
    
    // Optimistic UI update
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, date: newDate, time: newTime }
          : booking
      )
    );
    
    setEditingBooking(null);
    
    try {
      const response = await fetch(`https://nails-by-shmatko.vercel.app/bookings/${bookingId}/reschedule`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
         },
        body: JSON.stringify({ date: newDate, time: newTime }),
      });
      
      if (!response.ok) throw new Error("Failed to reschedule booking");
      
      const updatedBooking = await response.json();
      console.log("Rescheduled booking:", updatedBooking);
      
      // Invalidate cache
      bookingCache.clear();
      
    } catch (err) {
      console.error("Error rescheduling booking:", err);
      // Revert optimistic update
      setBookings(originalBookings);
      setError("Failed to reschedule booking");
    }
  };

  // Memoized utility functions
  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const serviceIcons = useMemo(() => [Scissors, Sparkles, Heart, Star], []);
  const getServiceIcon = useCallback((index: number) => 
    serviceIcons[index % serviceIcons.length], [serviceIcons]);

  const calculateTotal = useCallback((services: any[]) => {
    return services.reduce((total, service) => {
      const price = parseInt(service.price.replace(/[^\d]/g, "")) || 0;
      return total + price;
    }, 0);
  }, []);

  const getStatusColor = useCallback((status: string) => {
    const colors = {
      upcoming: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    const icons = {
      upcoming: <ClockIcon className="w-4 h-4 text-blue-500" />,
      completed: <CheckCircle className="w-4 h-4 text-green-500" />,
      cancelled: <ClockIcon className="w-4 h-4 text-red-500" />,
    };
    return icons[status as keyof typeof icons] || <ClockIcon className="w-4 h-4 text-gray-500" />;
  }, []);

  // Current bookings to display
  const currentBookings = activeTab === "upcoming" ? upcomingBookings : pastBookings;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e7e4ff] to-[#faeb92]/20 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-[#9929EA] animate-spin mx-auto mb-4" />
          <p className="text-[#1c0038]">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#e7e4ff] to-[#faeb92]/20 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#1c0038] mb-2">
            My Profile
          </h1>
          <p className="text-base sm:text-lg text-[#CC66DA]">
            Manage your appointments and beauty journey
          </p>
        </div>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#faeb92] p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-[#9929EA] to-[#CC66DA] rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c0038]">
                  {bookings[0]?.name || "Guest User"}
                </h2>
                <p className="text-[#CC66DA] text-sm">Beauty Enthusiast</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#e7e4ff]/30 rounded-xl">
                  <Phone className="w-5 h-5 text-[#CC66DA]" />
                  <div>
                    <p className="text-xs text-gray-600">Contact</p>
                    <p className="text-sm font-medium text-[#1c0038]">
                      {bookings[0]?.contact || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-[#e7e4ff]/30 rounded-xl">
                  <Mail className="w-5 h-5 text-[#CC66DA]" />
                  <div>
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm font-medium text-[#1c0038]">
                      {bookings[0]?.email || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-[#faeb92]">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-[#9929EA]">
                    {upcomingBookings.length}
                  </p>
                  <p className="text-xs text-gray-600">Upcoming</p>
                </div>
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-green-500">
                    {pastBookings.filter(b => b.status === "completed").length}
                  </p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-bold text-[#CC66DA]">
                    {bookings.length}
                  </p>
                  <p className="text-xs text-gray-600">Total</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bookings Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-xl border-2 border-[#faeb92] p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <button
                  onClick={() => setActiveTab("upcoming")}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    activeTab === "upcoming"
                      ? "bg-[#9929EA] text-white"
                      : "text-[#1c0038] hover:bg-[#e7e4ff]"
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  Upcoming ({upcomingBookings.length})
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                    activeTab === "history"
                      ? "bg-[#9929EA] text-white"
                      : "text-[#1c0038] hover:bg-[#e7e4ff]"
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  History ({pastBookings.length})
                </button>
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-5">
              {currentBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  onReschedule={rescheduleBooking}
                  onCancel={cancelBooking}
                  formatDate={formatDate}
                  getServiceIcon={getServiceIcon}
                  calculateTotal={calculateTotal}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                />
              ))}

              {currentBookings.length === 0 && (
                <EmptyState activeTab={activeTab} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {editingBooking && (
        <RescheduleModal
          booking={editingBooking}
          onClose={() => setEditingBooking(null)}
          onConfirm={updateBookingTime}
        />
      )}
    </section>
  );
};

// Optimized Booking Card Component
const BookingCard: React.FC<{
  
  booking: Booking;
  onReschedule: (booking: Booking) => void;
  onCancel: (id: string) => void;
  formatDate: (date: string) => string;
  getServiceIcon: (index: number) => React.ComponentType<any>;
  calculateTotal: (services: any[]) => number;
  getStatusColor: (status: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
}> = React.memo(({ 
  booking, 
  onReschedule, 
  onCancel, 
  formatDate, 
  getServiceIcon, 
  calculateTotal, 
  getStatusColor, 
  getStatusIcon 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-[#faeb92] overflow-hidden">
      <div className="bg-gradient-to-r from-[#faeb92] to-[#e7e4ff] p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-white/80 p-3 rounded-xl">
              <Calendar className="w-6 sm:w-8 h-6 sm:h-8 text-[#9929EA]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1c0038]">
                {formatDate(booking.date)}
              </h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Clock className="w-4 h-4 text-[#CC66DA]" />
                <span className="text-sm font-medium text-[#CC66DA]">
                  {booking.time}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {booking.status === "upcoming" && (
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => onReschedule(booking)}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-white text-[#9929EA] rounded-xl text-sm font-medium hover:bg-[#e7e4ff] transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Reschedule
              </button>
              <button
                onClick={() => onCancel(booking.id)}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-xl text-sm font-medium hover:bg-red-200 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h4 className="text-base sm:text-lg font-bold text-[#1c0038] mb-3">
          Selected Services
        </h4>
        <div className="space-y-3 mb-4">
          {booking.selectedServices.map((service, index) => {
            const IconComponent = getServiceIcon(index);
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-[#e7e4ff]/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#9929EA] rounded-lg">
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#1c0038]">
                      {service.name}
                    </p>
                    <p className="text-xs sm:text-sm text-[#CC66DA] font-semibold">
                      {service.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[#faeb92]">
          <div>
            <p className="text-xs text-gray-600">Total</p>
            <p className="text-lg sm:text-2xl font-bold text-[#9929EA]">
              {calculateTotal(booking.selectedServices)}₴
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            {getStatusIcon(booking.status)}
            <span>
              {booking.status === "upcoming" ? "Scheduled" : 
               booking.status === "completed" ? "Completed" : "Cancelled"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

// Empty State Component
const EmptyState: React.FC<{ activeTab: "upcoming" | "history" }> = ({ activeTab }) => (
  <div className="bg-white rounded-2xl shadow-xl border-2 border-[#faeb92] p-8 text-center">
    <Calendar className="w-12 h-12 text-[#e7e4ff] mx-auto mb-3" />
    <h3 className="text-lg sm:text-xl font-bold text-[#1c0038] mb-2">
      No {activeTab === "upcoming" ? "Upcoming" : "Past"} Bookings
    </h3>
    <p className="text-sm sm:text-base text-[#CC66DA]">
      {activeTab === "upcoming" 
        ? "You don't have any upcoming appointments. Book one now!" 
        : "Your booking history will appear here."}
    </p>
  </div>
);

// Reschedule Modal Component
const RescheduleModal: React.FC<{
  booking: Booking;
  onClose: () => void;
  onConfirm: (id: string, date: string, time: string) => void;
}> = ({ booking, onClose, onConfirm }) => {
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour += 2) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-[#faeb92] p-6 max-w-md w-full">
        <h3 className="text-lg sm:text-xl font-bold text-[#1c0038] mb-4">
          Reschedule Appointment
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#1c0038] mb-2">
              New Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 border-2 border-[#e7e4ff] rounded-xl focus:border-[#9929EA] focus:ring-2 focus:ring-[#9929EA]/20 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#1c0038] mb-2">
              New Time
            </label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border-2 border-[#e7e4ff] rounded-xl focus:border-[#9929EA] focus:ring-2 focus:ring-[#9929EA]/20 transition-all text-sm"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(booking.id, date, time)}
              className="flex-1 py-2 bg-gradient-to-r from-[#9929EA] to-[#CC66DA] text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all"
            >
              Confirm Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;