import React, { useEffect, useState } from "react";
import { Clock, Calendar, CheckCircle, XCircle } from "lucide-react";

interface Service {
  name: string;
  price: string;
}

interface Booking {
  id: string;
  name: string;
  contact: string;
  email?: string;
  selectedServices: Service[];
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

const API_BASE = "http://localhost:3000";

const AdminDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  const token = localStorage.getItem("adminToken");

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessage(data.message || null);
      if (data.bookings) setBookings(data.bookings);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (id: string, action: "accept" | "reject") => {
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}/${action}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = await res.json();
      console.log(`Booking ${action}ed:`, updated);
      // Update state locally
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: updated.status } : b))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">Admin Dashboard</h1>

      {message && <p className="mb-4 text-green-600 font-medium">{message}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white shadow rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="font-bold text-lg">{booking.name}</h2>
                <p className="text-sm text-gray-600">{booking.contact}</p>
                <p className="text-sm text-gray-600">{booking.email}</p>
                <p className="text-sm text-purple-700 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {formatDate(booking.date)}
                  {" "} <Clock className="w-4 h-4" /> {booking.time}
                </p>
                <p className={`text-sm mt-1 ${
                  booking.status === "upcoming" ? "text-blue-600" :
                  booking.status === "completed" ? "text-green-600" : "text-red-600"
                }`}>
                  Status: {booking.status}
                </p>

                <div className="mt-2">
                  <p className="font-medium">Services:</p>
                  <ul className="list-disc ml-5">
                    {booking.selectedServices.map((s, idx) => (
                      <li key={idx}>{s.name} - {s.price}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              {booking.status === "upcoming" && (
                <div className="mt-4 sm:mt-0 flex gap-2">
                  <button
                    onClick={() => updateBookingStatus(booking.id, "accept")}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 flex items-center gap-1"
                  >
                    <CheckCircle className="w-4 h-4" /> service completed
                  </button>
                  <button
                    onClick={() => updateBookingStatus(booking.id, "reject")}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 flex items-center gap-1"
                  >
                    <XCircle className="w-4 h-4" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
