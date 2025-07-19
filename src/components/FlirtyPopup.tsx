
import { useState, useEffect } from "react";
import { X, Heart } from "lucide-react";

interface FlirtyMessage {
  id: number;
  name: string;
  message: string;
  avatar: string;
  mood: string;
}

const flirtyMessages: FlirtyMessage[] = [
  {
    id: 1,
    name: "Aria",
    message: "Hey there, care to chat? 😘",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    mood: "playful"
  },
  {
    id: 2,
    name: "Jade",
    message: "I've been waiting for someone like you ❤️",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    mood: "romantic"
  },
  {
    id: 3,
    name: "Luna",
    message: "Want to get to know each other? 💫",
    avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    mood: "curious"
  }
];

const FlirtyPopup = ({ onSignUp }: { onSignUp: () => void }) => {
  const [currentPopup, setCurrentPopup] = useState<FlirtyMessage | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);

  useEffect(() => {
    const showRandomPopup = () => {
      const randomMessage = flirtyMessages[popupIndex % flirtyMessages.length];
      setCurrentPopup(randomMessage);
      setShowPopup(true);
      setPopupIndex(prev => prev + 1);
      
      setTimeout(() => {
        setShowPopup(false);
      }, 4000);
    };

    const interval = setInterval(showRandomPopup, 12000);
    
    // Show first popup after 5 seconds
    setTimeout(showRandomPopup, 5000);

    return () => clearInterval(interval);
  }, [popupIndex]);

  if (!showPopup || !currentPopup) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 elegant-modal p-4 rounded-xl max-w-sm smooth-bounce">
      <div className="flex items-start space-x-3">
        <img 
          src={currentPopup.avatar} 
          alt={currentPopup.name}
          className="w-12 h-12 rounded-full object-cover sophisticated-border"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-blue-400 font-semibold text-sm elegant-text">{currentPopup.name}</h4>
            <button 
              onClick={() => setShowPopup(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-white text-sm mb-3 leading-relaxed">{currentPopup.message}</p>
          <button 
            onClick={onSignUp}
            className="w-full luxury-button text-white font-semibold py-2 px-4 text-xs hover:scale-105 transition-all duration-300"
          >
            <Heart className="w-3 h-3 mr-1 inline" />
            Start Chatting
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlirtyPopup;
