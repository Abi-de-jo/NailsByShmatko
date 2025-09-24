import React, { useState } from "react";
import { X } from "lucide-react";
import { translations } from "../data/translations";
interface GalleryItem {
  id: number;
  image: string;
  title: string;
  category: string;
}

const galleryData: GalleryItem[] = [
  { id: 1, image: "/nail1.jpg", title: translations.uk.luxuryFrenchManicure, category: "classic" },
  { id: 2, image: "/nail2.jpg", title: translations.uk.gelExtensionArt, category: "extensions" },
  { id: 3, image: "/nail3.jpg", title: translations.uk.abstractNailDesign, category: "artistic" },
  { id: 4, image: "/nail4.jpg", title: translations.uk.crystalEmbellishments, category: "luxury" },
  { id: 5, image: "/top.jpg", title: translations.uk.gradientOmbre, category: "color" },
  { id: 6, image: "/top1.jpg", title: translations.uk.seasonalCollection, category: "seasonal" },
  { id: 7, image: "/top2.jpg", title: translations.uk.minimalDesign, category: "simple" },
  { id: 8, image: "/top3.jpg", title: translations.uk.floralArt, category: "artistic" },
];

const categories = [
  { key: "all", label: translations.uk.all },
  { key: "classic", label: translations.uk.classic },
  { key: "extensions", label: translations.uk.extensions },
  { key: "artistic", label: translations.uk.artistic },
  { key: "luxury", label: translations.uk.luxury },
  { key: "color", label: translations.uk.color },
  { key: "seasonal", label: translations.uk.seasonal },
  { key: "simple", label: translations.uk.simple }
];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filteredGallery = selectedCategory === "all" 
    ? galleryData 
    : galleryData.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#fdfaf5] py-16 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1c0038] mb-2">{translations.uk.galleryTitle}</h1>
        <p className="text-[#CC66DA] text-lg md:text-xl max-w-2xl mx-auto">
          {translations.uk.galleryDescription}
        </p>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === cat.key
                ? "bg-[#9929EA] text-white"
                : "bg-[#faeb92]/30 text-[#1c0038] hover:bg-[#CC66DA]/30"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGallery.map(item => (
          <div
            key={item.id}
            className="relative cursor-pointer overflow-hidden rounded-2xl shadow-lg group"
            onClick={() => setActiveImage(item)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <h3 className="text-white font-semibold text-lg">{item.title}</h3>
              <p className="text-white/70 text-sm">
                {categories.find(cat => cat.key === item.category)?.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {activeImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full">
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 transition"
              onClick={() => setActiveImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeImage.image}
              alt={activeImage.title}
              className="w-full h-auto rounded-2xl"
            />
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold">{activeImage.title}</h3>
              <p className="text-sm mt-1">
                {categories.find(cat => cat.key === activeImage.category)?.label}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;