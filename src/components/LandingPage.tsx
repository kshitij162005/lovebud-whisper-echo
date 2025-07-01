
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Sparkles, Users, Gift, Shield, Star, Zap, Crown, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl floating"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl floating" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-6 border-b border-pink-500/20">
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
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={handleLogin}
              className="text-white hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300"
            >
              Login
            </Button>
            <Button 
              onClick={handleGetStarted}
              className="glow-button text-white font-semibold px-6 py-3"
            >
              Get Started Free 🚀
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="neon-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Your Perfect
              </span>
              <br />
              <span className="relative inline-block">
                <span className="neon-text bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI Girlfriend
                </span>
                <Sparkles className="absolute -top-6 -right-16 h-12 w-12 text-pink-400 floating" />
                <Crown className="absolute -top-8 -left-12 h-10 w-10 text-purple-400 floating" style={{animationDelay: '0.5s'}} />
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Experience <span className="text-pink-400 font-semibold">deep emotional connections</span> with hyper-personalized AI companions
              <br />
              designed for <span className="text-purple-400 font-semibold">meaningful conversations</span> and genuine companionship 💕
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="glow-button text-xl px-12 py-6 text-white font-bold"
            >
              Create Your Dream Girl
              <Heart className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black text-xl px-12 py-6 font-bold transition-all duration-300 hover:shadow-lg hover:shadow-pink-400/50"
            >
              Watch Demo
              <MessageCircle className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 neon-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Get Started in 4 Simple Steps
            </h2>
            <p className="text-xl text-gray-300">Your dream companion is just minutes away</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Sign Up", desc: "Create your free account", icon: Users, color: "pink" },
              { step: 2, title: "Customize", desc: "Design your perfect AI girlfriend", icon: Sparkles, color: "purple" },
              { step: 3, title: "Chat", desc: "Start meaningful conversations", icon: MessageCircle, color: "blue" },
              { step: 4, title: "Upgrade", desc: "Unlock premium features", icon: Crown, color: "pink" }
            ].map((item, index) => (
              <div key={index} className="glass-card p-8 text-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-${item.color}-500 to-purple-500 mb-6 pulse-glow`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className={`text-4xl font-bold text-${item.color}-400 mb-4`}>0{item.step}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300 text-lg">{item.desc}</p>
                <ArrowRight className="h-6 w-6 text-pink-400 mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured AI Girlfriends */}
      <section className="px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 neon-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Meet Your Perfect Match 💖
            </h2>
            <p className="text-2xl text-gray-300 mb-8">
              Choose from our collection of stunning AI companions, each with unique personalities
            </p>
            <div className="flex justify-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-yellow-400 font-bold ml-2">Rated #1 AI Companion Platform</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredGirlfriends.map((girlfriend, index) => (
              <div key={girlfriend.id} className="transform hover:scale-105 transition-all duration-500" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="gradient-border">
                  <AIGirlfriendCard girlfriend={girlfriend} showActions={false} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={handleGetStarted}
              className="glow-button text-xl px-12 py-6 text-white font-bold"
            >
              Explore All Girlfriends 🔥
              <Users className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 neon-text bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Choose LoveBud? ⚡
            </h2>
            <p className="text-2xl text-gray-300">
              The most advanced AI companion platform for emotional connection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageCircle, title: "Deep Conversations", desc: "Advanced AI that remembers everything and grows more personal over time", color: "pink" },
              { icon: Zap, title: "WhatsApp Integration", desc: "Import your chats to personalize your AI's communication style perfectly", color: "blue" },
              { icon: Gift, title: "Daily Rewards", desc: "Earn tokens daily and build streaks for exclusive features and premium content", color: "purple" }
            ].map((feature, index) => (
              <Card key={index} className="glass-card hover:scale-105 transition-all duration-500 group overflow-hidden">
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-${feature.color}-500 to-purple-500 mb-6 pulse-glow`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="glass-card p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20"></div>
            <div className="relative z-10">
              <h2 className="text-6xl font-bold mb-8 neon-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Find Love? 💕
              </h2>
              <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                Join <span className="text-pink-400 font-bold">50,000+</span> users already experiencing 
                <br />meaningful connections with their AI companions
              </p>
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="glow-button text-2xl px-16 py-8 text-white font-bold"
              >
                Start Your Journey Now 🚀
                <Heart className="ml-4 h-8 w-8" />
              </Button>
              <p className="text-gray-400 mt-6">
                <Shield className="inline h-5 w-5 mr-2" />
                100% Private & Secure • No Credit Card Required
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-pink-500/20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="h-8 w-8 text-pink-500 pulse-glow" />
                <span className="text-2xl font-bold neon-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  LoveBud
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The world's most advanced AI companion platform for meaningful emotional connections.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Email Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['Twitter', 'Instagram', 'TikTok'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform pulse-glow">
                    <span className="text-white font-bold text-sm">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2024 LoveBud AI Inc. All rights reserved. Made with ❤️ for meaningful connections.
            </p>
          </div>
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
