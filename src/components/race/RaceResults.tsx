import { motion } from 'framer-motion';
import { Trophy, Clock, Timer } from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useRaceResults } from '@/hooks/useF1Data';
import { getTeamColor } from '@/utils/teams';
import { cn } from '@/utils/cn';

interface RaceResultsProps {
  season: string;
  round: string;
}

export function RaceResults({ season, round }: RaceResultsProps) {
  const { results, loading, error } = useRaceResults(season, round);

  if (loading) return <LoadingSpinner text="LOADING RESULTS..." />;
  if (error) return <ErrorMessage message={error} />;
  if (results.length === 0) return <EmptyState />;

  // Find fastest lap
  const fastestLap = results.find(r => r.FastestLap?.rank === '1');

  return (
    <div className="space-y-4">
      {/* Fastest Lap Banner */}
      {fastestLap && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-4 border-pixel-gold bg-pixel-surface p-4"
        >
          <div className="flex items-center gap-3">
            <Timer className="h-6 w-6 text-pixel-gold" />
            <div>
              <p className="font-pixel text-pixel-xs text-pixel-text-dim">
                FASTEST LAP
              </p>
              <p className="font-terminal text-xl text-pixel-gold">
                {fastestLap.Driver.code} - {fastestLap.FastestLap?.Time.time} (Lap {fastestLap.FastestLap?.lap})
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results Table */}
      <div className="border-4 border-pixel-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-pixel-border">
            <tr>
              <th className="px-4 py-3 text-left font-pixel text-pixel-xs text-pixel-text">POS</th>
              <th className="px-4 py-3 text-left font-pixel text-pixel-xs text-pixel-text">DRIVER</th>
              <th className="px-4 py-3 text-left font-pixel text-pixel-xs text-pixel-text hidden sm:table-cell">TEAM</th>
              <th className="px-4 py-3 text-left font-pixel text-pixel-xs text-pixel-text">TIME</th>
              <th className="px-4 py-3 text-right font-pixel text-pixel-xs text-pixel-text">PTS</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <ResultRow key={result.Driver.driverId} result={result} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ResultRow({ result, index }: { result: any; index: number }) {
  const teamColor = getTeamColor(result.Constructor.constructorId);
  const position = parseInt(result.position);
  
  const positionColors: { [key: number]: string } = {
    1: 'text-pixel-gold',
    2: 'text-pixel-silver',
    3: 'text-[#cd7f32]',
  };

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        'border-b-2 border-pixel-border last:border-b-0',
        index % 2 === 0 ? 'bg-pixel-bg' : 'bg-pixel-surface'
      )}
    >
      {/* Position */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className={cn(
            'font-pixel text-pixel',
            positionColors[position] || 'text-pixel-text'
          )}>
            {result.position}
          </span>
          {position <= 3 && (
            <Trophy className={cn(
              'h-4 w-4',
              position === 1 && 'text-pixel-gold',
              position === 2 && 'text-pixel-silver',
              position === 3 && 'text-[#cd7f32]'
            )} />
          )}
        </div>
      </td>

      {/* Driver */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div
            className="h-8 w-1 rounded-full"
            style={{ backgroundColor: teamColor }}
          />
          <div>
            <p className="font-terminal text-lg text-pixel-text leading-none">
              {result.Driver.code}
            </p>
            <p className="font-terminal text-sm text-pixel-text-dim">
              {result.Driver.givenName} {result.Driver.familyName}
            </p>
          </div>
        </div>
      </td>

      {/* Team */}
      <td className="px-4 py-3 hidden sm:table-cell">
        <span
          className="font-terminal text-base"
          style={{ color: teamColor }}
        >
          {result.Constructor.name}
        </span>
      </td>

      {/* Time */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-pixel-cyan" />
          <span className="font-terminal text-base text-pixel-text">
            {result.Time?.time || result.status}
          </span>
        </div>
      </td>

      {/* Points */}
      <td className="px-4 py-3 text-right">
        <span className={cn(
          'font-pixel text-pixel',
          parseInt(result.points) > 0 ? 'text-f1-red' : 'text-pixel-text-dim'
        )}>
          {result.points}
        </span>
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
      <p className="font-pixel text-pixel text-pixel-text-dim">NO DATA AVAILABLE</p>
      <p className="font-terminal text-base text-pixel-text-dim mt-2">
        Results for this race are not available yet
      </p>
    </div>
  );
}
