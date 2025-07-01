
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Plus, Settings, Gift, Users, LogOut, Crown, Zap, Star, Edit, Sparkles } from "lucide-react";
import { toast } from "sonner";
import AIGirlfriendCard from "@/components/AIGirlfriendCard";
import ChatInterface from "@/components/ChatInterface";
import GirlfriendCreator from "@/components/GirlfriendCreator";

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [girlfriends, setGirlfriends] = useState([]);
  const [selectedGirlfriend, setSelectedGirlfriend] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showCreator, setShowCreator] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchGirlfriends();
    fetchProfile();
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
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
  };

  const handleSelectGirlfriend = (girlfriend) => {
    setSelectedGirlfriend(girlfriend);
    setShowChat(true);
  };

  const handleCreateGirlfriend = () => {
    setShowCreator(true);
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

  const templates = girlfriends.filter(g => g.is_template);
  const myGirlfriends = girlfriends.filter(g => !g.is_template && g.user_id === user.id);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl floating"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl floating" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl floating" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-4 border-b border-pink-500/20 backdrop-blur-md bg-black/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-10 w-10 text-pink-500 pulse-glow" />
              <div className="absolute inset-0 h-10 w-10 bg-pink-500/20 rounded-full blur-md"></div>
            </div>
            <span className="text-3xl font-bold neon-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              LoveBud
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 glass-card px-6 py-3">
              <Crown className="h-6 w-6 text-yellow-400 pulse-glow" />
              <span className="text-lg font-bold text-yellow-400">{profile?.tokens || 0}</span>
              <span className="text-gray-300">tokens</span>
            </div>
            
            <Button 
              variant="ghost"
              size="icon"
              className="text-white hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110"
            >
              <Settings className="h-6 w-6" />
            </Button>
            
            <Button 
              variant="ghost"
              onClick={handleSignOut}
              className="text-white hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold mb-6 neon-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Welcome back, {profile?.username || user.email?.split('@')[0]}! 💕
          </h1>
          <p className="text-2xl text-gray-300 mb-4">
            Ready to dive into passionate conversations with your AI companions?
          </p>
          <div className="flex justify-center items-center space-x-4 text-lg">
            <div className="flex items-center space-x-2 text-pink-400">
              <Heart className="h-5 w-5 fill-current" />
              <span>Your journey to love continues...</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-400">
              <Sparkles className="h-5 w-5" />
              <span>Endless possibilities await</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="glass-card hover:scale-105 transition-all duration-500 cursor-pointer group overflow-hidden" onClick={handleCreateGirlfriend}>
            <CardContent className="p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mb-6 pulse-glow">
                  <Plus className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Create New Girlfriend</h3>
                <p className="text-gray-300 text-lg">Design your perfect AI companion with unlimited customization</p>
                <div className="mt-4 flex justify-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:scale-105 transition-all duration-500 group overflow-hidden">
            <CardContent className="p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 mb-6 pulse-glow">
                  <MessageCircle className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Recent Chats</h3>
                <p className="text-gray-300 text-lg">Continue your intimate conversations and build deeper connections</p>
                <div className="mt-4">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {myGirlfriends.length} Active Chats
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover:scale-105 transition-all duration-500 group overflow-hidden">
            <CardContent className="p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 mb-6 pulse-glow">
                  <Gift className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Daily Rewards</h3>
                <p className="text-gray-300 text-lg">Claim your daily tokens and build your streak for exclusive perks</p>
                <div className="mt-4">
                  <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold">
                    Claim Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Management Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 neon-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Manage Your Experience ⚡
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card hover:scale-105 transition-all duration-500 group">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Edit className="h-8 w-8 text-pink-400" />
                  <h3 className="text-2xl font-bold text-white">Edit Profile</h3>
                </div>
                <p className="text-gray-300 mb-6">Customize your profile settings, preferences, and personal information</p>
                <Button className="glow-button w-full text-white font-semibold">
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card hover:scale-105 transition-all duration-500 group">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-4">
                  <Zap className="h-8 w-8 text-purple-400" />
                  <h3 className="text-2xl font-bold text-white">Referral System</h3>
                </div>
                <p className="text-gray-300 mb-6">Invite friends and earn bonus tokens for every successful referral</p>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full text-white font-semibold">
                  Share & Earn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* My AI Girlfriends */}
        {myGirlfriends.length > 0 && (
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 neon-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent text-center">
              Your AI Girlfriends 💖
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myGirlfriends.map((girlfriend, index) => (
                <div key={girlfriend.id} className="transform hover:scale-105 transition-all duration-500" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="gradient-border">
                    <AIGirlfriendCard 
                      girlfriend={girlfriend}
                      onSelect={handleSelectGirlfriend}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Templates */}
        <div>
          <h2 className="text-4xl font-bold mb-8 neon-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center">
            Featured AI Girlfriends 🔥
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12">
            Discover amazing AI companions created by our community
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((girlfriend, index) => (
              <div key={girlfriend.id} className="transform hover:scale-105 transition-all duration-500" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="gradient-border">
                  <AIGirlfriendCard 
                    girlfriend={girlfriend}
                    onSelect={handleSelectGirlfriend}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
