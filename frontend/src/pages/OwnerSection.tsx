import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface OwnerSectionProps {
  loginResponseMessage?: string; // pass login message here
}

const OwnerSection: React.FC<OwnerSectionProps> = ({ loginResponseMessage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // If login response contains "Admin", redirect to admin dashboard
    if (loginResponseMessage?.toLowerCase().includes("admin")) {
      navigate("/admin/dashboard");
    }
  }, [loginResponseMessage, navigate]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#e7e4ff] via-white to-[#faeb92]/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-[#9929ea]/20 to-[#cc66da]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-gradient-to-r from-[#faeb92]/30 to-[#e7e4ff]/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/2 w-32 h-32 bg-gradient-to-r from-[#1c0038]/10 to-[#9929ea]/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-6 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#1c0038] to-[#9929ea] bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
            NailStudio
          </div>
          <Link to="/profile" className="bg-[#1c0038] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#9929ea] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#9929ea]/25">
            Profile
          </Link>
        </div>
      </nav>

      {/* Owner Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#9929ea] via-[#cc66da] to-[#faeb92] rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500">
              <img
                src="/girl.jpg"
                alt="Master Shmatko"
                className="w-full h-full object-cover transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c0038]/20 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Owner Info */}
          <div className="flex flex-col justify-center text-center lg:text-left max-w-2xl space-y-6">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm font-medium text-[#1c0038] shadow-lg">
                Master Nail Artist
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1c0038] via-[#9929ea] to-[#cc66da] bg-clip-text text-transparent animate-pulse">
                Shmatko
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#9929ea] to-[#cc66da] mx-auto lg:mx-0 rounded-full"></div>
            </div>

            <p className="text-lg md:text-xl text-[#1c0038]/80 leading-relaxed font-normal">
              Master nail artist with over <span className="font-semibold text-[#9929ea]">5 years</span> of experience creating 
              <span className="font-semibold text-[#cc66da]"> editorial luxury</span> nail designs. Specializing in custom nail art, 
              gel extensions, and premium nail care treatments.
            </p>

            {/* Achievement badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#1c0038] shadow-lg hover:shadow-xl transition-shadow">
                5+ Years Experience
              </div>
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#1c0038] shadow-lg hover:shadow-xl transition-shadow">
                Custom Nail Art
              </div>
              <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-[#1c0038] shadow-lg hover:shadow-xl transition-shadow">
                Premium Treatments
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerSection;
