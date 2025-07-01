
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";

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
    <Card className="bg-white/5 backdrop-blur-sm border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={girlfriend.avatar_url} 
          alt={girlfriend.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-semibold">{girlfriend.name}</h3>
          <p className="text-pink-300">{girlfriend.age} years old</p>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-purple-300 text-sm capitalize">
              {girlfriend.personality_traits.mood}
            </span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {girlfriend.personality_traits.traits.map((trait, index) => (
              <span 
                key={index}
                className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 px-3 py-1 rounded-full text-sm border border-pink-500/20"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {showActions && (
          <div className="flex gap-3">
            <Button 
              onClick={() => onSelect?.(girlfriend)}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Now
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white"
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIGirlfriendCard;
