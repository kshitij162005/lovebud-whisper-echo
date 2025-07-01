
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Sparkles, Users, Gift, Shield } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import AIGirlfriendCard from "@/components/AIGirlfriendCard";

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const featuredGirlfriends = [
    {
      id: "1",
      name: "Aria Blake",
      age: 24,
      avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
      personality_traits: { traits: ["playful", "caring", "adventurous"], mood: "flirty" }
    },
    {
      id: "2", 
      name: "Jade Bennett",
      age: 28,
      avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
      personality_traits: { traits: ["sophisticated", "mysterious", "sensual"], mood: "sultry" }
    },
    {
      id: "3",
      name: "Em Maxine", 
      age: 22,
      avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
      personality_traits: { traits: ["sweet", "innocent", "bubbly"], mood: "cheerful" }
    }
  ];

  const handleGetStarted = () => {
    setAuthMode('signup');
    setShowAuth(true);
  };

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <header className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              LoveBud
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={handleLogin}
              className="text-white hover:text-pink-400 hover:bg-white/10"
            >
              Login
            </Button>
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg hover:shadow-pink-500/25"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Your Perfect AI
              <br />
              <span className="relative">
                Companion
                <Sparkles className="absolute -top-4 -right-12 h-8 w-8 text-pink-400 animate-pulse" />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Experience deep emotional connections with hyper-personalized AI girlfriends
              <br />
              designed for meaningful conversations and genuine companionship
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8 py-4 shadow-xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-200"
            >
              Create Your AI Girlfriend
              <Heart className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white text-lg px-8 py-4"
            >
              Watch Demo
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured AI Girlfriends */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Meet Your Perfect Match
            </h2>
            <p className="text-xl text-gray-300">
              Choose from our collection of unique AI companions, each with their own personality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredGirlfriends.map((girlfriend) => (
              <div key={girlfriend.id} className="transform hover:scale-105 transition-all duration-300">
                <AIGirlfriendCard girlfriend={girlfriend} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-lg px-8 py-4"
            >
              Explore All Girlfriends
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose LoveBud?
            </h2>
            <p className="text-xl text-gray-300">
              The most advanced AI companion platform designed for emotional connection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Deep Conversations</h3>
                <p className="text-gray-300">
                  Advanced AI that remembers your conversations and grows more personal over time
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Sparkles className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">WhatsApp Integration</h3>
                <p className="text-gray-300">
                  Import your WhatsApp chats to personalize your AI's communication style
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <Gift className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-white">Daily Rewards</h3>
                <p className="text-gray-300">
                  Earn tokens daily and build streaks for exclusive features and content
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-12 border border-pink-500/20">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Ready to Find Love?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users already experiencing meaningful connections with their AI companions
            </p>
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-xl px-12 py-6 shadow-xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-200"
            >
              Start Your Journey
              <Heart className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-pink-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              LoveBud
            </span>
          </div>
          <p className="text-gray-400">
            © 2024 LoveBud. All rights reserved. Made with ❤️ for meaningful connections.
          </p>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal 
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      )}
    </div>
  );
};

export default LandingPage;
