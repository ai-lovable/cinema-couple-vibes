
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';

interface Message {
  id: string;
  username: string;
  text: string;
  timestamp: Date;
  type: 'message' | 'reaction';
}

interface ChatBoxProps {
  roomId: string;
  username: string;
  reactions: Array<{ emoji: string; timestamp: Date; username: string }>;
}

const ChatBox = ({ roomId, username, reactions }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      username: 'System',
      text: `Welcome to Cinema Ghar! Room ${roomId} is ready for movie night! 🍿`,
      timestamp: new Date(),
      type: 'message'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, reactions]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      username,
      text: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // In real app: emit message to partner via WebSocket
    console.log('Sending message:', message);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-full bg-black/40 backdrop-blur-md border-cinema-red/30 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-cinema-red/30">
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5 text-cinema-red" fill="currentColor" />
          <h3 className="text-white font-semibold">Movie Chat</h3>
          <div className="flex-1" />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-96">
        {messages.map((message) => (
          <div key={message.id} className="space-y-1">
            <div className="flex items-center space-x-2 text-xs">
              <span className={`font-medium ${
                message.username === 'System' ? 'text-cinema-gold' :
                message.username === username ? 'text-cinema-red' : 'text-white'
              }`}>
                {message.username}
              </span>
              <span className="text-white/50">{formatTime(message.timestamp)}</span>
            </div>
            <div className={`p-3 rounded-lg max-w-xs ${
              message.username === username 
                ? 'bg-cinema-red/20 ml-auto text-right' 
                : message.username === 'System'
                ? 'bg-cinema-gold/20 text-center'
                : 'bg-white/10'
            }`}>
              <p className="text-white text-sm">{message.text}</p>
            </div>
          </div>
        ))}

        {/* Live Reactions */}
        {reactions.map((reaction, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            <span className="text-cinema-gold font-medium">{reaction.username}</span>
            <span className="text-white/50">{formatTime(reaction.timestamp)}</span>
            <span className="text-lg">{reaction.emoji}</span>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-cinema-red/30">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Share your thoughts..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="bg-black/30 border-cinema-red/30 text-white placeholder:text-white/50 focus:border-cinema-red"
          />
          <Button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className="bg-cinema-red hover:bg-cinema-red/80 text-white px-4"
          >
            <Heart className="w-4 h-4" fill="currentColor" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBox;
