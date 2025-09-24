import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      id: 1,
      name: "Sophia Rodriguez",
      role: "Regular Client",
      rating: 5,
      text: "The best nail salon I've ever visited! The attention to detail is incredible. My gel manicure lasted over 3 weeks without a single chip. Absolutely worth every penny!",
      image: "/testimonials/sophia.jpg",
      service: "Gel Manicure",
      duration: "Client for 2 years"
    },
    {
      id: 2,
      name: "Emily Chen",
      role: "Bride-to-be",
      rating: 5,
      text: "I had my bridal nails done here and they were absolutely stunning! The team listened to my vision and executed it perfectly. So many compliments on my wedding day!",
      image: "/testimonials/emily.jpg",
      service: "Bridal Package",
      duration: "One-time service"
    },
    {
      id: 3,
      name: "Jessica Williams",
      role: "Business Owner",
      rating: 5,
      text: "As a busy entrepreneur, I need my nails to look professional and last. This place never disappoints. The quality and service are consistently excellent.",
      image: "/testimonials/jessica.jpg",
      service: "Dip Powder",
      duration: "Monthly client"
    },
    {
      id: 4,
      name: "Mia Thompson",
      role: "Fashion Blogger",
      rating: 5,
      text: "I've tried countless nail salons, but none compare to the artistry here. The designs are always trendy and the technicians are true artists!",
      image: "/testimonials/mia.jpg",
      service: "Nail Art Design",
      duration: "Client for 1 year"
    },
    {
      id: 5,
      name: "Olivia Martinez",
      role: "Model",
      rating: 5,
      text: "Perfect nails every single time! The hygiene standards are impeccable and the staff makes you feel like royalty. My go-to place for photoshoots!",
      image: "/testimonials/olivia.jpg",
      service: "Luxury Manicure",
      duration: "Professional client"
    }
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Scroll animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (scrollRef.current) {
      const elements = scrollRef.current.querySelectorAll('.testimonial-item');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-[#e7e4ff] to-[#faeb92]/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#9929EA]/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#CC66DA]/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1c0038] mb-4">
            Loved by Clients
          </h2>
          <p className="text-xl text-[#CC66DA] max-w-2xl mx-auto">
            Discover why our clients keep coming back for exceptional nail care experiences
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-12" data-aos="fade-up" data-aos-delay="200">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-[#faeb92] p-8 md:p-12 mx-auto max-w-4xl">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-[#9929EA] to-[#CC66DA] rounded-2xl flex items-center justify-center">
                <Quote className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              
              <p className="text-2xl md:text-3xl font-serif text-[#1c0038] leading-relaxed mb-6">
                "{testimonials[currentIndex].text}"
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-[#9929EA] to-[#CC66DA] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-[#1c0038] text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-[#CC66DA] font-medium">{testimonials[currentIndex].role}</p>
                  <p className="text-gray-600 text-sm">{testimonials[currentIndex].service}</p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-[#faeb92] flex items-center justify-center hover:bg-[#faeb92] transition-all duration-300"
            >
              <ChevronLeft className="w-6 h-6 text-[#9929EA]" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-[#faeb92] flex items-center justify-center hover:bg-[#faeb92] transition-all duration-300"
            >
              <ChevronRight className="w-6 h-6 text-[#9929EA]" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#9929EA] w-8'
                    : 'bg-[#CC66DA]/30 hover:bg-[#CC66DA]/50'
                }`}
              />
            ))}
          </div>
        </div>

 

        {/* Stats Section */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="400">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#9929EA]">500+</div>
              <div className="text-[#1c0038] font-medium">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#CC66DA]">4.9</div>
              <div className="text-[#1c0038] font-medium">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#9929EA]">2K+</div>
              <div className="text-[#1c0038] font-medium">Services Done</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#CC66DA]">98%</div>
              <div className="text-[#1c0038] font-medium">Return Clients</div>
            </div>
          </div>
        </div>

 
      </div>

      <style  >{`
        .testimonial-item {
          animation: slideUp 0.6s ease-out;
        }
        
        .testimonial-item.animate-in {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;