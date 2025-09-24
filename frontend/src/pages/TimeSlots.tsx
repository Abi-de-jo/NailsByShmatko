import React, { useState, useEffect } from "react";
import { translations } from '../data/translations';
interface TimeSlotsProps {
  startHour?: number; // default 8 (8 AM)
  endHour?: number;   // default 20 (8 PM)
  gapHours?: number;  // default 2 hours
  onSelect?: (time: string) => void;
  serviceDuration?: string; // e.g., "30 min", "1 hour"
}

const TimeSlots: React.FC<TimeSlotsProps> = ({
  startHour = 8,
  endHour = 20,
  gapHours = 2,
  onSelect,
  serviceDuration = translations.uk.oneHour
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentHour, setCurrentHour] = useState<number>(new Date().getHours());
  const [currentMinute, setCurrentMinute] = useState<number>(new Date().getMinutes());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentHour(now.getHours());
      setCurrentMinute(now.getMinutes());
      setCurrentDate(now);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('uk-UA', options);
  };

  const generateSlots = () => {
    const slots: string[] = [];
    for (let hour = startHour; hour < endHour; hour += gapHours) {
      const start = formatHour(hour);
      const end = formatHour(hour + gapHours);
      slots.push(`${start} - ${end}`);
    }
    return slots;
  };

  const formatHour = (hour24: number) => {
    const period = hour24 >= 12 ? translations.uk.pm : translations.uk.am;
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    return `${hour12}:00 ${period}`;
  };

  const isSlotPast = (slotHour: number) => {
    const currentTotalMinutes = currentHour * 60 + currentMinute;
    const slotStartMinutes = slotHour * 60;
    return slotStartMinutes < currentTotalMinutes;
  };

  const handleSelect = (slot: string, hour: number) => {
    if (isSlotPast(hour)) return;
    
    setSelectedSlot(slot);
    onSelect?.(slot);
  };

  const slots = generateSlots();

  return (
    <div className="max-w-4xl mx-auto p-4 mb-3">
      {/* Compact header with date and service info */}
      <div className="flex justify-between items-center mb-6 p-4 bg-[#e7e4ff] rounded-2xl">
        <div>
          <h2 className="text-2xl font-bold text-[#1c0038]">{translations.uk.pickTime}</h2>
          <p className="text-[#1c0038]/80 text-sm mt-1">
            {translations.uk.serviceDuration}: <span className="font-semibold text-[#9929EA]">{serviceDuration}</span>
          </p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-[#1c0038]">{formatDate(currentDate)}</div>
          <div className="text-sm text-[#1c0038]/70">{translations.uk.today}</div>
        </div>
      </div>

      {/* Time slots grid - more compact */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {slots.map((slot, idx) => {
          const slotHour = startHour + idx * gapHours;
          const isPast = isSlotPast(slotHour);
          const isSelected = slot === selectedSlot;
          const isCurrentSlot = currentHour >= slotHour && currentHour < slotHour + gapHours;

          return (
            <button
              key={idx}
              onClick={() => handleSelect(slot, slotHour)}
              disabled={isPast}
              className={`
                relative p-3 rounded-xl font-medium transition-all duration-200 
                border-2 text-sm hover:scale-102 active:scale-98
                ${isPast 
                  ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : isSelected
                  ? "border-[#9929EA] bg-[#9929EA] text-white shadow-lg"
                  : "border-[#faeb92] bg-[#faeb92]/40 text-[#1c0038] hover:border-[#cc66da] hover:bg-[#cc66da]/15"
                }
                ${isCurrentSlot && !isPast ? "ring-1 ring-[#cc66da] ring-offset-1" : ""}
              `}
            >
              {/* Current slot indicator */}
              {isCurrentSlot && !isPast && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-[#cc66da] text-white text-xs rounded-full font-medium">
                  {translations.uk.now}
                </span>
              )}
              
              {/* Selected slot indicator */}
              {isSelected && (
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#9929EA] rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}

              <div className="text-center ">
                <div className={`font-bold ${isPast ? "text-black" : "text-black"}`}>
                  {slot.split(" - ")[0]}
                </div>
                <div className="text-xs opacity-60 mt-0.5 text-black">{translations.uk.to}</div>
                <div className={`font-semibold ${isPast ? "text-black" : "text-black"}`}>
                  {slot.split(" - ")[1]}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlots;