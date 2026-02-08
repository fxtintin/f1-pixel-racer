import { motion } from 'framer-motion';
import { Trophy, Car, Star } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useConstructorStandings } from '@/hooks/useF1Data';
import { getTeamColor, getCarImage, getCarImageByName } from '@/utils/teams';
import { cn } from '@/utils/cn';

interface ConstructorStandingsProps {
  season: string;
  round?: string;
}

export function ConstructorStandings({ season, round }: ConstructorStandingsProps) {
  const { standings, loading, error } = useConstructorStandings(season, round);

  if (loading) return <LoadingSpinner text="LOADING STANDINGS..." />;
  if (error) return <ErrorMessage message={error} />;
  if (standings.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {/* Constructor Leader Banner with Car Image */}
      {standings[0] && (
        <LeaderBanner standing={standings[0]} season={season} />
      )}

      {/* Standings Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {standings.map((standing, index) => (
          <ConstructorCard
            key={standing.Constructor.constructorId}
            standing={standing}
            index={index}
            season={season}
          />
        ))}
      </div>
    </div>
  );
}

function LeaderBanner({ standing, season }: { standing: any; season: string }) {
  const teamColor = getTeamColor(standing.Constructor.constructorId);
  // Try to get image by constructor ID first, then by name with year
  const carImage = getCarImage(standing.Constructor.constructorId, season) || 
                   getCarImageByName(standing.Constructor.name, season);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative overflow-hidden border-4 border-pixel-gold bg-pixel-surface"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-pixel-gold via-transparent to-pixel-gold" />
      </div>

      <div className="relative flex flex-col md:flex-row">
        {/* Car Image */}
        <div className="relative h-48 w-full md:w-1/2 bg-gradient-to-br from-pixel-bg to-pixel-surface flex items-center justify-center">
          {carImage ? (
            <img
              src={carImage}
              alt={`${standing.Constructor.name} Car`}
              className="h-full w-full object-contain p-4"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          ) : (
            <div className="flex flex-col items-center text-pixel-text-dim">
              <Car className="h-16 w-16 mb-2" />
              <span className="font-pixel text-pixel-xs">NO IMAGE</span>
            </div>
          )}
          {/* Color stripe */}
          <div
            className="absolute left-0 top-0 bottom-0 w-2"
            style={{ backgroundColor: teamColor }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8 text-pixel-gold" />
            <span className="font-pixel text-pixel-xs text-pixel-text-dim">
              CHAMPIONSHIP LEADER
            </span>
          </div>
          <h2
            className="font-terminal text-3xl md:text-4xl mb-2"
            style={{ color: teamColor }}
          >
            {standing.Constructor.name}
          </h2>
          <div className="flex items-center gap-6">
            <div>
              <p className="font-pixel text-pixel-xs text-pixel-text-dim">POINTS</p>
              <p className="font-terminal text-3xl text-pixel-gold">{standing.points}</p>
            </div>
            <div>
              <p className="font-pixel text-pixel-xs text-pixel-text-dim">WINS</p>
              <p className="font-terminal text-3xl text-pixel-text">{standing.wins}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ConstructorCard({ standing, index, season }: { standing: any; index: number; season: string }) {
  const teamColor = getTeamColor(standing.Constructor.constructorId);
  // Try to get image by constructor ID first, then by name with year
  const carImage = getCarImage(standing.Constructor.constructorId, season) || 
                   getCarImageByName(standing.Constructor.name, season);
  const position = parseInt(standing.position);

  const positionColors: { [key: number]: string } = {
    1: 'border-pixel-gold',
    2: 'border-pixel-silver',
    3: 'border-[#cd7f32]',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'relative overflow-hidden border-4 bg-pixel-surface',
        positionColors[position] || 'border-pixel-border'
      )}
    >
      {/* Position Badge */}
      <div
        className="absolute left-0 top-0 px-3 py-2 font-pixel text-pixel text-white"
        style={{ backgroundColor: position <= 3 ? teamColor : '#334155' }}
      >
        #{standing.position}
      </div>

      {/* Car Image Area */}
      <div className="relative h-32 bg-pixel-bg flex items-center justify-center">
        {carImage ? (
          <img
            src={carImage}
            alt={`${standing.Constructor.name} Car`}
            className="h-full w-full object-contain p-4"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <Car className="h-12 w-12 text-pixel-border" />
        )}
      </div>

      {/* Team Info */}
      <div className="p-4">
        <h3
          className="font-terminal text-xl mb-3 truncate"
          style={{ color: teamColor }}
        >
          {standing.Constructor.name}
        </h3>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-pixel text-pixel-xs text-pixel-text-dim">POINTS</p>
            <p className="font-terminal text-2xl text-pixel-text">{standing.points}</p>
          </div>
          <div className="text-right">
            <p className="font-pixel text-pixel-xs text-pixel-text-dim">WINS</p>
            <div className="flex items-center gap-1">
              <Star className={cn(
                'h-4 w-4',
                parseInt(standing.wins) > 0 ? 'text-pixel-gold' : 'text-pixel-border'
              )} />
              <p className="font-terminal text-2xl text-pixel-text">{standing.wins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Color bar at bottom */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: teamColor }}
      />
    </motion.div>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="border-4 border-f1-red bg-pixel-surface p-8 text-center">
      <p className="font-pixel text-pixel text-f1-red mb-2">ERROR</p>
      <p className="font-terminal text-lg text-pixel-text">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="border-4 border-pixel-border bg-pixel-surface p-8 text-center">
      <p className="font-pixel text-pixel text-pixel-text-dim">NO STANDINGS AVAILABLE</p>
      <p className="font-terminal text-base text-pixel-text-dim mt-2">
        Constructor standings for this season are not available yet
      </p>
    </div>
  );
}
