
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume } from 'lucide-react';

interface VideoPlayerProps {
  roomId: string;
  username: string;
  onReaction: (emoji: string) => void;
}

const VideoPlayer = ({ roomId, username, onReaction }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Placeholder video - in real app this would be user-selected
  const videoUrl = "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4";

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      // In real app: emit play/pause event to sync with partner
      console.log(`${username} ${isPlaying ? 'paused' : 'played'} video in room ${roomId}`);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const reactions = ['❤️', '😂', '😍', '😢', '👏'];

  return (
    <div className="relative bg-black rounded-lg overflow-hidden cinema-glow">
      {/* Video Container */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=675&fit=crop"
        />
        
        {/* Video Overlay Controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
          <div className="w-full p-4 text-white">
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-1">
                <div 
                  className="bg-cinema-red h-1 rounded-full transition-all duration-300"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  onClick={togglePlay}
                  size="sm"
                  className="bg-cinema-red hover:bg-cinema-red/80 w-10 h-10 rounded-full p-0"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Volume className="w-4 h-4" />
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={(e) => {
                      const newVolume = parseFloat(e.target.value);
                      setVolume(newVolume);
                      if (videoRef.current) {
                        videoRef.current.volume = newVolume;
                      }
                    }}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Room Info */}
              <div className="text-right">
                <div className="text-sm text-white/80">Room: {roomId}</div>
                <div className="text-xs text-cinema-gold">{username}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reaction Buttons */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        {reactions.map((emoji) => (
          <Button
            key={emoji}
            onClick={() => onReaction(emoji)}
            className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 text-xl border-2 border-cinema-gold/30 hover:border-cinema-gold transition-all duration-300"
          >
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
