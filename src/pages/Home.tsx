import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { YearSelector } from '@/components/ui/YearSelector';
import { RaceCard } from '@/components/race/RaceCard';
import { RaceResults } from '@/components/race/RaceResults';
import { DriverStandings } from '@/components/standings/DriverStandings';
import { ConstructorStandings } from '@/components/standings/ConstructorStandings';
import { useRaces } from '@/hooks/useF1Data';
import { Trophy, Calendar, Flag, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ViewMode } from '@/types/f1';

export function Home() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedRound, setSelectedRound] = useState<string>('1');
  const [viewMode, setViewMode] = useState<ViewMode>('races');
  const { races } = useRaces(selectedYear);

  // Get selected race info
  const selectedRace = races.find(r => r.round === selectedRound);

  return (
    <div className="min-h-screen bg-pixel-bg">
      <Header currentView={viewMode} onViewChange={setViewMode} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <HeroSection />

        {/* Year Selector */}
        <section className="mb-8">
          <YearSelector
            selectedYear={selectedYear}
            onSelect={(year) => {
              setSelectedYear(year);
              setSelectedRound('1');
            }}
          />
        </section>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'races' && (
            <motion.div
              key="races"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              {/* Race List */}
              <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-pixel text-pixel text-pixel-text">
                    RACES
                  </h2>
                  <span className="font-terminal text-lg text-pixel-cyan">
                    {races.length} ROUNDS
                  </span>
                </div>
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {races.map((race) => (
                    <RaceCard
                      key={race.round}
                      race={race}
                      isSelected={selectedRound === race.round}
                      onSelect={() => setSelectedRound(race.round)}
                    />
                  ))}
                </div>
              </div>

              {/* Race Results */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-pixel text-pixel text-pixel-text">
                    {selectedRace ? (
                      <span className="flex items-center gap-2">
                        <Flag className="h-5 w-5 text-f1-red" />
                        {selectedRace.raceName.replace('Grand Prix', 'GP')}
                      </span>
                    ) : (
                      'SELECT A RACE'
                    )}
                  </h2>
                  {selectedRace && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const prev = parseInt(selectedRound) - 1;
                          if (prev >= 1) setSelectedRound(prev.toString());
                        }}
                        disabled={parseInt(selectedRound) <= 1}
                        className="p-2 border-2 border-pixel-border text-pixel-text-dim hover:border-pixel-cyan hover:text-pixel-cyan disabled:opacity-30"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <span className="font-terminal text-lg text-pixel-text">
                        Round {selectedRound}
                      </span>
                      <button
                        onClick={() => {
                          const next = parseInt(selectedRound) + 1;
                          if (next <= races.length) setSelectedRound(next.toString());
                        }}
                        disabled={parseInt(selectedRound) >= races.length}
                        className="p-2 border-2 border-pixel-border text-pixel-text-dim hover:border-pixel-cyan hover:text-pixel-cyan disabled:opacity-30"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
                <RaceResults season={selectedYear} round={selectedRound} />
              </div>
            </motion.div>
          )}

          {viewMode === 'drivers' && (
            <motion.div
              key="drivers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-pixel text-pixel text-pixel-text flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-f1-red" />
                  DRIVER STANDINGS {selectedYear}
                </h2>
              </div>
              <DriverStandings season={selectedYear} />
            </motion.div>
          )}

          {viewMode === 'constructors' && (
            <motion.div
              key="constructors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-pixel text-pixel text-pixel-text flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-f1-red" />
                  CONSTRUCTOR STANDINGS {selectedYear}
                </h2>
              </div>
              <ConstructorStandings season={selectedYear} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-12 border-t-4 border-pixel-border pt-6 text-center">
          <p className="font-pixel text-pixel-xs text-pixel-text-dim">
            F1 PIXEL RACER • GROUND EFFECT ERA 2022-2025
          </p>
          <p className="font-terminal text-sm text-pixel-text-dim mt-2">
            Data provided by jolpica-f1 API • Not affiliated with Formula 1
          </p>
        </footer>
      </main>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative mb-8 overflow-hidden border-4 border-f1-red bg-pixel-surface p-6 md:p-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="heroGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e10600" strokeWidth="2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-pixel text-pixel-xl md:text-pixel-2xl text-f1-red mb-2"
          >
            GROUND EFFECT ERA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-terminal text-xl md:text-2xl text-pixel-text"
          >
            2022 - 2025 Season Data
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 mt-4 justify-center md:justify-start"
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-pixel-cyan" />
              <span className="font-terminal text-lg text-pixel-text-dim">Race Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-pixel-gold" />
              <span className="font-terminal text-lg text-pixel-text-dim">Championships</span>
            </div>
          </motion.div>
        </div>

        {/* Animated Car - Red Bull Style */}
        <motion.div
          className="relative h-28 w-56"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 512 512"
            className="h-full w-full"
            fill="none"
          >
            {/* Main Body - Red Bull Dark Blue */}
            <path fill="#1e3a8a" d="M355.975 292.25a24.82 24.82 0 1 0 24.82-24.81 24.84 24.84 0 0 0-24.82 24.81zm-253-24.81a24.81 24.81 0 1 1-24.82 24.81 24.84 24.84 0 0 1 24.81-24.81zm-76.67-71.52h67.25l-13.61 49.28 92-50.28h57.36l1.26 34.68 32 14.76 11.74-14.44h15.62l3.16 16c137.56-13 192.61 29.17 192.61 29.17s-7.52 5-25.93 8.39c-3.88 3.31-3.66 14.44-3.66 14.44h24.2v16h-52v-27.48c-1.84.07-4.45.41-7.06.47a40.81 40.81 0 1 0-77.25 23h-204.24a40.81 40.81 0 1 0-77.61-17.67c0 1.24.06 2.46.17 3.67h-36z"/>
            {/* Red Bull Accent - Yellow/Red Highlight */}
            <path fill="#fbbf24" d="M102.975 215.92l15-5 5 10-20-5z"/>
            <path fill="#dc2626" d="M380.975 230l25 5-5 10-20-15z"/>
            {/* Wheels */}
            <circle cx="102.975" cy="292.25" r="18" fill="#1f2937"/>
            <circle cx="102.975" cy="292.25" r="8" fill="#dc2626"/>
            <circle cx="380.975" cy="292.25" r="18" fill="#1f2937"/>
            <circle cx="380.975" cy="292.25" r="8" fill="#dc2626"/>
            {/* Speed Lines */}
            <motion.rect
              x="20" y="240" width="40" height="4" fill="#fbbf24"
              animate={{ opacity: [0, 1, 0], x: [-20, -40] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            />
            <motion.rect
              x="30" y="260" width="30" height="3" fill="#fbbf24"
              animate={{ opacity: [0, 1, 0], x: [-15, -35] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.2 }}
            />
            <motion.rect
              x="10" y="280" width="35" height="3" fill="#fbbf24"
              animate={{ opacity: [0, 1, 0], x: [-20, -40] }}
              transition={{ duration: 0.4, repeat: Infinity, delay: 0.1 }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
