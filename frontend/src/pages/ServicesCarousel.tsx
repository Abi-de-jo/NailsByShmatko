import { useState, useRef } from "react";
import { Star, Scissors, Sparkles, Heart, X } from "lucide-react";

const ServicesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const servicesData = [
    {
      id: 1,
      category: "КОМПЛЕКС: МАНІКЮР",
      services: [
        { name: "Покриття кольоровою базою/гель-лак", price: "650₴", icon: Sparkles },
        { name: "Укріплення + гель-лак", price: "800₴", icon: Heart },
        { name: "Нарощення нігтів", price: "1200-1400₴", icon: Scissors },
        { name: "Корекція нарощення", price: "850-1200₴", icon: Star },
        { name: "Гігієнічний манікюр", price: "500₴", icon: Sparkles },
      ],
    },
    {
      id: 2,
      category: "КОМПЛЕКС: ПЕДИКЮР",
      services: [
        { name: "Покриття гель-лак + апаратна обробка стопи", price: "750₴", icon: Heart },
        { name: "Гігієнічний педикюр", price: "550₴", icon: Sparkles },
      ],
    },
    {
      id: 3,
      category: "ДОДАТКОВІ ПОСЛУГИ",
      services: [
        { name: "Ремонт нігтя", price: "20-60₴", icon: Scissors },
        { name: "Дизайн - Слайдери/стемпінг/абстракція", price: "до 100₴", icon: Star },
        { name: "Складні дизайни", price: "до 150₴", icon: Sparkles },
        { name: "Френч", price: "100₴", icon: Heart },
      ],
    },
  ];

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
    const container = scrollRef.current;
    if (container) {
      const itemEl = container.children[index] as HTMLElement;
      if (itemEl) {
        const containerRect = container.getBoundingClientRect();
        const itemRect = itemEl.getBoundingClientRect();
        const scrollLeft =
          container.scrollLeft +
          itemRect.left -
          containerRect.left -
          containerRect.width / 2 +
          itemRect.width / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  };

  const handleItemLeave = () => {
    setActiveIndex(null);
  };

  const openServiceModal = (service: any) => {
    setSelectedService(service);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  return (
    <section className="relative py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1c0038] mb-4">
            Our Services
          </h2>
          <p className="text-xl text-[#CC66DA] max-w-3xl mx-auto">
            Premium nail care services crafted with precision and luxury in mind
          </p>
        </div>

        {/* Services Carousel */}
        <div
          ref={scrollRef}
          className="relative overflow-x-auto flex gap-8 pb-8 scrollbar-hide"
        >
          {servicesData.map((category, categoryIndex) => (
            <div
              key={category.id}
              className={`flex-shrink-0 w-80 lg:w-96 group cursor-pointer transition-all duration-700 ${
                activeIndex === categoryIndex
                  ? "scale-105 transform -translate-y-2"
                  : activeIndex !== null
                  ? "scale-95 opacity-70"
                  : ""
              }`}
              onMouseEnter={() => handleItemHover(categoryIndex)}
              onMouseLeave={handleItemLeave}
            >
              {/* Service Card */}
              <div
                className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-500 ${
                  activeIndex === categoryIndex
                    ? "border-[#faeb92] shadow-2xl"
                    : "border-[#e7e4ff]"
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-[#1c0038] mb-2">
                    {category.category}
                  </h3>
                </div>

                {/* Services List */}
                <div className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <div
                      key={serviceIndex}
                      onClick={() => openServiceModal(service)}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#e7e4ff]/30 hover:bg-[#e7e4ff] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className="p-2 bg-gradient-to-r from-[#9929EA] to-[#CC66DA] rounded-lg flex-shrink-0">
                          <service.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-[#1c0038] leading-tight truncate">
                            {service.name}
                          </p>
                        </div>
                      </div>
                      <div className="px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-[#9929EA] to-[#CC66DA] text-white flex-shrink-0 ml-3">
                        {service.price}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#faeb92]/10 to-[#CC66DA]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl">
            {/* Close Button */}
            <button
              onClick={closeServiceModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#9929EA]"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Profile Image + Title */}
            <div className="flex items-center gap-4 mb-6">
              <img
                src="/girl.jpg"
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border-2 border-[#CC66DA]"
              />
              <div>
                <h3 className="text-xl font-bold text-[#1c0038]">
                  {selectedService.name}
                </h3>
                <p className="text-[#9929EA] font-semibold">
                  {selectedService.price}
                </p>
              </div>
            </div>

            {/* Detailed Info */}
            <p className="text-gray-700 leading-relaxed">
              This is a premium <span className="font-semibold">{selectedService.name}</span> service
              designed for nail health and beauty. Our experts ensure the best care
              with top-quality products and techniques.
            </p>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ServicesCarousel;
