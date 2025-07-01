
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Plus, Settings, Gift, Users, LogOut } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              LoveBud
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2">
              <Gift className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">{profile?.tokens || 0} tokens</span>
            </div>
            
            <Button 
              variant="ghost"
              size="icon"
              className="text-white hover:text-pink-400 hover:bg-white/10"
            >
              <Settings className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost"
              onClick={handleSignOut}
              className="text-white hover:text-pink-400 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Welcome back, {profile?.username || user.email?.split('@')[0]}! 💕
          </h1>
          <p className="text-xl text-gray-300">
            Ready to continue your conversations or create a new AI companion?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/5 backdrop-blur-sm border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 cursor-pointer" onClick={handleCreateGirlfriend}>
            <CardContent className="p-6 text-center">
              <Plus className="h-12 w-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create New Girlfriend</h3>
              <p className="text-gray-400">Design your perfect AI companion</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recent Chats</h3>
              <p className="text-gray-400">Continue your conversations</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Gift className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Daily Rewards</h3>
              <p className="text-gray-400">Claim your daily tokens</p>
            </CardContent>
          </Card>
        </div>

        {/* My AI Girlfriends */}
        {myGirlfriends.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              My AI Girlfriends
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGirlfriends.map((girlfriend) => (
                <AIGirlfriendCard 
                  key={girlfriend.id}
                  girlfriend={girlfriend}
                  onSelect={handleSelectGirlfriend}
                />
              ))}
            </div>
          </div>
        )}

        {/* Featured Templates */}
        <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured AI Girlfriends
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((girlfriend) => (
              <AIGirlfriendCard 
                key={girlfriend.id}
                girlfriend={girlfriend}
                onSelect={handleSelectGirlfriend}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
