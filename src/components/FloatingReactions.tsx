
import { useEffect, useState } from 'react';

interface Reaction {
  id: string;
  emoji: string;
  x: number;
  y: number;
}

interface FloatingReactionsProps {
  reactions: Array<{ emoji: string; timestamp: Date; username: string }>;
}

const FloatingReactions = ({ reactions }: FloatingReactionsProps) => {
  const [activeReactions, setActiveReactions] = useState<Reaction[]>([]);

  useEffect(() => {
    if (reactions.length > 0) {
      const latestReaction = reactions[reactions.length - 1];
      const newReaction: Reaction = {
        id: Date.now().toString(),
        emoji: latestReaction.emoji,
        x: Math.random() * 80 + 10, // Random position between 10% and 90%
        y: Math.random() * 60 + 20  // Random position between 20% and 80%
      };

      setActiveReactions(prev => [...prev, newReaction]);

      // Remove reaction after animation
      setTimeout(() => {
        setActiveReactions(prev => prev.filter(r => r.id !== newReaction.id));
      }, 2000);
    }
  }, [reactions]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {activeReactions.map((reaction) => (
        <div
          key={reaction.id}
          className="absolute text-4xl reaction-float"
          style={{
            left: `${reaction.x}%`,
            top: `${reaction.y}%`,
          }}
        >
          {reaction.emoji}
        </div>
      ))}
    </div>
  );
};

export default FloatingReactions;
