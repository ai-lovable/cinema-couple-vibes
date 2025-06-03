
import { Heart } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative z-10 flex items-center justify-between p-6 bg-black/20 backdrop-blur-sm border-b border-cinema-red/30">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Heart className="w-8 h-8 text-cinema-red animate-pulse-heart" fill="currentColor" />
          <div className="absolute inset-0 w-8 h-8 bg-cinema-red/20 rounded-full animate-ping" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Cinema Ghar</h1>
          <p className="text-sm text-cinema-gold">Watch Together, Feel Together</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2 text-white/80">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm">Ready to Connect</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
