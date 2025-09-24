import { useState, useRef } from "react";
import { translations } from "../data/translations";
const GalleryCarousel = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const galleryItems = [
    { id: 1, image: "/nail1.jpg" },
    { id: 2, image: "/nail2.jpg" },
    { id: 3, image: "/nail3.jpg" },
    { id: 4, image: "/nail4.jpg" },
    { id: 5, image: "/top.jpg" },
    { id: 6, image: "/top1.jpg" },
    { id: 7, image: "/top2.jpg" },
    { id: 8, image: "/top3.jpg" },
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

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  };

  const handleItemLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="relative py-16 bg-transparent">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1c0038] mb-4">
          {translations.uk.galleryTitle}
        </h2>
        <p className="text-lg text-[#CC66DA] max-w-2xl mx-auto">
          {translations.uk.galleryCarouselDescription}
        </p>
      </div>

      <div
        ref={scrollRef}
        className="relative overflow-x-auto flex gap-6 md:gap-8 px-6 scrollbar-hide"
      >
        {galleryItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`flex-shrink-0 w-64 h-80 group cursor-pointer transition-all duration-700 ${
              activeIndex === index
                ? ""
                : activeIndex !== null
                ? " "
                : ""
            }`}
            onMouseEnter={() => handleItemHover(index)}
            onMouseLeave={handleItemLeave}
          >
            <div
              className={`relative w-full h-full rounded-2xl overflow-hidden transition-all duration-500 ${
                activeIndex === index
                  ? ""
                  : ""
              }`}
            >
              <img
                src={item.image}
                alt={translations.uk.galleryImageAlt}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  activeIndex === index ? "scale-110" : "group-hover:scale-105"
                }`}
              />

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-[#1c0038]/80 via-transparent to-transparent transition-all duration-300 ${
                  activeIndex === index
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryCarousel;