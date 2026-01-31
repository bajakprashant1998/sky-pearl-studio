import { FaWhatsapp } from "react-icons/fa";
const WhatsAppButton = () => {
  const phoneNumber = "919824011921"; // User provided number
  const message = "Hello Digital Bull, I'm interested in your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  return <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:bg-[#20bd5a] transition-all duration-300 transform hover:scale-110 group animate-fade-in flex-col flex items-center justify-center opacity-100" aria-label="Chat on WhatsApp">
            <FaWhatsapp className="w-8 h-8" />
            <span className="absolute right-full mr-3 bg-white text-slate-800 px-3 py-1 rounded-lg text-sm font-medium shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                Chat with us
            </span>
        </a>;
};
export default WhatsAppButton;