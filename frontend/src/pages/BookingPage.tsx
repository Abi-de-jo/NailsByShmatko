import React, { useState } from "react";
import { servicesData } from "../data/servicesData";
import { Calendar, Clock, User, Phone, Mail, Scissors, Sparkles, Heart, Star, X } from "lucide-react";
import { useTranslation } from "../contexts/TranslationContext";

interface BookingFormData {
  name: string;
  contact: string;
  email?: string;
  selectedServices: any[];
  date: string;
  time: string;
  userId: string;
}

const BookingPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    contact: "",
    email: "",
    selectedServices: [],
    date: "",
    time: "",
    userId: localStorage.getItem('userId') || '',
  });

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleServiceToggle = (service: any) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.find((s) => s.name === service.name);
      const updatedServices = exists
        ? prev.selectedServices.filter((s) => s.name !== service.name)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices: updatedServices };
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const bookingData = {
      ...formData,
      
      status: 'upcoming' as const,
    };
  
    // Save to localStorage
    try {
      const existingBookings = JSON.parse(localStorage.getItem('beautyBookings') || '[]');
      const updatedBookings = [...existingBookings, bookingData];
      localStorage.setItem('beautyBookings', JSON.stringify(updatedBookings));
    } catch (error) {
      console.error('Error saving booking locally:', error);
    }
  
    console.log("Booking Data (local):", bookingData);
  
    // Send to backend
    try {
      const res = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
  
      if (!res.ok) {
        const err = await res.json();
        console.error('Error from backend:', err);
        alert('Failed to submit booking to server.');
        return;
      }
  
      const savedBooking = await res.json();
      console.log('Booking Data (backend):', savedBooking);
      alert('Booking submitted successfully to server!');
    } catch (error) {
      console.error('Error sending booking to backend:', error);
      alert('Failed to submit booking to server.');
    }
  };
  

  const removeService = (serviceName: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.filter((s) => s.name !== serviceName),
    }));
  };

  const calculateTotal = () => {
    return formData.selectedServices.reduce((total, service) => {
      const price = parseInt(service.price.replace(/[^\d]/g, '')) || 0;
      return total + price;
    }, 0);
  };

  const serviceIcons = [Scissors, Sparkles, Heart, Star];
  const getServiceIcon = (index: number) => serviceIcons[index % serviceIcons.length];

  // Generate time slots
  const timeSlots = [];
  const startHour = 8;
  const endHour = 20;
  const gapHours = 2;
  
  for (let hour = startHour; hour <= endHour; hour += gapHours) {
    const timeString = `${hour.toString().padStart(2, '0')}:00`;
    timeSlots.push(timeString);
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#e7e4ff] to-[#faeb92]/20 py-4 sm:py-8">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1c0038] mb-3 sm:mb-4">
            {t('bookYourAppointment')}
          </h1>
          <p className="text-base sm:text-xl text-[#CC66DA] max-w-2xl mx-auto px-2">
            {t('selectServicesDescription')}
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Services Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border-2 border-[#faeb92] overflow-hidden">
              {/* Progress Steps */}
              <div className="bg-gradient-to-r from-[#faeb92] to-[#e7e4ff] p-4 sm:p-6">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#9929EA] rounded-full flex items-center justify-center text-white text-xs sm:text-base font-bold">1</div>
                    <span className="text-[#1c0038] text-sm sm:text-base font-medium">{t('services')}</span>
                  </div>
                  <div className="h-1 w-4 sm:w-8 bg-[#CC66DA]/30 mx-1 sm:mx-2"></div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#e7e4ff] border-2 border-[#CC66DA] rounded-full flex items-center justify-center text-[#CC66DA] text-xs sm:text-base font-bold">2</div>
                    <span className="text-[#1c0038]/60 text-sm sm:text-base font-medium">{t('details')}</span>
                  </div>
                  <div className="h-1 w-4 sm:w-8 bg-[#CC66DA]/30 mx-1 sm:mx-2"></div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#e7e4ff] border-2 border-[#CC66DA] rounded-full flex items-center justify-center text-[#CC66DA] text-xs sm:text-base font-bold">3</div>
                    <span className="text-[#1c0038]/60 text-sm sm:text-base font-medium">{t('confirm')}</span>
                  </div>
                </div>
              </div>

              {/* Services Selection */}
              <div className="p-3 sm:p-4 lg:p-6">
                {servicesData.map((category) => (
                  <div key={category.title} className="mb-4 sm:mb-6 lg:mb-8 last:mb-0">
                    <div 
                      className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-[#e7e4ff] to-[#faeb92]/30 rounded-xl sm:rounded-2xl cursor-pointer"
                      onClick={() => setActiveCategory(activeCategory === category.title ? null : category.title)}
                    >
                      <div>
                         <p className="text-[#CC66DA] text-sm sm:text-base font-medium">{category.title}</p>
                      </div>
                      <div className={`transform transition-transform ${activeCategory === category.title ? 'rotate-180' : ''}`}>
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#9929EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    <div className={`grid gap-2 sm:gap-3 mt-3 sm:mt-4 transition-all duration-300 ${
                      activeCategory === category.title ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                      <div className="overflow-hidden">
                        {category.services.map((service, serviceIndex) => {
                          const IconComponent = getServiceIcon(serviceIndex);
                          const isChecked = formData.selectedServices.some((s) => s.name === service.name);
                          
                          return (
                            <label
                              key={service.name}
                              className={`flex items-center gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-300 cursor-pointer group ${
                                isChecked
                                  ? "border-[#9929EA] bg-[#9929EA]/10 shadow-md sm:shadow-lg"
                                  : "border-[#e7e4ff] hover:border-[#CC66DA] hover:bg-[#CC66DA]/5"
                              }`}
                            >
                              <div className={`p-1.5 sm:p-2 rounded-md sm:rounded-lg transition-colors ${
                                isChecked ? "bg-[#9929EA]" : "bg-[#e7e4ff] group-hover:bg-[#CC66DA]"
                              }`}>
                                <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  isChecked ? "text-white" : "text-[#9929EA] group-hover:text-white"
                                }`} />
                              </div>
                              
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleServiceToggle(service)}
                                className="w-4 h-4 sm:w-5 sm:h-5 accent-[#9929EA]"
                              />
                              
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-[#1c0038] text-sm sm:text-base truncate">{service.name}</p>
                                <p className="text-xs sm:text-sm text-[#CC66DA] font-semibold">{service.price}</p>
                              </div>
                              
                              {service.variablePrice && service.details && (
                                <div className="text-right shrink-0">
                                  <p className="text-xs text-gray-500 hidden sm:block">{t('variablePricing')}</p>
                                </div>
                              )}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary & Form */}
          <div className="space-y-4 sm:space-y-6">
            {/* Booking Summary */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border-2 border-[#faeb92] p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#1c0038] mb-3 sm:mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#CC66DA]" />
                {t('selectedServices')}
              </h3>
              
              {formData.selectedServices.length === 0 ? (
                <p className="text-gray-500 text-center py-3 sm:py-4 text-sm sm:text-base">{t('noServicesSelected')}</p>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {formData.selectedServices.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-[#e7e4ff]/30 rounded-lg sm:rounded-xl">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#1c0038] text-xs sm:text-sm truncate">{service.nameEn}</p>
                        <p className="text-[#CC66DA] text-xs font-semibold">{service.price}</p>
                      </div>
                      <button
                        onClick={() => removeService(service.name)}
                        className="p-1 hover:bg-[#CC66DA]/20 rounded-full transition-colors shrink-0 ml-2"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-[#CC66DA]" />
                      </button>
                    </div>
                  ))}
                  
                  <div className="border-t border-[#faeb92] pt-2 sm:pt-3 mt-2 sm:mt-3">
                    <div className="flex justify-between items-center font-bold text-base sm:text-lg">
                      <span className="text-[#1c0038]">{t('total')}:</span>
                      <span className="text-[#9929EA]">{calculateTotal()}₴</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border-2 border-[#faeb92] p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#1c0038] mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#CC66DA]" />
                {t('appointmentDetails')}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#CC66DA]" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('yourFullName')}
                      required
                      className="w-full pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-[#e7e4ff] rounded-lg sm:rounded-xl focus:border-[#9929EA] focus:ring-2 focus:ring-[#9929EA]/20 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#CC66DA]" />
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder={t('contactNumber')}
                      required
                      className="w-full pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-[#e7e4ff] rounded-lg sm:rounded-xl focus:border-[#9929EA] focus:ring-2 focus:ring-[#9929EA]/20 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#CC66DA]" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('emailAddress')}
                      className="w-full pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-[#e7e4ff] rounded-lg sm:rounded-xl focus:border-[#9929EA] focus:ring-2 focus:ring-[#9929EA]/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#CC66DA]" />
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-[#e7e4ff] rounded-lg sm:rounded-xl focus:border-[#9929EA] focus:ring-2 focus:ring-[#9929EA]/20 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#CC66DA]" />
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-8 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-[#e7e4ff] rounded-lg sm:rounded-xl focus:border-[#9929EA] focus:ring-2 focus:ring-[#9929EA]/20 transition-all appearance-none bg-white"
                      >
                        <option value="">{t('selectTime')}</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formData.selectedServices.length === 0}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-[#9929EA] to-[#CC66DA] text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300"
                >
                  {t('confirmBooking')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPage;