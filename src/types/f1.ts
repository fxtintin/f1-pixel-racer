// F1 API Types based on Ergast/jolpica-f1 API

export interface Race {
  season: string;
  round: string;
  raceName: string;
  date: string;
  time: string;
  url: string;
  Circuit: Circuit;
  Results?: RaceResult[];
  FirstPractice?: Session;
  SecondPractice?: Session;
  ThirdPractice?: Session;
  Qualifying?: Session;
  Sprint?: Session;
  SprintQualifying?: Session;
}

export interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

export interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface Session {
  date: string;
  time: string;
}

export interface RaceResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: Driver;
  Constructor: Constructor;
  grid: string;
  laps: string;
  status: string;
  Time?: ResultTime;
  FastestLap?: FastestLap;
}

export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface ResultTime {
  millis: string;
  time: string;
}

export interface FastestLap {
  rank: string;
  lap: string;
  Time: {
    time: string;
  };
  AverageSpeed?: {
    units: string;
    speed: string;
  };
}

export interface DriverStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface ConstructorStanding {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Constructor: Constructor;
}

export interface Season {
  season: string;
  url: string;
}

// Team configuration for images and colors
export interface TeamConfig {
  id: string;
  name: string;
  color: string;
  carImage?: string;
  logoImage?: string;
  years: {
    [year: string]: {
      drivers: string[];
      carImage?: string;
    };
  };
}

export type ViewMode = 'races' | 'drivers' | 'constructors';
