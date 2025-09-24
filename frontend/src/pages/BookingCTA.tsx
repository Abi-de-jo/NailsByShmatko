import React from "react";

interface BookNowSectionProps {
  bookingPageUrl?: string; // default /book
  label?: string;           // default "Book Now"
  backgroundImage?: string; // optional background image
}

const BookNowSection: React.FC<BookNowSectionProps> = ({
  bookingPageUrl = "/book",
  label = "Book Now",
  backgroundImage,
}) => {
  return (
    <section
      className={`relative w-full py-20 flex items-center justify-center`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: backgroundImage ? undefined : "#faeb92",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-3xl text-center max-w-md">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1c0038] mb-4">
          Ready to Book Your Appointment?
        </h2>
        <p className="text-[#1c0038]/80 mb-6">
          Secure your slot with our premium nail services today.
        </p>
        <a
          href={bookingPageUrl}
          className="px-8 py-3 bg-[#9929EA] text-white rounded-xl font-semibold text-lg hover:bg-[#CC66DA] transition-colors"
        >
          {label}
        </a>
      </div>
    </section>
  );
};

export default BookNowSection;
