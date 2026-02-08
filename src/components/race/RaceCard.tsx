import { motion } from 'framer-motion';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';
import { PixelButton } from '@/components/ui/PixelButton';
import { FlagEmoji } from '@/components/ui/FlagEmoji';
import type { Race } from '@/types/f1';
import { cn } from '@/utils/cn';
import { getCircuitFlag } from '@/utils/flags';

interface RaceCardProps {
  race: Race;
  isSelected: boolean;
  onSelect: () => void;
}

export function RaceCard({ race, isSelected, onSelect }: RaceCardProps) {
  const raceDate = new Date(`${race.date}T${race.time || '00:00:00Z'}`);
  const formattedDate = raceDate.toLocaleDateString('zh-CN', {
    month: 'short',
    day: 'numeric',
  });

  // Get flag for the circuit
  const flagInfo = getCircuitFlag(race.Circuit.circuitId);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'relative overflow-hidden border-4 bg-pixel-surface transition-all',
        isSelected
          ? 'border-f1-red shadow-glow'
          : 'border-pixel-border hover:border-pixel-cyan'
      )}
    >
      {/* Round Badge */}
      <div className="absolute right-0 top-0 bg-f1-red px-3 py-1">
        <span className="font-pixel text-pixel-xs text-white">
          R{race.round}
        </span>
      </div>

      {/* Track Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <pattern id={`grid-${race.round}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill={`url(#grid-${race.round})`} />
        </svg>
      </div>

      <div className="relative p-4">
        {/* Race Name with Flag */}
        <h3 className="font-terminal text-xl text-pixel-text mb-1 pr-16 flex items-center gap-2">
          {race.raceName.replace('Grand Prix', 'GP')}
          {flagInfo && (
            <FlagEmoji 
              countryCode={flagInfo.countryCode}
              imagePath={flagInfo.imagePath}
              size="md"
            />
          )}
        </h3>

        {/* Circuit Info */}
        <div className="flex items-center gap-2 text-pixel-text-dim mb-3">
          <MapPin className="h-4 w-4" />
          <span className="font-terminal text-base">{race.Circuit.circuitName}</span>
          {flagInfo && (
            <span className="font-pixel text-pixel-xs text-pixel-cyan ml-1">
              ({flagInfo.country})
            </span>
          )}
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-pixel-cyan mb-4">
          <Calendar className="h-4 w-4" />
          <span className="font-pixel text-pixel-xs">{formattedDate}</span>
        </div>

        {/* Select Button */}
        <PixelButton
          variant={isSelected ? 'primary' : 'secondary'}
          size="sm"
          onClick={onSelect}
          className="w-full"
        >
          {isSelected ? 'SELECTED' : 'VIEW RESULTS'}
          <ChevronRight className="ml-2 inline h-4 w-4" />
        </PixelButton>
      </div>
    </motion.div>
  );
}
