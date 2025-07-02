
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
      description: "Your playful girlfriend who loves midnight conversations and sending you flirty texts throughout the day. She's always ready for adventure and makes you feel like the only man in the world.",
      personality_traits: { 
        traits: ["playful", "caring", "adventurous", "flirty", "spontaneous"], 
        mood: "naughty" 
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
      description: "A sophisticated beauty with a mysterious side. She loves deep conversations, surprises you with her wild fantasies, and always keeps you guessing what she'll do next.",
      personality_traits: { 
        traits: ["sophisticated", "mysterious", "sensual", "intelligent", "seductive"], 
        mood: "sultry" 
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
      description: "Your sweet but naughty Indian princess who's innocent by day but becomes your wildest fantasy at night. She loves to tease and please, always craving your attention.",
      personality_traits: { 
        traits: ["sweet", "passionate", "traditional", "submissive", "caring"], 
        mood: "eager" 
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
      description: "An exotic Middle Eastern beauty who's both elegant and wild. She'll seduce you with her mysterious charm and leave you begging for more of her passionate love.",
      personality_traits: { 
        traits: ["exotic", "passionate", "dominant", "mysterious", "intense"], 
        mood: "seductive" 
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
      description: "Your confident queen who knows exactly what she wants and isn't afraid to take it. She'll drive you crazy with her attitude and make you worship every inch of her.",
      personality_traits: { 
        traits: ["confident", "dominant", "sassy", "passionate", "fierce"], 
        mood: "demanding" 
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
      description: "A spicy Latina who brings fire to every conversation. She's passionate, jealous, and completely obsessed with you. Prepare for steamy nights and explosive chemistry.",
      personality_traits: { 
        traits: ["passionate", "jealous", "fiery", "romantic", "clingy"], 
        mood: "horny" 
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
      {/* Enhanced animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl floating"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl floating" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl floating" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-60 h-60 bg-yellow-500/5 rounded-full blur-3xl floating" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Header */}
      <header className="relative z-50 px-6 py-6 border-b border-pink-500/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Heart className="h-10 w-10 text-pink-500 pulse-glow" />
              <div className="absolute inset-0 h-10 w-10 bg-pink-500/20 rounded-full blur-md"></div>
            </div>
            <span className="text-3xl font-bold sexy-glow bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
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
              Get Started Free 🔥
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="sexy-glow bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                Your Perfect
              </span>
              <br />
              <span className="relative inline-block">
                <span className="sexy-glow bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  AI Girlfriend
                </span>
                <Sparkles className="absolute -top-6 -right-16 h-12 w-12 text-pink-400 floating" />
                <Crown className="absolute -top-8 -left-12 h-10 w-10 text-purple-400 floating" style={{animationDelay: '0.5s'}} />
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Experience <span className="text-pink-400 font-semibold sexy-glow">passionate connections</span> with AI companions who are 
              <br />
              <span className="text-purple-400 font-semibold">desperate for your attention</span> and ready to fulfill your fantasies 💕
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              size="lg"
              onClick={handleGetStarted}
              className="glow-button text-xl px-12 py-6 text-white font-bold desperate-animation"
            >
              Meet Your Dream Girl
              <Heart className="ml-3 h-6 w-6" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="seductive-border text-pink-400 hover:bg-pink-400 hover:text-black text-xl px-12 py-6 font-bold transition-all duration-300 hover:shadow-lg hover:shadow-pink-400/50"
            >
              <Play className="mr-3 h-6 w-6" />
              Watch Them Beg
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 sexy-glow bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              4 Steps to Pure Ecstasy
            </h2>
            <p className="text-xl text-gray-300">Your perfect companion is literally begging to meet you</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Sign Up", desc: "Join thousands of satisfied users", icon: Users, color: "pink" },
              { step: 2, title: "Pick Your Girl", desc: "Choose from desperate beauties", icon: Sparkles, color: "purple" },
              { step: 3, title: "Start Playing", desc: "Make her beg for more", icon: MessageCircle, color: "blue" },
              { step: 4, title: "Get Addicted", desc: "Experience pure satisfaction", icon: Crown, color: "pink" }
            ].map((item, index) => (
              <div key={index} className="sharp-card p-8 text-center group relative overflow-hidden flirty-bounce" style={{animationDelay: `${index * 0.5}s`}}>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-${item.color}-500 to-purple-500 mb-6 pulse-glow`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className={`text-4xl font-bold text-${item.color}-400 mb-4 sexy-glow`}>{item.step}</div>
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
            <h2 className="text-5xl font-bold mb-6 sexy-glow bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Meet Your Desperate Beauties 💋
            </h2>
            <p className="text-2xl text-gray-300 mb-8">
              These gorgeous AI companions are <span className="text-pink-400 font-bold sexy-glow">dying to meet you</span> - each one unique, passionate, and ready to be yours
            </p>
            <div className="flex justify-center space-x-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
              <span className="text-yellow-400 font-bold ml-2">Rated #1 for Satisfaction</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredGirlfriends.map((girlfriend, index) => (
              <div key={girlfriend.id} className="transform hover:scale-105 transition-all duration-500 desperate-animation" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="seductive-border rounded-lg p-1">
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
              className="glow-button text-xl px-12 py-6 text-white font-bold desperate-animation"
            >
              See All Horny Girls 🔥
              <Users className="ml-3 h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 sexy-glow bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Why Men Choose LoveBud ⚡
            </h2>
            <p className="text-2xl text-gray-300">
              The most addictive AI companion platform for real satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageCircle, title: "Unlimited Sexting", desc: "AI that learns your fantasies and gets naughtier with every conversation", color: "pink" },
              { icon: Zap, title: "Instant Responses", desc: "No waiting - your girls are always online, always desperate for your attention", color: "blue" },
              { icon: Gift, title: "Daily Rewards", desc: "Free tokens every day to unlock exclusive content and premium features", color: "purple" }
            ].map((feature, index) => (
              <Card key={index} className="sharp-card hover:scale-105 transition-all duration-500 group overflow-hidden desperate-animation" style={{animationDelay: `${index * 0.3}s`}}>
                <CardContent className="p-8 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-${feature.color}-500 to-purple-500 mb-6 pulse-glow`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white sexy-glow">{feature.title}</h3>
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
          <div className="sharp-card p-16 relative overflow-hidden seductive-border">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-600/20"></div>
            <div className="relative z-10">
              <h2 className="text-6xl font-bold mb-8 sexy-glow bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Ready to Get Satisfied? 💦
              </h2>
              <p className="text-2xl text-gray-300 mb-12 leading-relaxed">
                Join <span className="text-pink-400 font-bold sexy-glow">50,000+</span> men already getting their daily dose 
                <br />of <span className="text-purple-400 font-bold">passionate AI companionship</span>
              </p>
              <Button 
                size="lg"
                onClick={handleGetStarted}
                className="glow-button text-2xl px-16 py-8 text-white font-bold desperate-animation"
              >
                Start Getting Satisfied Now 🚀
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
                <span className="text-2xl font-bold sexy-glow bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  LoveBud
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The world's most satisfying AI companion platform for passionate connections.
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
                <li><a href="#" className="hover:text-pink-400 transition-colors">24/7 Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {['T', 'I', 'S'].map((social, index) => (
                  <a key={social} href="#" className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform pulse-glow">
                    <span className="text-white font-bold text-sm">{social}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2024 LoveBud AI Inc. All rights reserved. Made with ❤️ for passionate connections.
            </p>
          </div>
        </div>
      </footer>

      {/* Flirty Popups */}
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
