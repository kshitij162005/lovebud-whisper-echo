
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Heart, User, Calendar, Ruler, Globe, Users } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const OnboardingModal = ({ isOpen, onClose, user }: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    height: "",
    ethnicity: "",
    orientation: "",
    hobbies: "",
    relationship_goals: "",
    past_relationships: ""
  });

  const ethnicityOptions = [
    "Caucasian", "African American", "Hispanic/Latino", "Asian", 
    "Middle Eastern", "Native American", "Mixed", "Other", "Prefer not to say"
  ];

  const orientationOptions = [
    "Straight", "Gay", "Lesbian", "Bisexual", "Pansexual", "Asexual", "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          age: parseInt(formData.age),
          height: formData.height,
          ethnicity: formData.ethnicity,
          sexual_orientation: formData.orientation,
          hobbies: formData.hobbies,
          relationship_goals: formData.relationship_goals,
          past_relationships: formData.past_relationships,
          onboarding_completed: true
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success("Welcome to LoveBud! Your profile has been created.");
      onClose();
    } catch (error) {
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="elegant-modal text-white max-w-lg border-0">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="h-8 w-8 text-blue-400 subtle-pulse" />
              <span className="text-3xl font-bold elegant-text bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Welcome to LoveBud
              </span>
            </div>
            <p className="text-gray-300 font-normal text-lg">
              Let's create your perfect romantic profile
            </p>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          {/* Progress Bar */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step >= num 
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-black font-bold' 
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <User className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold elegant-text">Basic Information</h3>
                <p className="text-gray-400">Tell us about yourself</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-gray-300">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose your username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-gray-300">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="height" className="text-gray-300">Height</Label>
                    <Input
                      id="height"
                      type="text"
                      placeholder="e.g., 5'10&quot;"
                      value={formData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Identity */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Globe className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold elegant-text">Your Identity</h3>
                <p className="text-gray-400">Help us understand you better</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="ethnicity" className="text-gray-300">Ethnicity</Label>
                  <select
                    id="ethnicity"
                    value={formData.ethnicity}
                    onChange={(e) => handleInputChange('ethnicity', e.target.value)}
                    className="w-full bg-white/5 border border-gray-600 text-white rounded-md px-3 py-2 focus:border-blue-400"
                  >
                    <option value="">Select your ethnicity</option>
                    {ethnicityOptions.map(option => (
                      <option key={option} value={option} className="bg-gray-800">{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="orientation" className="text-gray-300">Sexual Orientation</Label>
                  <select
                    id="orientation"
                    value={formData.orientation}
                    onChange={(e) => handleInputChange('orientation', e.target.value)}
                    className="w-full bg-white/5 border border-gray-600 text-white rounded-md px-3 py-2 focus:border-blue-400"
                  >
                    <option value="">Select your orientation</option>
                    {orientationOptions.map(option => (
                      <option key={option} value={option} className="bg-gray-800">{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Personal Details */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Heart className="h-12 w-12 text-pink-400 mx-auto mb-3" />
                <h3 className="text-xl font-semibold elegant-text">Personal Touch</h3>
                <p className="text-gray-400">Share what makes you unique</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="hobbies" className="text-gray-300">Hobbies & Interests</Label>
                  <Input
                    id="hobbies"
                    type="text"
                    placeholder="Gaming, music, traveling..."
                    value={formData.hobbies}
                    onChange={(e) => handleInputChange('hobbies', e.target.value)}
                    className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Label htmlFor="relationship_goals" className="text-gray-300">What are you looking for?</Label>
                  <Input
                    id="relationship_goals"
                    type="text"
                    placeholder="Casual chat, deep connection, fun conversations..."
                    value={formData.relationship_goals}
                    onChange={(e) => handleInputChange('relationship_goals', e.target.value)}
                    className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                  />
                </div>

                <div>
                  <Label htmlFor="past_relationships" className="text-gray-300">Relationship Experience (Optional)</Label>
                  <Input
                    id="past_relationships"
                    type="text"
                    placeholder="Tell us about your dating history..."
                    value={formData.past_relationships}
                    onChange={(e) => handleInputChange('past_relationships', e.target.value)}
                    className="bg-white/5 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              onClick={handlePrevious}
              disabled={step === 1}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </Button>

            {step < 3 ? (
              <Button
                onClick={handleNext}
                className="luxury-button text-white font-semibold px-6"
                disabled={!formData.username || !formData.age}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="luxury-button text-white font-semibold px-6"
              >
                Complete Profile
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
