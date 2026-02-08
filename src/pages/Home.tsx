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

        {/* Animated Car */}
        <motion.div
          className="relative h-24 w-48"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            viewBox="0 0 120 60"
            className="h-full w-full"
            fill="none"
          >
            {/* Car Body */}
            <rect x="20" y="25" width="70" height="15" fill="#e10600" />
            <rect x="10" y="30" width="15" height="8" fill="#e10600" />
            <rect x="90" y="28" width="20" height="10" fill="#e10600" />
            {/* Wheels */}
            <rect x="25" y="38" width="12" height="8" fill="#334155" />
            <rect x="75" y="38" width="12" height="8" fill="#334155" />
            {/* Driver */}
            <rect x="85" y="18" width="8" height="8" fill="#00d9ff" />
            {/* Spoiler */}
            <rect x="15" y="20" width="5" height="15" fill="#8b0000" />
            <rect x="10" y="20" width="15" height="3" fill="#8b0000" />
            {/* Speed Lines */}
            <motion.rect
              x="0" y="32" width="10" height="2" fill="#00d9ff"
              animate={{ opacity: [0, 1, 0], x: [-5, -10] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
            <motion.rect
              x="5" y="38" width="8" height="2" fill="#00d9ff"
              animate={{ opacity: [0, 1, 0], x: [-5, -10] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
