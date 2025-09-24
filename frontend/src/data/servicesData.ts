export interface Service {
    name: string;
    nameEn: string;
    price: string;
    details?: string[];
    variablePrice?: boolean;
  }
  
  export interface ServiceCategory {
    title: string;
    titleEn: string;
    services: Service[];
  }
  
  export const servicesData: ServiceCategory[] = [
    {
      title: "КОМПЛЕКС: МАНІКЮР",
      titleEn: "MANICURE COMPLEX",
      services: [
        {
          name: "Покриття кольоровою базою/гель-лак",
          nameEn: "Color base/gel polish coverage",
          price: "650₴"
        },
        {
          name: "Укріплення (реставрація квадрату/підняття кутків нігтів) + гель-лак",
          nameEn: "Strengthening - square restoration/nail corner lifting + gel polish",
          price: "800₴"
        },
        {
          name: "Нарощення нігтів",
          nameEn: "Nail extensions",
          price: "1200-1400₴",
          variablePrice: true,
          details: ["Ціна залежить від довжини нарощення", "Price depends on extension length"]
        },
        {
          name: "Корекція нарощення",
          nameEn: "Extension correction",
          price: "850-1200₴",
          variablePrice: true,
          details: ["Ціна залежить від довжини", "Price depends on length"]
        },
        {
          name: "Гігієнічний манікюр",
          nameEn: "Hygienic manicure",
          price: "500₴"
        }
      ]
    },
    {
      title: "КОМПЛЕКС: ПЕДИКЮР",
      titleEn: "PEDICURE COMPLEX",
      services: [
        {
          name: "Покриття гель-лак + апаратна обробка стопи",
          nameEn: "Gel polish coverage + hardware foot treatment",
          price: "750₴"
        },
        {
          name: "Гігієнічний педикюр",
          nameEn: "Hygienic pedicure",
          price: "550₴"
        }
      ]
    },
    {
      title: "ДОДАТКОВІ ПОСЛУГИ",
      titleEn: "ADDITIONAL SERVICES",
      services: [
        {
          name: "Ремонт нігтя",
          nameEn: "Nail repair",
          price: "20-60₴"
        },
        {
          name: "Дизайн - Слайдери/стемпінг/абстракція/текстури/камінці",
          nameEn: "Design - Sliders/stamping/abstraction/textures/stones",
          price: "до 100₴"
        },
        {
          name: "Складні дизайни з використанням різних технік (фігурки/пірсинг)",
          nameEn: "Complex designs using various techniques - figurines/piercing",
          price: "до 150₴/10-15₴шт"
        },
        {
          name: "Френч",
          nameEn: "French manicure",
          price: "100₴"
        }
      ]
    }
  ];