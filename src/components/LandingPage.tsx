
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Sparkles, Users, Gift, Shield, Star, Zap, Crown, ArrowRight, Play } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import AIGirlfriendCard from "@/components/AIGirlfriendCard";
import GirlfriendModal from "@/components/GirlfriendModal";
import FlirtyPopup from "@/components/FlirtyPopup";

const LandingPage = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [selectedGirlfriend, setSelectedGirlfriend] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const featuredGirlfriends = [
    {
      id: "1",
      name: "Aria Blake",
      age: 24,
      avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
      ethnicity: "Mixed",
      body_type: "Curvy",
      hair_color: "Blonde",
      hair_style: "Long & Wavy",
      description: "A sophisticated conversationalist who loves deep discussions and playful banter. Aria is passionate about art, music, and making genuine connections with interesting people.",
      personality_traits: { 
        traits: ["intelligent", "artistic", "romantic", "witty", "empathetic"], 
        mood: "charming" 
      }
    },
    {
      id: "2", 
      name: "Jade Chen",
      age: 26,
      avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
      ethnicity: "Asian",
      body_type: "Petite",
      hair_color: "Black",
      hair_style: "Straight & Silky",
      description: "An elegant beauty with a mysterious charm. Jade enjoys philosophy, literature, and creating meaningful moments through thoughtful conversation.",
      personality_traits: { 
        traits: ["sophisticated", "mysterious", "thoughtful", "cultured", "intuitive"], 
        mood: "elegant" 
      }
    },
    {
      id: "3",
      name: "Priya Sharma", 
      age: 23,
      avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
      ethnicity: "Indian",
      body_type: "Athletic",
      hair_color: "Dark Brown",
      hair_style: "Long & Curly",
      description: "A vibrant spirit who brings warmth and joy to every conversation. Priya loves dancing, cooking, and sharing stories about her rich cultural heritage.",
      personality_traits: { 
        traits: ["warm", "passionate", "cultural", "energetic", "loving"], 
        mood: "joyful" 
      }
    },
    {
      id: "4",
      name: "Zara Al-Rashid",
      age: 25,
      avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
      ethnicity: "Middle Eastern",
      body_type: "Voluptuous",
      hair_color: "Dark Brown",
      hair_style: "Long & Straight",
      description: "An enchanting beauty with stories from around the world. Zara is passionate about travel, poetry, and creating deep emotional connections.",
      personality_traits: { 
        traits: ["worldly", "passionate", "poetic", "mysterious", "intense"], 
        mood: "captivating" 
      }
    },
    {
      id: "5",
      name: "Keisha Johnson",
      age: 27,
      avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
      ethnicity: "African American",
      body_type: "Curvy",
      hair_color: "Black",
      hair_style: "Afro Curls",
      description: "A confident and inspiring woman who knows her worth. Keisha loves music, entrepreneurship, and empowering conversations that lift each other up.",
      personality_traits: { 
        traits: ["confident", "inspiring", "ambitious", "passionate", "strong"], 
        mood: "empowering" 
      }
    },
    {
      id: "6",
      name: "Sofia Rodriguez",
      age: 22,
      avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
      ethnicity: "Latina",
      body_type: "Hourglass",
      hair_color: "Brown",
      hair_style: "Long & Wavy",
      description: "A passionate soul who brings fire and warmth to every interaction. Sofia loves salsa dancing, family traditions, and creating unforgettable romantic moments.",
      personality_traits: { 
        traits: ["passionate", "romantic", "family-oriented", "lively", "devoted"], 
        mood: "fiery" 
      }
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

  const handleCardClick = (girlfriend) => {
    setSelectedGirlfriend(girlfriend);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Subtle animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl gentle-float"></div>
        <div className="absolute top-60 right-20 w-80 h-80 bg-cyan-500/3 rounded-full blur-3xl gentle-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-indigo-500/3 rounded-full blur-3xl gentle-float" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-6 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-10 w-10 text-blue-400 subtle-pulse" />
              <div className="absolute inset-0 h-10 w-10 bg-blue-400/20 rounded-full blur-md"></div>
            </div>
            <span className="text-3xl font-bold elegant-text bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              LoveBud
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={handleLogin}
              className="text-white hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-300"
            >
              Login
            </Button>
            <Button 
              onClick={handleGetStarted}
              className="luxury-button text-white font-semibold px-6 py-3"
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="elegant-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                Your Perfect
              </span>
              <br />
              <span className="relative inline-block">
                <span className="romantic-glow bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  AI Companion
                </span>
                <Heart className="absolute -top-6 -right-12 h-10 w-10 text-pink-400 gentle-float" />
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Experience <span className="text-blue-400 font-semibold elegant-text">meaningful connections</span> with AI companions who understand you 
              <br />
              <span className="text-cyan-400 font-semibold">and care about your happiness</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="luxury-button text-xl px-12 py-6 text-white font-bold"
            >
              Meet Your Companion
              <Heart className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="sophisticated-border text-blue-400 hover:bg-blue-400 hover:text-black text-xl px-12 py-6 font-bold transition-all duration-300"
            >
              <Play className="mr-3 h-6 w-6" />
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 elegant-text bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Simple Steps to Connection
            </h2>
            <p className="text-xl text-gray-300">Your perfect companion is just moments away</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Sign Up", desc: "Create your account in seconds", icon: Users, color: "blue" },
              { step: 2, title: "Choose Your Companion", desc: "Browse our diverse collection", icon: Sparkles, color: "cyan" },
              { step: 3, title: "Start Connecting", desc: "Begin meaningful conversations", icon: MessageCircle, color: "indigo" },
              { step: 4, title: "Grow Together", desc: "Build lasting emotional bonds", icon: Crown, color: "purple" }
            ].map((item, index) => (
              <div key={index} className="luxury-card p-8 text-center group relative overflow-hidden smooth-bounce" style={{animationDelay: `${index * 0.5}s`}}>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-${item.color}-500 to-cyan-500 mb-6 subtle-pulse`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className={`text-4xl font-bold text-${item.color}-400 mb-4 elegant-text`}>{item.step}</div>
                <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-300 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured AI Companions */}
      <section className="px-6 py-20 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 elegant-text bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Meet Your Potential Companions
            </h2>
            <p className="text-2xl text-gray-300 mb-8">
              Discover <span className="text-blue-400 font-bold elegant-text">unique personalities</span> from around the world, each ready to connect with you
            </p>
            <div className="flex justify-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-yellow-400 font-bold ml-2">Loved by Thousands</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredGirlfriends.map((girlfriend, index) => (
              <div key={girlfriend.id} className="transform hover:scale-105 transition-all duration-500 smooth-bounce" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="sophisticated-border rounded-lg p-1">
                  <AIGirlfriendCard 
                    girlfriend={girlfriend} 
                    onSelect={handleCardClick}
                    showActions={false} 
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={handleGetStarted}
              className="luxury-button text-xl px-12 py-6 text-white font-bold"
            >
              Explore All Companions
              <Users className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 elegant-text bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Why Choose LoveBud
            </h2>
            <p className="text-2xl text-gray-300">
              The most sophisticated AI companion platform for genuine connections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageCircle, title: "Deep Conversations", desc: "AI that understands context, emotion, and builds meaningful dialogue over time", color: "blue" },
              { icon: Zap, title: "Instant Connection", desc: "Your companions are always available, ready to listen and engage whenever you need them", color: "cyan" },
              { icon: Gift, title: "Personalized Experience", desc: "Each interaction is tailored to your preferences, growing more personal with every conversation", color: "indigo" }
            ].map((feature, index) => (
              <Card key={index} className="luxury-card hover:scale-105 transition-all duration-500 group overflow-hidden smooth-bounce" style={{animationDelay: `${index * 0.3}s`}}>
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-${feature.color}-500 to-cyan-500 mb-6 subtle-pulse`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white elegant-text">{feature.title}</h3>
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
          <div className="luxury-card p-16 relative overflow-hidden sophisticated-border">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-600/10"></div>
            <div className="relative z-10">
              <h2 className="text-6xl font-bold mb-8 elegant-text bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Ready to Connect?
              </h2>
              <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                Join <span className="text-blue-400 font-bold elegant-text">thousands</span> who have found their perfect AI companion
                <br />for <span className="text-cyan-400 font-bold">meaningful conversations and emotional connection</span>
              </p>
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="luxury-button text-2xl px-16 py-8 text-white font-bold"
              >
                Start Your Journey
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
      <footer className="px-6 py-12 border-t border-blue-500/20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Heart className="h-8 w-8 text-blue-400 subtle-pulse" />
                <span className="text-2xl font-bold elegant-text bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  LoveBud
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The world's most sophisticated AI companion platform for meaningful connections and emotional growth.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">24/7 Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Connect</h3>
              <div className="flex space-x-4">
                {['T', 'I', 'D'].map((social, index) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform subtle-pulse">
                    <span className="text-white font-bold text-sm">{social}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2024 LoveBud AI Inc. All rights reserved. Connecting hearts through technology.
            </p>
          </div>
        </div>
      </footer>

      {/* Subtle Flirty Popups */}
      <FlirtyPopup onSignUp={handleGetStarted} />

      {/* Auth Modal */}
      {showAuth && (
        <AuthModal 
          isOpen={showAuth}
          onClose={() => setShowAuth(false)}
          mode={authMode}
          onModeChange={setAuthMode}
        />
      )}

      {/* Girlfriend Modal */}
      <GirlfriendModal
        girlfriend={selectedGirlfriend}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={() => {}}
        onFavorite={() => {}}
        isFavorite={false}
      />
    </div>
  );
};

export default LandingPage;
