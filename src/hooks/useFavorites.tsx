
import { useState, useEffect } from 'react';

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
}

export const useFavorites = (userId: string) => {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem(`favorites_${userId}`);
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, [userId]);

  const toggleFavorite = (girlfriendId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(girlfriendId)) {
      newFavorites.delete(girlfriendId);
    } else {
      newFavorites.add(girlfriendId);
    }
    setFavorites(newFavorites);
    
    // Save to localStorage
    localStorage.setItem(`favorites_${userId}`, JSON.stringify([...newFavorites]));
  };

  const isFavorite = (girlfriendId: string) => favorites.has(girlfriendId);

  return { favorites, toggleFavorite, isFavorite };
};
