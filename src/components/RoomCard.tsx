
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Heart, Play } from 'lucide-react';

interface RoomCardProps {
  type: 'create' | 'join';
  onAction: (roomId: string, username: string) => void;
}

const RoomCard = ({ type, onAction }: RoomCardProps) => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = () => {
    if (!username.trim()) return;
    
    if (type === 'create') {
      const newRoomId = Math.random().toString(36).substr(2, 8).toUpperCase();
      onAction(newRoomId, username);
    } else {
      if (!roomId.trim()) return;
      onAction(roomId, username);
    }
  };

  return (
    <Card className="p-8 bg-black/40 backdrop-blur-md border-cinema-red/30 cinema-glow hover:scale-105 transition-all duration-300">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-cinema-red/20 rounded-full mb-4">
          {type === 'create' ? (
            <Heart className="w-8 h-8 text-cinema-red" fill="currentColor" />
          ) : (
            <Play className="w-8 h-8 text-cinema-gold" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {type === 'create' ? 'Create Your Cinema' : 'Join Your Partner'}
        </h3>
        <p className="text-white/70">
          {type === 'create' 
            ? 'Start a new romantic movie session' 
            : 'Enter your room code to connect'
          }
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Your Name
          </label>
          <Input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black/30 border-cinema-red/30 text-white placeholder:text-white/50 focus:border-cinema-red"
          />
        </div>

        {type === 'join' && (
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Room Code
            </label>
            <Input
              type="text"
              placeholder="Enter room code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              className="bg-black/30 border-cinema-red/30 text-white placeholder:text-white/50 focus:border-cinema-red"
            />
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!username.trim() || (type === 'join' && !roomId.trim())}
          className="w-full bg-gradient-to-r from-cinema-red to-cinema-gold hover:from-cinema-red/80 hover:to-cinema-gold/80 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          {type === 'create' ? 'Create Room' : 'Join Room'}
        </Button>
      </div>
    </Card>
  );
};

export default RoomCard;
