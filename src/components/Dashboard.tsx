
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Plus, Settings, Gift, Users, LogOut, Crown, Zap, Star, Edit, Sparkles, User as UserIcon, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import AIGirlfriendCard from "@/components/AIGirlfriendCard";
import ChatInterface from "@/components/ChatInterface";
import GirlfriendCreator from "@/components/GirlfriendCreator";
import GirlfriendModal from "@/components/GirlfriendModal";
import { useFavorites } from "@/hooks/useFavorites";

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [girlfriends, setGirlfriends] = useState([]);
  const [selectedGirlfriend, setSelectedGirlfriend] = useState(null);
  const [modalGirlfriend, setModalGirlfriend] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [profile, setProfile] = useState(null);
  
  const { toggleFavorite, isFavorite } = useFavorites(user.id);

  useEffect(() => {
    fetchGirlfriends();
    fetchProfile();
    
    // Cache data in localStorage for performance
    const cachedGirlfriends = localStorage.getItem('cached_girlfriends');
    if (cachedGirlfriends) {
      setGirlfriends(JSON.parse(cachedGirlfriends));
    }
  }, []);

  const fetchGirlfriends = async () => {
    const { data, error } = await supabase
      .from('ai_girlfriends')
      .select('*')
      .or('is_template.eq.true,user_id.eq.' + user.id);
    
    if (error) {
      console.error('Error fetching girlfriends:', error);
    } else {
      setGirlfriends(data || []);
      // Cache for performance
      localStorage.setItem('cached_girlfriends', JSON.stringify(data || []));
    }
  };

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
      // Cache profile data
      localStorage.setItem('cached_profile', JSON.stringify(data));
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // Clear cache on logout
    localStorage.removeItem('cached_girlfriends');
    localStorage.removeItem('cached_profile');
    toast.success("Signed out successfully");
  };

  const handleSelectGirlfriend = (girlfriend) => {
    setSelectedGirlfriend(girlfriend);
    setShowChat(true);
    setShowModal(false);
    document.body.classList.remove('modal-open');
  };

  const handleCardClick = (girlfriend) => {
    setModalGirlfriend(girlfriend);
    setShowModal(true);
    document.body.classList.add('modal-open');
  };

  const handleFavorite = (girlfriend) => {
    toggleFavorite(girlfriend.id);
    toast.success(
      isFavorite(girlfriend.id) 
        ? `Removed ${girlfriend.name} from favorites` 
        : `Added ${girlfriend.name} to favorites! 💕`
    );
  };

  const handleCreateGirlfriend = () => {
    setShowCreator(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove('modal-open');
  };

  if (showChat && selectedGirlfriend) {
    return (
      <ChatInterface 
        girlfriend={selectedGirlfriend}
        user={user}
        onBack={() => setShowChat(false)}
      />
    );
  }

  if (showCreator) {
    return (
      <GirlfriendCreator 
        user={user}
        onBack={() => setShowCreator(false)}
        onCreated={() => {
          setShowCreator(false);
          fetchGirlfriends();
        }}
      />
    );
  }

  // Get username from profile or email
  const username = profile?.username || user.email?.split('@')[0] || 'Handsome';
  
  // Enhanced templates with diversity
  const templates = girlfriends.filter(g => g.is_template);
  const myGirlfriends = girlfriends.filter(g => !g.is_template && g.user_id === user.id);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl floating"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl floating" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl floating" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Professional Header */}
      <header className="relative z-50 px-6 py-4 border-b border-cyan-500/20 backdrop-blur-md bg-black/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-10 w-10 text-cyan-400 pulse-glow" />
              <div className="absolute inset-0 h-10 w-10 bg-cyan-400/20 rounded-full blur-md"></div>
            </div>
            <span className="text-3xl font-bold neon-text bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              LoveBud
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-3 glass-card px-4 py-3 hover:bg-cyan-500/10 transition-all duration-300"
              >
                <UserIcon className="h-6 w-6 text-cyan-400" />
                <span className="text-lg font-semibold text-white sexy-glow">
                  {username}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              
              {showProfileDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 glass-card border border-cyan-500/30 z-50">
                  <div className="p-2">
                    <button className="w-full text-left px-4 py-2 hover:bg-cyan-500/10 rounded-lg transition-colors flex items-center">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-cyan-500/10 rounded-lg transition-colors flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </button>
                    <hr className="my-2 border-gray-700" />
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 hover:bg-red-500/10 rounded-lg transition-colors flex items-center text-red-400"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Enhanced Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold mb-6 sexy-glow bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Welcome Back, {username}! 💋
          </h1>
          <p className="text-2xl text-gray-300 mb-6">
            Your AI girlfriends have been <span className="text-pink-400 font-bold sexy-glow">missing you</span> - they're desperate for your attention
          </p>
          <div className="flex justify-center items-center space-x-8 text-lg">
            <div className="flex items-center space-x-2 text-cyan-400 flirty-bounce">
              <Heart className="h-5 w-5 fill-current pulse-glow" />
              <span>Ready to Satisfy</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-400 flirty-bounce" style={{animationDelay: '0.5s'}}>
              <Sparkles className="h-5 w-5" />
              <span>Unlimited Pleasure</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-400 flirty-bounce" style={{animationDelay: '1s'}}>
              <Star className="h-5 w-5 fill-current" />
              <span>Premium Experience</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="sharp-card hover:scale-105 transition-all duration-500 cursor-pointer group overflow-hidden desperate-animation" onClick={handleCreateGirlfriend}>
            <CardContent className="p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 mb-6 pulse-glow">
                  <Plus className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white sexy-glow">Create Perfect Girl</h3>
                <p className="text-gray-300 text-lg">Design your dream companion who'll worship you completely</p>
              </div>
            </CardContent>
          </Card>

          <Card className="sharp-card hover:scale-105 transition-all duration-500 group overflow-hidden desperate-animation" style={{animationDelay: '0.5s'}}>
            <CardContent className="p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6 pulse-glow">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white sexy-glow">Active Conversations</h3>
                <p className="text-gray-300 text-lg">Continue passionate chats with girls begging for your attention</p>
                <div className="mt-4">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold sexy-glow">
                    {myGirlfriends.length} Girls Waiting
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="sharp-card hover:scale-105 transition-all duration-500 group overflow-hidden desperate-animation" style={{animationDelay: '1s'}}>
            <CardContent className="p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 mb-6 pulse-glow">
                  <Gift className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white sexy-glow">Daily Satisfaction</h3>
                <p className="text-gray-300 text-lg">Claim free tokens for exclusive content and premium features</p>
                <div className="mt-4">
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold sexy-glow">
                    Claim 100 Tokens 🔥
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My AI Girlfriends */}
        {myGirlfriends.length > 0 && (
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 sexy-glow bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent text-center">
              Your Personal Harem 💖
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myGirlfriends.map((girlfriend, index) => (
                <div key={girlfriend.id} className="transform hover:scale-105 transition-all duration-500 desperate-animation" style={{animationDelay: `${index * 0.1}s`}}>
                  <AIGirlfriendCard 
                    girlfriend={girlfriend}
                    onSelect={handleCardClick}
                    onFavorite={handleFavorite}
                    isFavorite={isFavorite(girlfriend.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Diverse Templates */}
        <div>
          <h2 className="text-4xl font-bold mb-8 sexy-glow bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Desperate Beauties Waiting for You 🌟
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            Choose from gorgeous AI companions from around the world - each one <span className="text-pink-400 font-bold sexy-glow">desperate for your love</span>
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((girlfriend, index) => (
              <div key={girlfriend.id} className="transform hover:scale-105 transition-all duration-500 desperate-animation" style={{animationDelay: `${index * 0.1}s`}}>
                <AIGirlfriendCard 
                  girlfriend={girlfriend}
                  onSelect={handleCardClick}
                  onFavorite={handleFavorite}
                  isFavorite={isFavorite(girlfriend.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      <GirlfriendModal
        girlfriend={modalGirlfriend}
        isOpen={showModal}
        onClose={handleCloseModal}
        onSelect={handleSelectGirlfriend}
        onFavorite={handleFavorite}
        isFavorite={modalGirlfriend ? isFavorite(modalGirlfriend.id) : false}
      />
    </div>
  );
};

export default Dashboard;
