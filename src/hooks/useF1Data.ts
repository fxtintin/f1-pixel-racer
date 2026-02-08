import { useState, useEffect } from 'react';
import type { 
  Race, 
  RaceResult, 
  DriverStanding, 
  ConstructorStanding 
} from '@/types/f1';

const API_BASE = 'https://api.jolpi.ca/ergast/f1';

// Fetch all races for a season
export function useRaces(season: string) {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!season) return;
    
    const fetchRaces = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/${season}.json`);
        if (!response.ok) throw new Error('Failed to fetch races');
        const data = await response.json();
        setRaces(data.MRData.RaceTable.Races || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, [season]);

  return { races, loading, error };
}

// Fetch race results
export function useRaceResults(season: string, round: string) {
  const [results, setResults] = useState<RaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!season || !round) return;
    
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/${season}/${round}/results.json`);
        if (!response.ok) throw new Error('Failed to fetch results');
        const data = await response.json();
        const race = data.MRData.RaceTable.Races?.[0];
        setResults(race?.Results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [season, round]);

  return { results, loading, error };
}

// Fetch driver standings
export function useDriverStandings(season: string, round?: string) {
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!season) return;
    
    const fetchStandings = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${API_BASE}/${season}/driverStandings.json`;
        if (round) {
          url = `${API_BASE}/${season}/${round}/driverStandings.json`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch driver standings');
        const data = await response.json();
        const standingsList = data.MRData.StandingsTable.StandingsLists?.[0];
        setStandings(standingsList?.DriverStandings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [season, round]);

  return { standings, loading, error };
}

// Fetch constructor standings
export function useConstructorStandings(season: string, round?: string) {
  const [standings, setStandings] = useState<ConstructorStanding[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!season) return;
    
    const fetchStandings = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${API_BASE}/${season}/constructorStandings.json`;
        if (round) {
          url = `${API_BASE}/${season}/${round}/constructorStandings.json`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch constructor standings');
        const data = await response.json();
        const standingsList = data.MRData.StandingsTable.StandingsLists?.[0];
        setStandings(standingsList?.ConstructorStandings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [season, round]);

  return { standings, loading, error };
}

// Preload data for 2022-2025 (ground effect era)
export const GROUND_EFFECT_YEARS = ['2022', '2023', '2024', '2025'];
