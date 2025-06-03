
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Header from '@/components/Header';
import RoomCard from '@/components/RoomCard';
import CinemaRoom from '@/components/CinemaRoom';
import { Heart, Play } from 'lucide-react';

const Index = () => {
  const [currentRoom, setCurrentRoom] = useState<{ roomId: string; username: string } | null>(null);

  const handleRoomAction = (roomId: string, username: string) => {
    setCurrentRoom({ roomId, username });
    console.log(`${username} ${currentRoom ? 'joined' : 'created'} room: ${roomId}`);
  };

  const handleLeaveRoom = () => {
    setCurrentRoom(null);
  };

  if (currentRoom) {
    return (
      <CinemaRoom 
        roomId={currentRoom.roomId}
        username={currentRoom.username}
        onLeave={handleLeaveRoom}
      />
    );
  }

  return (
    <div className="min-h-screen cinema-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cinema-red/20 rounded-full mb-6 pulse-glow">
            <Heart className="w-10 h-10 text-cinema-red animate-pulse-heart" fill="currentColor" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in">
            Your Private
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cinema-red to-cinema-gold"> Cinema</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-fade-in">
            Create magical movie moments together, no matter the distance. 
            Synchronized viewing, live reactions, and intimate conversations in your own virtual cinema hall.
          </p>
          
          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <Card className="p-6 bg-black/30 backdrop-blur-md border-cinema-red/30 text-center hover:scale-105 transition-all duration-300">
              <Play className="w-8 h-8 text-cinema-gold mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Sync Playback</h3>
              <p className="text-white/70 text-sm">Watch together in perfect sync</p>
            </Card>
            <Card className="p-6 bg-black/30 backdrop-blur-md border-cinema-red/30 text-center hover:scale-105 transition-all duration-300">
              <Heart className="w-8 h-8 text-cinema-red mx-auto mb-3" fill="currentColor" />
              <h3 className="text-white font-semibold mb-2">Live Reactions</h3>
              <p className="text-white/70 text-sm">Share emotions in real-time</p>
            </Card>
            <Card className="p-6 bg-black/30 backdrop-blur-md border-cinema-red/30 text-center hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 text-cinema-gold mx-auto mb-3 text-2xl">💬</div>
              <h3 className="text-white font-semibold mb-2">Intimate Chat</h3>
              <p className="text-white/70 text-sm">Private conversations during movies</p>
            </Card>
          </div>
        </div>

        {/* Room Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <RoomCard type="create" onAction={handleRoomAction} />
          <RoomCard type="join" onAction={handleRoomAction} />
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-white/60 text-sm">
            Made with ❤️ for couples who love movies together
          </p>
        </div>
      </main>

      {/* Floating Hearts Background */}
      <div className="floating-hearts">
        {[...Array(8)].map((_, i) => (
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

export default Index;
