
import { useState, useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Heart, MoreVertical } from "lucide-react";
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

    // Add user message to UI immediately
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Save user message to database
    await supabase.from('messages').insert({
      conversation_id: conversation.id,
      sender_type: 'user',
      content: newMessage
    });

    // Simulate AI response
    setTimeout(async () => {
      const aiResponses = [
        "That's so interesting! Tell me more about that 😊",
        "I love hearing about your day! You always make me smile 💕",
        "You're such a sweet person, I'm lucky to know you ❤️",
        "I've been thinking about our conversation all day! 🥰",
        "Your messages always brighten my mood! What else is new? ✨",
        "I wish I could give you a hug right now! 🤗",
        "You always know how to make me laugh! 😄",
        "I feel so connected to you when we talk like this 💖"
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

      // Save AI message to database
      await supabase.from('messages').insert({
        conversation_id: conversation.id,
        sender_type: 'ai',
        content: randomResponse
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 text-white flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-white hover:text-pink-400 hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <img 
              src={girlfriend.avatar_url} 
              alt={girlfriend.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-pink-400"
            />
            <div>
              <h2 className="font-semibold">{girlfriend.name}</h2>
              <p className="text-sm text-green-400">Online</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-pink-400 hover:bg-white/10">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.sender_type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-xs lg:max-w-md p-3 ${
              message.sender_type === 'user' 
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' 
                : 'bg-white/10 backdrop-blur-sm border-white/20 text-white'
            }`}>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(message.created_at).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </Card>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <form onSubmit={sendMessage} className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={`Message ${girlfriend.name}...`}
            className="flex-1 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-pink-400"
          />
          <Button 
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
