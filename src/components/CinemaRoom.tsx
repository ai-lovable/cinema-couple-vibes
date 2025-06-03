
import { useState } from 'react';
import Header from './Header';
import VideoPlayer from './VideoPlayer';
import ChatBox from './ChatBox';
import FloatingReactions from './FloatingReactions';

interface CinemaRoomProps {
  roomId: string;
  username: string;
  onLeave: () => void;
}

const CinemaRoom = ({ roomId, username, onLeave }: CinemaRoomProps) => {
  const [reactions, setReactions] = useState<Array<{ emoji: string; timestamp: Date; username: string }>>([]);

  const handleReaction = (emoji: string) => {
    const newReaction = {
      emoji,
      timestamp: new Date(),
      username
    };
    setReactions(prev => [...prev, newReaction]);
    
    // In real app: emit reaction to partner via WebSocket
    console.log('Reaction sent:', newReaction);
  };

  return (
    <div className="min-h-screen cinema-bg">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Video Player - Takes up 2/3 on desktop */}
          <div className="lg:col-span-2">
            <VideoPlayer 
              roomId={roomId}
              username={username}
              onReaction={handleReaction}
            />
          </div>

          {/* Chat Box - Takes up 1/3 on desktop */}
          <div className="lg:col-span-1">
            <ChatBox 
              roomId={roomId}
              username={username}
              reactions={reactions}
            />
          </div>
        </div>

        {/* Leave Room Button */}
        <div className="fixed bottom-4 left-4">
          <button
            onClick={onLeave}
            className="bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm border border-cinema-red/30 transition-all duration-300"
          >
            Leave Room
          </button>
        </div>
      </div>

      {/* Floating Reactions */}
      <FloatingReactions reactions={reactions} />

      {/* Ambient Hearts Background */}
      <div className="floating-hearts">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            💕
          </div>
        ))}
      </div>
    </div>
  );
};

export default CinemaRoom;
