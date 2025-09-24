import React, { useState } from 'react';
import { servicesData } from '../data/servicesData';
import { Star, Scissors, Sparkles, Heart, X, Clock, Users, Shield, Award } from 'lucide-react';

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any | null>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const serviceIcons = [Sparkles, Heart, Scissors, Star, Clock, Users, Shield, Award];
  
  const getRandomIcon = (index: number) => {
    return serviceIcons[index % serviceIcons.length];
  };

  const openServiceModal = (service: any, category: any) => {
    setSelectedService({ ...service, category: category.title });
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  const toggleCategory = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-gradient-to-b from-[#e7e4ff] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1c0038] mb-4">
            Our Services
          </h2>
          <p className="text-xl text-[#CC66DA] max-w-3xl mx-auto">
            Premium nail care services crafted with precision and luxury in mind
          </p>
        </div>

        {/* Services Grid - Enhanced Layout */}
        <div className="space-y-8">
          {servicesData.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="relative bg-white rounded-3xl shadow-xl border-2 border-[#e7e4ff] overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={categoryIndex * 100}
            >
              {/* Category Header - Clickable */}
              <div 
                className="bg-gradient-to-r from-[var(--secondary-color)] to-[var(--accent-color)] p-6 cursor-pointer"
                onClick={() => toggleCategory(categoryIndex)}
              >
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--primary-color)] mb-2">
                      {category.title}
                    </h3>
                   </div>
                  <div className={`transform transition-transform duration-300 ${
                    activeCategory === categoryIndex ? 'rotate-180' : ''
                  }`}>
                    <svg className="w-6 h-6 text-[#9929EA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Services List - Animated Expand/Collapse */}
              <div className={`transition-all duration-500 overflow-hidden ${
                activeCategory === categoryIndex ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.services.map((service, serviceIndex) => {
                      const IconComponent = getRandomIcon(serviceIndex);
                      return (
                        <div
                          key={serviceIndex}
                          onClick={() => openServiceModal(service, category)}
                          className="group relative bg-gradient-to-br from-white to-[#faf7ff] rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-[#faeb92]/30 hover:border-[#CC66DA] cursor-pointer"
                          data-aos="zoom-in"
                          data-aos-delay={serviceIndex * 50}
                        >
                          {/* Icon and Price Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-gradient-to-r from-[#9929EA] to-[#CC66DA] rounded-xl">
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className={`px-4 py-2 rounded-full text-white font-bold text-sm ${
                              service.variablePrice 
                                ? 'bg-gradient-to-r from-[#CC66DA] to-[#9929EA]' 
                                : 'bg-gradient-to-r from-[#9929EA] to-[#CC66DA]'
                            }`}>
                              {service.price}
                            </div>
                          </div>

                          {/* Service Content */}
                          <div className="mb-4">
                            <h4 className="font-bold text-[#1c0038] text-lg mb-2 leading-tight">
                              {service.name}
                            </h4>
                         
                          </div>

                          {/* Details Preview */}
                          {service.details && (
                            <div className="pt-3 border-t border-gray-100">
                              {service.details.slice(0, 2).map((detail, idx) => (
                                <p key={idx} className="text-xs text-gray-500 mb-1 flex items-center">
                                  <span className="w-1 h-1 bg-[#CC66DA] rounded-full mr-2"></span>
                                  {detail.length > 60 ? `${detail.substring(0, 60)}...` : detail}
                                </p>
                              ))}
                              {service.details.length > 2 && (
                                <p className="text-xs text-[#9929EA] font-medium mt-2">
                                  +{service.details.length - 2} more details
                                </p>
                              )}
                            </div>
                          )}

                          {/* Hover Effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#9929EA]/5 to-[#faeb92]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Click Hint */}
                          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-[#9929EA] text-white text-xs px-2 py-1 rounded-full">
                              Click for details
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--accent-color)] rounded-3xl shadow-lg border-2 border-[#faeb92]/50">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <div className="flex items-center gap-2 text-[#1c0038]">
              <Clock className="w-5 h-5 text-[var(--primary-color)]" />
              <span className="font-semibold">30-90 min sessions</span>
            </div>
            <div className="flex items-center gap-2 text-[#1c0038]">
              <Shield className="w-5 h-5 text-[var(--primary-color)]" />
              <span className="font-semibold">Quality guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-[#1c0038]">
              <Award className="w-5 h-5 text-[var(--primary-color)]" />
              <span className="font-semibold">Professional materials</span>
            </div>
          </div>
          <p className="text-[#1c0038] text-lg font-medium">
          b<span className="text-[var(--primary-color)] font-bold">All services include</span> professional consultation, 
            premium materials, and lasting results that exceed expectations
          </p>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 px-4 py-8">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeServiceModal}
              className="absolute top-6 right-6 text-gray-500 hover:text-[#9929EA] transition-colors duration-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Service Image/Icon Section */}
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-r from-[#9929EA] to-[#CC66DA] rounded-2xl flex items-center justify-center mb-4">
                  {selectedService.name.includes('Манікюр') || selectedService.name.includes('Manicure') ? (
                    <Scissors className="w-10 h-10 text-white" />
                  ) : selectedService.name.includes('Педікюр') || selectedService.name.includes('Pedicure') ? (
                    <Sparkles className="w-10 h-10 text-white" />
                  ) : (
                    <Star className="w-10 h-10 text-white" />
                  )}
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-[#9929EA] to-[#CC66DA] text-white px-4 py-2 rounded-full font-bold text-lg">
                    {selectedService.price}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Approximate duration</p>
                </div>
              </div>

              {/* Service Details */}
              <div className="flex-1">
                <div className="mb-2">
                  <span className="text-[#CC66DA] font-medium text-sm bg-[#e7e4ff] px-3 py-1 rounded-full">
                    {selectedService.category}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-[#1c0038] mb-3">
                  {selectedService.name}
                </h3>
 
                {/* Service Features */}
                <div className="grid gap-3 mb-6">
                  <div className="flex items-center gap-3 text-[var(--primary-color)]">
                    <Clock className="w-5 h-5 text-[#9929EA]" />
                    <span className="font-medium">Duration: 30-60 minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--primary-color)]">
                    <Users className="w-5 h-5 text-[#9929EA]" />
                    <span className="font-medium">Professional consultation included</span>
                  </div>
                  <div className="flex items-center gap-3 text-[var(--primary-color)]">
                    <Shield className="w-5 h-5 text-[#9929EA]" />
                    <span className="font-medium">Quality materials guaranteed</span>
                  </div>
                </div>

                {/* Detailed Description */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-bold text-[#1c0038] mb-3">Service Includes:</h4>
                  <div className="space-y-2">
                    {selectedService.details ? (
                      selectedService.details.map((detail: string, idx: number) => (
                        <p key={idx} className="text-gray-700 flex items-start gap-2">
                          <span className="w-2 h-2 bg-[#CC66DA] rounded-full mt-2 flex-shrink-0"></span>
                          {detail}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-700">
                        This premium service includes professional consultation, quality materials, 
                        and expert execution to ensure your complete satisfaction and beautiful results.
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-6 bg-gradient-to-r from-[var(--secondary-color)] to-[var(--accent-color)] text-white py-3 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;