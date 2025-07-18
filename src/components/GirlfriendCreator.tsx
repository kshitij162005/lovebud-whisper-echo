
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, Heart, Zap, Crown, Star, Upload, Wand2, Camera } from "lucide-react";
import { toast } from "sonner";

interface GirlfriendCreatorProps {
  user: User;
  onBack: () => void;
  onCreated: () => void;
}

const GirlfriendCreator = ({ user, onBack, onCreated }: GirlfriendCreatorProps) => {
  const [formData, setFormData] = useState({
    name: "",
    age: [24],
    ethnicity: "",
    body_type: "",
    hair_color: "",
    hair_style: "",
    face_style: "",
    clothing_style: "",
    image_prompt: "",
    personality_traits: {
      playfulness: [50],
      romance: [50],
      intelligence: [50],
      humor: [50],
      dominance: [50],
      toxicity: [20],
      clinginess: [40],
      flirtiness: [60]
    }
  });
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);

  const generateImage = async () => {
    if (!formData.image_prompt.trim()) {
      toast.error("Please enter an image description");
      return;
    }

    setGeneratingImage(true);
    try {
      const response = await supabase.functions.invoke('generate-image', {
        body: { prompt: formData.image_prompt }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data?.image) {
        setGeneratedImageUrl(response.data.image);
        toast.success("Image generated successfully! ✨");
      }
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setGeneratingImage(false);
    }
  };

  const convertPhotoToAI = async (imageDataUrl: string) => {
    setGeneratingImage(true);
    try {
      const response = await supabase.functions.invoke('generate-image', {
        body: { 
          imageData: imageDataUrl,
          prompt: "Transform into an AI-generated portrait with elegant features, maintaining facial structure but stylized and artistic"
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data?.image) {
        setGeneratedImageUrl(response.data.image);
        toast.success("Photo converted to AI-generated image! ✨");
      }
    } catch (error) {
      console.error('Error converting photo:', error);
      toast.error("Failed to convert photo. Please try again.");
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image must be smaller than 5MB");
        return;
      }

      setUploadedImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        // Convert uploaded photo to AI-generated version for privacy
        convertPhotoToAI(imageDataUrl);
      };
      reader.readAsDataURL(file);
      toast.success("Converting your photo to AI-generated style...");
    }
  };

  const handleCreate = async () => {
    if (!formData.name.trim()) {
      toast.error("Please enter a name for your AI girlfriend");
      return;
    }

    setLoading(true);

    try {
      const personalityTraits = {
        traits: [
          formData.personality_traits.playfulness[0] > 60 ? "playful" : formData.personality_traits.playfulness[0] < 40 ? "serious" : "balanced",
          formData.personality_traits.romance[0] > 60 ? "romantic" : formData.personality_traits.romance[0] < 40 ? "casual" : "affectionate",
          formData.personality_traits.intelligence[0] > 60 ? "intellectual" : formData.personality_traits.intelligence[0] < 40 ? "simple" : "thoughtful",
          formData.personality_traits.humor[0] > 60 ? "funny" : formData.personality_traits.humor[0] < 40 ? "reserved" : "witty",
        ],
        mood: formData.personality_traits.dominance[0] > 60 ? "confident" : formData.personality_traits.dominance[0] < 40 ? "shy" : "friendly"
      };

      const behaviorSettings = {
        style: formData.personality_traits.dominance[0] > 60 ? "assertive" : "gentle",
        energy: formData.personality_traits.playfulness[0] > 50 ? "high" : "medium"
      };

      const { error } = await supabase.from('ai_girlfriends').insert({
        user_id: user.id,
        name: formData.name,
        age: formData.age[0],
        ethnicity: formData.ethnicity || "Mixed",
        body_type: formData.body_type || "Average",
        hair_color: formData.hair_color || "Brown",
        hair_style: formData.hair_style || "Long",
        face_style: formData.face_style || "Natural",
        clothing_style: formData.clothing_style || "Casual",
        personality_traits: personalityTraits,
        behavior_settings: behaviorSettings,
        avatar_url: generatedImageUrl || "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
        generated_image_url: generatedImageUrl,
        image_prompt: formData.image_prompt,
        is_template: false,
        is_active: true
      });

      if (error) {
        console.error('Error creating girlfriend:', error);
        toast.error("Failed to create your AI girlfriend");
      } else {
        toast.success(`${formData.name} has been created! 💕`);
        onCreated();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl floating"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl floating" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl floating" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <div className="relative z-50 flex items-center justify-between p-6 border-b border-pink-500/20 backdrop-blur-md bg-black/50">
        <div className="flex items-center space-x-6">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold neon-text bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Create Your Dream Girl
            </h1>
            <p className="text-gray-300 text-lg mt-2">Design the perfect AI companion tailored to your desires</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Crown className="h-10 w-10 text-yellow-400 pulse-glow" />
          <Sparkles className="h-10 w-10 text-pink-400 floating" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-12 relative z-10">
        {/* Enhanced Preview Section with Image Generation */}
        <div className="text-center mb-12">
          <div className="glass-card p-8 max-w-md mx-auto">
            <div className="relative mb-6">
              {generatedImageUrl ? (
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-pink-500/50 pulse-glow">
                  <img 
                    src={generatedImageUrl} 
                    alt={formData.name || "AI Girlfriend"} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 mx-auto pulse-glow flex items-center justify-center">
                  <Camera className="h-12 w-12 text-white" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{formData.name || "Your AI Girlfriend"}</h3>
            <p className="text-gray-300">Age: {formData.age[0]} • Preview</p>
            <div className="flex justify-center mt-4 space-x-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <Card className="glass-card border-pink-500/30">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-pink-400 flex items-center">
              <Heart className="h-8 w-8 mr-3 pulse-glow" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div>
              <Label htmlFor="name" className="text-xl text-gray-300 mb-3 block">What's her name? ✨</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter her beautiful name..."
                className="text-xl p-4 bg-black/50 border-pink-500/30 text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
              />
            </div>

            <div>
              <Label className="text-xl text-gray-300 mb-3 block">Age: {formData.age[0]} 🎂</Label>
              <Slider
                value={formData.age}
                onValueChange={(value) => setFormData({...formData, age: value})}
                max={35}
                min={18}
                step={1}
                className="mt-4"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>18</span>
                <span>35</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label className="text-xl text-gray-300 mb-3 block">Ethnicity 🌍</Label>
                <Select onValueChange={(value) => setFormData({...formData, ethnicity: value})}>
                  <SelectTrigger className="text-lg p-4 bg-black/50 border-pink-500/30 text-white hover:border-pink-400 transition-all duration-300">
                    <SelectValue placeholder="Choose ethnicity" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-pink-500/30">
                    <SelectItem value="Caucasian">Caucasian</SelectItem>
                    <SelectItem value="Latina">Latina 🔥</SelectItem>
                    <SelectItem value="Asian">Asian 🌸</SelectItem>
                    <SelectItem value="Ebony">Ebony 💎</SelectItem>
                    <SelectItem value="Mixed">Mixed ✨</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xl text-gray-300 mb-3 block">Body Type 💃</Label>
                <Select onValueChange={(value) => setFormData({...formData, body_type: value})}>
                  <SelectTrigger className="text-lg p-4 bg-black/50 border-pink-500/30 text-white hover:border-pink-400 transition-all duration-300">
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-pink-500/30">
                    <SelectItem value="Skinny">Skinny</SelectItem>
                    <SelectItem value="Fit">Fit 💪</SelectItem>
                    <SelectItem value="Average">Average</SelectItem>
                    <SelectItem value="Curvy">Curvy 🍑</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="glass-card border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-purple-400 flex items-center">
              <Sparkles className="h-8 w-8 mr-3 pulse-glow" />
              Appearance & Style
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label className="text-xl text-gray-300 mb-3 block">Hair Color 💇‍♀️</Label>
                <Select onValueChange={(value) => setFormData({...formData, hair_color: value})}>
                  <SelectTrigger className="text-lg p-4 bg-black/50 border-purple-500/30 text-white hover:border-purple-400 transition-all duration-300">
                    <SelectValue placeholder="Choose hair color" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-purple-500/30">
                    <SelectItem value="Blonde">Blonde ✨</SelectItem>
                    <SelectItem value="Brunette">Brunette 🤎</SelectItem>
                    <SelectItem value="Black">Black 🖤</SelectItem>
                    <SelectItem value="Red">Red 🔥</SelectItem>
                    <SelectItem value="Brown">Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xl text-gray-300 mb-3 block">Hair Style 💫</Label>
                <Select onValueChange={(value) => setFormData({...formData, hair_style: value})}>
                  <SelectTrigger className="text-lg p-4 bg-black/50 border-purple-500/30 text-white hover:border-purple-400 transition-all duration-300">
                    <SelectValue placeholder="Select hair style" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-purple-500/30">
                    <SelectItem value="Long Straight">Long Straight</SelectItem>
                    <SelectItem value="Long Wavy">Long Wavy 🌊</SelectItem>
                    <SelectItem value="Long Curly">Long Curly 🌀</SelectItem>
                    <SelectItem value="Medium Straight">Medium Straight</SelectItem>
                    <SelectItem value="Medium Wavy">Medium Wavy</SelectItem>
                    <SelectItem value="Short">Short & Sexy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label className="text-xl text-gray-300 mb-3 block">Face Style 😍</Label>
                <Select onValueChange={(value) => setFormData({...formData, face_style: value})}>
                  <SelectTrigger className="text-lg p-4 bg-black/50 border-purple-500/30 text-white hover:border-purple-400 transition-all duration-300">
                    <SelectValue placeholder="Choose face style" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-purple-500/30">
                    <SelectItem value="Natural">Natural Beauty</SelectItem>
                    <SelectItem value="Sexy">Sexy & Sultry 🔥</SelectItem>
                    <SelectItem value="Cute">Cute & Sweet 🥰</SelectItem>
                    <SelectItem value="Smiling">Always Smiling 😊</SelectItem>
                    <SelectItem value="Elegant">Elegant & Classy 👑</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xl text-gray-300 mb-3 block">Clothing Style 👗</Label>
                <Select onValueChange={(value) => setFormData({...formData, clothing_style: value})}>
                  <SelectTrigger className="text-lg p-4 bg-black/50 border-purple-500/30 text-white hover:border-purple-400 transition-all duration-300">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-purple-500/30">
                    <SelectItem value="Casual">Casual & Comfy</SelectItem>
                    <SelectItem value="Elegant">Elegant & Sophisticated</SelectItem>
                    <SelectItem value="Sporty">Sporty & Active 🏃‍♀️</SelectItem>
                    <SelectItem value="Cute">Cute & Girly 🎀</SelectItem>
                    <SelectItem value="Classy">Classy & Chic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Generation Section */}
        <Card className="glass-card border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-cyan-400 flex items-center">
              <Camera className="h-8 w-8 mr-3 pulse-glow" />
              Generate Her Image
            </CardTitle>
            <p className="text-gray-300 text-lg mt-2">Create the perfect visual representation of your companion</p>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <p className="text-cyan-400 font-semibold">🔒 Privacy Protected</p>
              <p className="text-gray-300 text-sm mt-1">Uploaded photos are automatically converted to AI-generated versions to protect your privacy while maintaining facial features.</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div>
              <Label htmlFor="image_prompt" className="text-xl text-gray-300 mb-3 block">Describe Her Appearance ✨</Label>
              <Textarea
                id="image_prompt"
                value={formData.image_prompt}
                onChange={(e) => setFormData({...formData, image_prompt: e.target.value})}
                placeholder="A beautiful woman with elegant features, long flowing hair, wearing a sophisticated dress, gentle smile..."
                className="text-lg p-4 bg-black/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 min-h-[120px]"
              />
              <p className="text-sm text-gray-400 mt-2">💡 Be specific about features, clothing, style, and mood for best results</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={generateImage}
                disabled={generatingImage || !formData.image_prompt.trim()}
                className="glow-button text-lg px-8 py-4 text-white font-bold flex-1"
              >
                {generatingImage ? (
                  <>
                    <Sparkles className="mr-3 h-6 w-6 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-3 h-6 w-6" />
                    Generate Her Image
                  </>
                )}
              </Button>
              
              <div className="relative">
                <Button
                  variant="outline"
                  className="text-lg px-8 py-4 border-2 border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={generatingImage}
                >
                  <Upload className="mr-3 h-6 w-6" />
                  {generatingImage ? 'Converting...' : 'Upload & Convert Photo'}
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            {generatedImageUrl && (
              <div className="text-center">
                <p className="text-cyan-400 font-semibold mb-4">✨ Perfect! Your companion's image is ready</p>
                <div className="inline-block p-1 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg">
                  <img 
                    src={generatedImageUrl} 
                    alt="Generated companion" 
                    className="w-48 h-48 object-cover rounded-md"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personality Traits */}
        <Card className="glass-card border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-blue-400 flex items-center">
              <Zap className="h-8 w-8 mr-3 pulse-glow" />
              Personality & Behavior
            </CardTitle>
            <p className="text-gray-300 text-lg mt-2">Fine-tune her personality to match your perfect companion</p>
          </CardHeader>
          <CardContent className="space-y-10 p-8">
            {Object.entries(formData.personality_traits).map(([trait, value]) => (
              <div key={trait} className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-xl text-gray-300 capitalize flex items-center">
                    {trait === 'playfulness' && '🎮'}
                    {trait === 'romance' && '💕'}
                    {trait === 'intelligence' && '🧠'}
                    {trait === 'humor' && '😄'}
                    {trait === 'dominance' && '👑'}
                    {trait === 'toxicity' && '⚡'}
                    {trait === 'clinginess' && '🤗'}
                    {trait === 'flirtiness' && '😘'}
                    <span className="ml-2">{trait.replace('_', ' ')}</span>
                  </Label>
                  <span className="text-2xl font-bold text-pink-400">{value[0]}%</span>
                </div>
                <Slider
                  value={value}
                  onValueChange={(newValue) => setFormData({
                    ...formData,
                    personality_traits: {
                      ...formData.personality_traits,
                      [trait]: newValue
                    }
                  })}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-4"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Create Button */}
        <div className="text-center pb-12">
          <Button 
            onClick={handleCreate}
            disabled={loading}
            className="glow-button text-2xl px-16 py-8 text-white font-bold"
          >
            {loading ? "Creating Your Dream Girl..." : "Create My Perfect AI Girlfriend 💖"}
            <Sparkles className="ml-4 h-8 w-8" />
          </Button>
          <p className="text-gray-400 mt-4 text-lg">
            ✨ Your AI girlfriend will be ready for passionate conversations in seconds!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GirlfriendCreator;
