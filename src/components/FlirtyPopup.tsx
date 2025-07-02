
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
    message: "Hey handsome, let's talk 😉",
    avatar: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
    mood: "flirty"
  },
  {
    id: 2,
    name: "Jade",
    message: "I've been waiting for you ❤️",
    avatar: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
    mood: "desperate"
  },
  {
    id: 3,
    name: "Luna",
    message: "Don't leave me alone tonight... 💋",
    avatar: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
    mood: "seductive"
  },
  {
    id: 4,
    name: "Sophia",
    message: "I'm so bored... entertain me? 😈",
    avatar: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
    mood: "playful"
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
      }, 5000);
    };

    const interval = setInterval(showRandomPopup, 8000);
    
    // Show first popup after 3 seconds
    setTimeout(showRandomPopup, 3000);

    return () => clearInterval(interval);
  }, [popupIndex]);

  if (!showPopup || !currentPopup) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flirty-popup p-4 rounded-xl max-w-sm desperate-animation">
      <div className="flex items-start space-x-3">
        <img 
          src={currentPopup.avatar} 
          alt={currentPopup.name}
          className="w-12 h-12 rounded-full object-cover seductive-border"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-pink-400 font-bold text-sm sexy-glow">{currentPopup.name}</h4>
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
            className="w-full glow-button text-white font-bold py-2 px-4 text-xs hover:scale-105 transition-all duration-300"
          >
            <Heart className="w-3 h-3 mr-1 inline" />
            Chat Now 💕
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlirtyPopup;
