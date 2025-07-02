
import { useState } from "react";
import { X, Heart, MessageCircle, Star, Sparkles } from "lucide-react";

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
  if (!isOpen || !girlfriend) return null;

  const handleFavorite = () => {
    onFavorite(girlfriend);
  };

  return (
    <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sharp-card p-8 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative">
              <img
                src={girlfriend.avatar_url}
                alt={girlfriend.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4">
                <div className="flex items-center space-x-2 glass-card px-3 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
                  <span className="text-green-400 text-sm font-semibold">Online</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleFavorite}
                  className={`favorite-heart p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all ${
                    isFavorite ? 'active' : ''
                  }`}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold neon-text mb-2">{girlfriend.name}</h2>
                <p className="text-xl text-blue-300">{girlfriend.age} years old • {girlfriend.ethnicity}</p>
                <div className="flex items-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                  <span className="ml-2 text-gray-300">Perfect Match</span>
                </div>
              </div>

              {/* Personality Traits */}
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Personality
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {girlfriend.personality_traits.traits.map((trait, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/30 font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                <p className="text-yellow-300 font-semibold capitalize">Current Mood: {girlfriend.personality_traits.mood}</p>
              </div>

              {/* Physical Attributes */}
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-3">Appearance</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Body Type:</span>
                    <span className="ml-2 text-white">{girlfriend.body_type}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Hair:</span>
                    <span className="ml-2 text-white">{girlfriend.hair_color} {girlfriend.hair_style}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-pink-400 mb-3">About Me</h3>
                <p className="text-gray-300 leading-relaxed">
                  {girlfriend.description || `Hi there! I'm ${girlfriend.name}, and I love connecting with people who appreciate genuine conversations. My ${girlfriend.personality_traits.traits.join(', ')} nature means we'll have amazing chemistry together. I'm currently feeling ${girlfriend.personality_traits.mood} and ready for some exciting chats! 💕`}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => onSelect(girlfriend)}
                  className="glow-button flex-1 text-white font-bold py-4 px-6 text-lg hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5 mr-2 inline" />
                  Start Chatting 💕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GirlfriendModal;
