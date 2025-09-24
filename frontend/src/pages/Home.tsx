import { useEffect, useState } from "react";
import BookNowSection from "./BookingCTA";
import OwnerSection from "./OwnerSection";
import ServicesCarousel from "./ServicesCarousel";
import Testimonials from "./Testimonials";
import TimeSlots from "./TimeSlots";
import GalleryCarousel from "./GalleryCarousel ";

const Home = () => {
  const [loginResponseMessage, setLoginResponseMessage] = useState<string>("");

  useEffect(() => {
    // Check if already exists in localStorage for user
    let storedId = localStorage.getItem("userId");

    if (!storedId) {
      // Generate new random ID if not found
      storedId = "user-" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("userId", storedId);
    }
    

    // Check if admin is logged in via sessionStorage
    const storedMessage = sessionStorage.getItem("loginResponseMessage");
    if (storedMessage) {
      setLoginResponseMessage(storedMessage);
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <OwnerSection loginResponseMessage={loginResponseMessage} />
      <GalleryCarousel />
      <ServicesCarousel />
      <Testimonials />
      <TimeSlots />
      <BookNowSection bookingPageUrl="/book" backgroundImage="/nail2.jpg" />

 
    </section>
  );
};

export default Home;
