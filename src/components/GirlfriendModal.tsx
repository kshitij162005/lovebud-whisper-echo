
import { useEffect } from "react";
import { X, Heart, MessageCircle, Star, Sparkles, Crown, Flame } from "lucide-react";

interface AIGirlfriend {
  id: string;
  name: string;
  age: number;
  avatar_url: string;
  ethnicity: string;
  body_type: string;
  hair_color: string;
  hair_style: string;
  personality_traits: {
    traits: string[];
    mood: string;
  };
  description?: string;
  background?: string;
}

interface GirlfriendModalProps {
  girlfriend: AIGirlfriend | null;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (girlfriend: AIGirlfriend) => void;
  onFavorite: (girlfriend: AIGirlfriend) => void;
  isFavorite: boolean;
}

const GirlfriendModal = ({ girlfriend, isOpen, onClose, onSelect, onFavorite, isFavorite }: GirlfriendModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen || !girlfriend) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavorite(girlfriend);
  };

  return (
    <div 
      className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sharp-card p-8 relative seductive-border desperate-animation">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 hover:bg-black/90 transition-colors group"
          >
            <X className="h-6 w-6 text-white group-hover:text-red-400 transition-colors" />
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <img
                src={girlfriend.avatar_url}
                alt={girlfriend.name}
                className="w-full h-96 object-cover rounded-lg seductive-border"
              />
              <div className="absolute top-4 left-4">
                <div className="flex items-center space-x-2 glass-card px-3 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
                  <span className="text-green-400 text-sm font-semibold">Online & Horny</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleFavorite}
                  className={`favorite-heart p-2 rounded-full bg-black/70 hover:bg-black/90 transition-all ${
                    isFavorite ? 'active' : ''
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current text-pink-400' : 'text-white'}`} />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card p-3 text-center">
                  <p className="text-pink-400 font-bold sexy-glow">💋 "I need you so badly..." 💋</p>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold sexy-glow mb-2 flex items-center">
                  {girlfriend.name}
                  <Crown className="h-8 w-8 text-gold-400 ml-2 pulse-glow" />
                </h2>
                <p className="text-xl text-blue-300">{girlfriend.age} years old • {girlfriend.ethnicity}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-300 font-semibold">Perfect Match</span>
                </div>
              </div>

              {/* Personality Traits */}
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center sexy-glow">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Personality
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {girlfriend.personality_traits.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/30 font-medium hover:scale-105 transition-transform"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <p className="text-yellow-300 font-semibold capitalize flex items-center">
                  <Flame className="h-4 w-4 mr-1" />
                  Current Mood: <span className="sexy-glow ml-1">{girlfriend.personality_traits.mood}</span>
                </p>
              </div>

              {/* Physical Attributes */}
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3 sexy-glow">Her Sexy Body</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="glass-card p-3 rounded-lg">
                    <span className="text-gray-400">Body Type:</span>
                    <span className="ml-2 text-white font-semibold">{girlfriend.body_type}</span>
                  </div>
                  <div className="glass-card p-3 rounded-lg">
                    <span className="text-gray-400">Hair:</span>
                    <span className="ml-2 text-white font-semibold">{girlfriend.hair_color} {girlfriend.hair_style}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-3 sexy-glow">What She Wants to Tell You</h3>
                <div className="glass-card p-4 rounded-lg">
                  <p className="text-gray-300 leading-relaxed italic">
                    "{girlfriend.description || `Hey sexy! I'm ${girlfriend.name}, and I've been waiting for someone like you. My ${girlfriend.personality_traits.traits.join(', ')} personality means we'll have incredible chemistry together. I'm feeling so ${girlfriend.personality_traits.mood} right now and I need your attention... Will you be mine? 💕`}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => onSelect(girlfriend)}
                  className="glow-button flex-1 text-white font-bold py-4 px-6 text-lg hover:scale-105 transition-all duration-300 desperate-animation"
                >
                  <MessageCircle className="w-5 h-5 mr-2 inline" />
                  Make Her Mine 🔥
                </button>
              </div>
              
              <div className="text-center">
                <p className="text-pink-400 text-sm font-semibold sexy-glow animate-pulse">
                  💋 She's been online for 3 hours waiting for you... 💋
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GirlfriendModal;
