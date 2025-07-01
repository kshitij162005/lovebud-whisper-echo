
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Star, Crown, Sparkles } from "lucide-react";

interface AIGirlfriend {
  id: string;
  name: string;
  age: number;
  avatar_url: string;
  personality_traits: {
    traits: string[];
    mood: string;
  };
}

interface AIGirlfriendCardProps {
  girlfriend: AIGirlfriend;
  onSelect?: (girlfriend: AIGirlfriend) => void;
  showActions?: boolean;
}

const AIGirlfriendCard = ({ girlfriend, onSelect, showActions = true }: AIGirlfriendCardProps) => {
  return (
    <Card className="glass-card border-pink-500/30 hover:border-pink-400/60 transition-all duration-500 overflow-hidden group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative">
        <div className="relative overflow-hidden">
          <img 
            src={girlfriend.avatar_url} 
            alt={girlfriend.name}
            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Floating elements */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center space-x-2 glass-card px-3 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
              <span className="text-green-400 text-sm font-semibold">Online</span>
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <div className="glass-card px-4 py-2">
              <span className="text-purple-300 text-sm font-semibold capitalize flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                {girlfriend.personality_traits.mood}
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 left-4 right-4">
            <h3 className="text-3xl font-bold text-white mb-2 neon-text">{girlfriend.name}</h3>
            <div className="flex items-center justify-between">
              <p className="text-pink-300 text-lg font-semibold">{girlfriend.age} years old</p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6 relative z-10">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {girlfriend.personality_traits.traits.map((trait, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 text-pink-300 px-4 py-2 rounded-full text-sm border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 font-semibold"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {showActions && (
          <div className="flex gap-4">
            <Button 
              onClick={() => onSelect?.(girlfriend)}
              className="glow-button flex-1 text-white font-bold py-3 hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat Now 💕
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black hover:scale-110 transition-all duration-300 p-3"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIGirlfriendCard;
