import { motion } from 'framer-motion';
import { Trophy, TrendingUp, User } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useDriverStandings } from '@/hooks/useF1Data';
import { getTeamColor } from '@/utils/teams';
import { cn } from '@/utils/cn';

interface DriverStandingsProps {
  season: string;
  round?: string;
}

export function DriverStandings({ season, round }: DriverStandingsProps) {
  const { standings, loading, error } = useDriverStandings(season, round);

  if (loading) return <LoadingSpinner text="LOADING STANDINGS..." />;
  if (error) return <ErrorMessage message={error} />;
  if (standings.length === 0) return <EmptyState />;

  return (
    <div className="space-y-4">
      {/* Championship Leader Banner */}
      {standings[0] && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden border-4 border-pixel-gold bg-pixel-surface p-6"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-pixel-gold via-transparent to-pixel-gold" />
          </div>
          <div className="relative flex items-center gap-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-pixel-gold bg-pixel-bg">
              <Trophy className="h-8 w-8 text-pixel-gold" />
            </div>
            <div>
              <p className="font-pixel text-pixel-xs text-pixel-text-dim mb-1">
                CHAMPIONSHIP LEADER
              </p>
              <h2 className="font-terminal text-3xl text-pixel-gold">
                {standings[0].Driver.givenName} {standings[0].Driver.familyName}
              </h2>
              <p className="font-terminal text-xl text-pixel-text">
                {standings[0].points} POINTS • {standings[0].wins} WINS
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Standings Table */}
      <div className="border-4 border-pixel-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-pixel-border">
            <tr>
              <th className="px-4 py-3 text-left font-pixel text-pixel-xs text-pixel-text">POS</th>
              <th className="px-4 py-3 text-left font-pixel text-pixel-xs text-pixel-text">DRIVER</th>
              <th className="px-4 py-3 text-left font-pixel text-pixel-xs text-pixel-text hidden sm:table-cell">TEAM</th>
              <th className="px-4 py-3 text-center font-pixel text-pixel-xs text-pixel-text">WINS</th>
              <th className="px-4 py-3 text-right font-pixel text-pixel-xs text-pixel-text">PTS</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing, index) => (
              <StandingRow key={standing.Driver.driverId} standing={standing} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StandingRow({ standing, index }: { standing: any; index: number }) {
  const teamColor = getTeamColor(standing.Constructors[0]?.constructorId);
  const position = parseInt(standing.position);
  
  const positionColors: { [key: number]: string } = {
    1: 'text-pixel-gold',
    2: 'text-pixel-silver',
    3: 'text-[#cd7f32]',
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={cn(
        'border-b-2 border-pixel-border last:border-b-0',
        index % 2 === 0 ? 'bg-pixel-bg' : 'bg-pixel-surface',
        position === 1 && 'bg-pixel-gold/10'
      )}
    >
      {/* Position */}
      <td className="px-4 py-4">
        <span className={cn(
          'font-pixel text-pixel-lg',
          positionColors[position] || 'text-pixel-text'
        )}>
          {standing.position}
        </span>
      </td>

      {/* Driver */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-1.5 rounded-full"
            style={{ backgroundColor: teamColor }}
          />
          <div className="flex h-10 w-10 items-center justify-center border-2 border-pixel-border bg-pixel-bg">
            <User className="h-5 w-5 text-pixel-text-dim" />
          </div>
          <div>
            <p className="font-terminal text-xl text-pixel-text leading-none">
              {standing.Driver.code}
            </p>
            <p className="font-terminal text-sm text-pixel-text-dim">
              {standing.Driver.givenName} {standing.Driver.familyName}
            </p>
          </div>
        </div>
      </td>

      {/* Team */}
      <td className="px-4 py-4 hidden sm:table-cell">
        <span
          className="font-terminal text-lg"
          style={{ color: teamColor }}
        >
          {standing.Constructors[0]?.name}
        </span>
      </td>

      {/* Wins */}
      <td className="px-4 py-4 text-center">
        <span className={cn(
          'font-pixel text-pixel',
          parseInt(standing.wins) > 0 ? 'text-f1-red' : 'text-pixel-text-dim'
        )}>
          {standing.wins}
        </span>
      </td>

      {/* Points */}
      <td className="px-4 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <TrendingUp className={cn(
            'h-4 w-4',
            parseInt(standing.points) > 100 ? 'text-f1-red' : 'text-pixel-text-dim'
          )} />
          <span className="font-pixel text-pixel text-pixel-text">
            {standing.points}
          </span>
        </div>
      </td>
    </motion.tr>
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
        Standings for this season are not available yet
      </p>
    </div>
  );
}
