
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Sparkles } from "lucide-react";
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
    personality_traits: {
      playfulness: [50],
      romance: [50],
      intelligence: [50],
      humor: [50],
      dominance: [50]
    }
  });
  const [loading, setLoading] = useState(false);

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
        avatar_url: "/lovable-uploads/02d0402a-da23-4e22-a4c4-79abaf1f12f8.png",
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:text-pink-400 hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Create Your AI Girlfriend
          </h1>
        </div>
        <Sparkles className="h-8 w-8 text-pink-400" />
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Basic Information */}
        <Card className="bg-white/5 backdrop-blur-sm border-pink-500/20">
          <CardHeader>
            <CardTitle className="text-pink-400">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-300">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter her name..."
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400 focus:border-pink-400"
              />
            </div>

            <div>
              <Label className="text-gray-300">Age: {formData.age[0]}</Label>
              <Slider
                value={formData.age}
                onValueChange={(value) => setFormData({...formData, age: value})}
                max={35}
                min={18}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Ethnicity</Label>
                <Select onValueChange={(value) => setFormData({...formData, ethnicity: value})}>
                  <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Caucasian">Caucasian</SelectItem>
                    <SelectItem value="Latina">Latina</SelectItem>
                    <SelectItem value="Asian">Asian</SelectItem>
                    <SelectItem value="Ebony">Ebony</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Body Type</Label>
                <Select onValueChange={(value) => setFormData({...formData, body_type: value})}>
                  <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Skinny">Skinny</SelectItem>
                    <SelectItem value="Fit">Fit</SelectItem>
                    <SelectItem value="Average">Average</SelectItem>
                    <SelectItem value="Curvy">Curvy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-400">Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Hair Color</Label>
                <Select onValueChange={(value) => setFormData({...formData, hair_color: value})}>
                  <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                    <SelectValue placeholder="Select hair color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blonde">Blonde</SelectItem>
                    <SelectItem value="Brunette">Brunette</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Red">Red</SelectItem>
                    <SelectItem value="Brown">Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Hair Style</Label>
                <Select onValueChange={(value) => setFormData({...formData, hair_style: value})}>
                  <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                    <SelectValue placeholder="Select hair style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Long Straight">Long Straight</SelectItem>
                    <SelectItem value="Long Wavy">Long Wavy</SelectItem>
                    <SelectItem value="Long Curly">Long Curly</SelectItem>
                    <SelectItem value="Medium Straight">Medium Straight</SelectItem>
                    <SelectItem value="Medium Wavy">Medium Wavy</SelectItem>
                    <SelectItem value="Short">Short</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Face Style</Label>
                <Select onValueChange={(value) => setFormData({...formData, face_style: value})}>
                  <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                    <SelectValue placeholder="Select face style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Natural">Natural</SelectItem>
                    <SelectItem value="Sexy">Sexy</SelectItem>
                    <SelectItem value="Cute">Cute</SelectItem>
                    <SelectItem value="Smiling">Smiling</SelectItem>
                    <SelectItem value="Elegant">Elegant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Clothing Style</Label>
                <Select onValueChange={(value) => setFormData({...formData, clothing_style: value})}>
                  <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                    <SelectValue placeholder="Select clothing style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Elegant">Elegant</SelectItem>
                    <SelectItem value="Sporty">Sporty</SelectItem>
                    <SelectItem value="Cute">Cute</SelectItem>
                    <SelectItem value="Classy">Classy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personality */}
        <Card className="bg-white/5 backdrop-blur-sm border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-blue-400">Personality Traits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(formData.personality_traits).map(([trait, value]) => (
              <div key={trait}>
                <Label className="text-gray-300 capitalize">
                  {trait}: {value[0]}%
                </Label>
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
                  className="mt-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Create Button */}
        <div className="text-center">
          <Button 
            onClick={handleCreate}
            disabled={loading}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-12 py-4"
          >
            {loading ? "Creating..." : "Create My AI Girlfriend"}
            <Sparkles className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GirlfriendCreator;
