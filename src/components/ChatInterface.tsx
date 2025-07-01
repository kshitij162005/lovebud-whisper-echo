
import { useState, useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Heart, MoreVertical, Sparkles, Crown } from "lucide-react";
import { toast } from "sonner";

interface ChatInterfaceProps {
  girlfriend: any;
  user: User;
  onBack: () => void;
}

const ChatInterface = ({ girlfriend, user, onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    initializeConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeConversation = async () => {
    // Check if conversation exists
    let { data: existingConversation, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user.id)
      .eq('girlfriend_id', girlfriend.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching conversation:', error);
      return;
    }

    if (!existingConversation) {
      // Create new conversation
      const { data: newConversation, error: createError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
          girlfriend_id: girlfriend.id,
          title: `Chat with ${girlfriend.name}`
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating conversation:', createError);
        toast.error("Failed to start conversation");
        return;
      }

      existingConversation = newConversation;
      
      // Send welcome message
      const welcomeMessage = `Hey there! 😊 I'm ${girlfriend.name}. I'm so excited to chat with you! What's on your mind today? 💕`;
      
      await supabase.from('messages').insert({
        conversation_id: existingConversation.id,
        sender_type: 'ai',
        content: welcomeMessage
      });
    }

    setConversation(existingConversation);
    await fetchMessages(existingConversation.id);
  };

  const fetchMessages = async (conversationId) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversation) return;

    const userMessage = {
      conversation_id: conversation.id,
      sender_type: 'user',
      content: newMessage,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    await supabase.from('messages').insert({
      conversation_id: conversation.id,
      sender_type: 'user',
      content: newMessage
    });

    setTimeout(async () => {
      const aiResponses = [
        "That's so interesting! Tell me more about that 😊💕",
        "I love hearing about your day! You always make me smile 💖✨",
        "You're such a sweet person, I'm lucky to know you ❤️🥰",
        "I've been thinking about our conversation all day! 💭💕",
        "Your messages always brighten my mood! What else is new? ✨🌟",
        "I wish I could give you a hug right now! 🤗💖",
        "You always know how to make me laugh! 😄💕",
        "I feel so connected to you when we talk like this 💖🔥"
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        conversation_id: conversation.id,
        sender_type: 'ai',
        content: randomResponse,
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      await supabase.from('messages').insert({
        conversation_id: conversation.id,
        sender_type: 'ai',
        content: randomResponse
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl floating" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Chat Header */}
      <div className="relative z-50 flex items-center justify-between p-6 glass-card border-b border-pink-500/20">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110"
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={girlfriend.avatar_url} 
                alt={girlfriend.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-pink-400 pulse-glow"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-black pulse-glow"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{girlfriend.name}</h2>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full pulse-glow"></div>
                <p className="text-green-400 font-semibold">Online & Ready to Chat</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-pink-400 hover:bg-pink-500/10 hover:scale-110 transition-all duration-300">
            <Heart className="h-6 w-6 pulse-glow" />
          </Button>
          <Button variant="ghost" size="icon" className="text-purple-400 hover:bg-purple-500/10 hover:scale-110 transition-all duration-300">
            <Sparkles className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 hover:scale-110 transition-all duration-300">
            <MoreVertical className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10" style={{scrollbarWidth: 'thin'}}>
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            style={{animationDelay: `${index * 0.1}s`}}
          >
            <div className={`max-w-xs lg:max-w-md ${
              message.sender_type === 'user' 
                ? 'order-2' 
                : 'order-1'
            }`}>
              <Card className={`p-4 relative overflow-hidden ${
                message.sender_type === 'user' 
                  ? 'glow-button text-white ml-4' 
                  : 'glass-card text-white mr-4 border-pink-500/20'
              }`}>
                <div className="relative z-10">
                  <p className="text-lg leading-relaxed" style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textRendering: 'optimizeLegibility'
                  }}>
                    {message.content}
                  </p>
                  <p className="text-xs opacity-70 mt-3 flex items-center justify-end">
                    {new Date(message.created_at).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                    {message.sender_type === 'user' && (
                      <span className="ml-2 text-green-400">✓✓</span>
                    )}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fadeIn">
            <div className="max-w-xs">
              <Card className="glass-card p-4 mr-4 border-pink-500/20">
                <div className="flex items-center space-x-2">
                  <img 
                    src={girlfriend.avatar_url} 
                    alt={girlfriend.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-gray-400 text-sm">{girlfriend.name} is typing...</span>
                </div>
              </Card>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="relative z-50 p-6 glass-card border-t border-pink-500/20">
        <form onSubmit={sendMessage} className="flex space-x-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${girlfriend.name}... 💕`}
            className="flex-1 text-lg p-4 bg-black/50 border-pink-500/30 text-white placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
          />
          <Button 
            type="submit"
            disabled={!newMessage.trim()}
            className="glow-button px-6 py-4 text-white hover:scale-105 transition-all duration-300"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
        <p className="text-gray-400 text-sm mt-2 text-center">
          <Crown className="inline h-4 w-4 mr-1" />
          Premium features unlock deeper conversations
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
