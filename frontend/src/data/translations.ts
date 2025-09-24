export const translations = {
    en: {
      // Booking Page
      bookYourAppointment: "Book Your Appointment",
      selectServicesDescription: "Select your services, choose a time, and let us create something beautiful for you",
      services: "Services",
      details: "Details",
      confirm: "Confirm",
      selectedServices: "Selected Services",
      noServicesSelected: "No services selected yet",
      total: "Total",
      appointmentDetails: "Appointment Details",
      yourFullName: "Your Full Name",
      contactNumber: "Contact Number",
      emailAddress: "Email Address (optional)",
      selectTime: "Select Time",
      confirmBooking: "Confirm Booking",
      variablePricing: "Variable pricing",
      
      // Service Categories (you can add more as needed)
      haircut: "Haircut",
      coloring: "Coloring",
      styling: "Styling",
      treatment: "Treatment",
      
      // Form Labels
      name: "Name",
      contact: "Contact",
      email: "Email",
      date: "Date",
      time: "Time"
    },
    uk: {
      // Booking Page
      bookYourAppointment: "Забронювати Запис",
      selectServicesDescription: "Оберіть послуги, виберіть час і дозвольте нам створити щось прекрасне для вас",
      services: "Послуги",
      details: "Деталі",
      confirm: "Підтвердити",
      selectedServices: "Обрані Послуги",
      noServicesSelected: "Ще не обрано жодної послуги",
      total: "Всього",
      appointmentDetails: "Деталі Запису",
      yourFullName: "Ваше Повне Ім'я",
      contactNumber: "Контактний Номер",
      emailAddress: "Електронна пошта (необов'язково)",
      selectTime: "Оберіть Час",
      confirmBooking: "Підтвердити Бронювання",
      variablePricing: "Змінна ціна",
      
      // Service Categories
      haircut: "Стрижка",
      coloring: "Фарбування",
      styling: "Укладка",
      treatment: "Догляд",
      
      // Form Labels
      name: "Ім'я",
      contact: "Контакт",
      email: "Емейл",
      date: "Дата",
      time: "Час"
    }
  };
  
  export type Language = 'en' | 'uk';
  export type TranslationKey = keyof typeof translations.en;