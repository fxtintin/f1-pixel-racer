import type { TeamConfig } from '@/types/f1';

// Team configurations with colors and image paths
export const teamConfigs: TeamConfig[] = [
  {
    id: 'red_bull',
    name: 'Red Bull Racing',
    color: '#1e41ff',
    carImage: '/teams/cars/redbull.png',
    logoImage: '/teams/logos/redbull.png',
    years: {
      '2022': { drivers: ['max_verstappen', 'perez'], carImage: '/teams/cars/redbull-2022.png' },
      '2023': { drivers: ['max_verstappen', 'perez'], carImage: '/teams/cars/redbull-2023.png' },
      '2024': { drivers: ['max_verstappen', 'perez'], carImage: '/teams/cars/redbull-2024.png' },
      '2025': { drivers: ['max_verstappen', 'lawson'], carImage: '/teams/cars/redbull-2025.png' },
    },
  },
  {
    id: 'ferrari',
    name: 'Ferrari',
    color: '#dc0000',
    carImage: '/teams/cars/ferrari.png',
    logoImage: '/teams/logos/ferrari.png',
    years: {
      '2022': { drivers: ['leclerc', 'sainz'], carImage: '/teams/cars/ferrari-2022.png' },
      '2023': { drivers: ['leclerc', 'sainz'], carImage: '/teams/cars/ferrari-2023.png' },
      '2024': { drivers: ['leclerc', 'sainz'], carImage: '/teams/cars/ferrari-2024.png' },
      '2025': { drivers: ['leclerc', 'hamilton'], carImage: '/teams/cars/ferrari-2025.png' },
    },
  },
  {
    id: 'mercedes',
    name: 'Mercedes',
    color: '#00d2be',
    carImage: '/teams/cars/mercedes.png',
    logoImage: '/teams/logos/mercedes.png',
    years: {
      '2022': { drivers: ['hamilton', 'russell'], carImage: '/teams/cars/mercedes-2022.png' },
      '2023': { drivers: ['hamilton', 'russell'], carImage: '/teams/cars/mercedes-2023.png' },
      '2024': { drivers: ['hamilton', 'russell'], carImage: '/teams/cars/mercedes-2024.png' },
      '2025': { drivers: ['russell', 'antonelli'], carImage: '/teams/cars/mercedes-2025.png' },
    },
  },
  {
    id: 'mclaren',
    name: 'McLaren',
    color: '#ff8000',
    carImage: '/teams/cars/mclaren.png',
    logoImage: '/teams/logos/mclaren.png',
    years: {
      '2022': { drivers: ['norris', 'ricciardo'], carImage: '/teams/cars/mclaren-2022.png' },
      '2023': { drivers: ['norris', 'piastri'], carImage: '/teams/cars/mclaren-2023.png' },
      '2024': { drivers: ['norris', 'piastri'], carImage: '/teams/cars/mclaren-2024.png' },
      '2025': { drivers: ['norris', 'piastri'], carImage: '/teams/cars/mclaren-2025.png' },
    },
  },
  {
    id: 'aston_martin',
    name: 'Aston Martin',
    color: '#006f62',
    carImage: '/teams/cars/astonmartin.png',
    logoImage: '/teams/logos/astonmartin.png',
    years: {
      '2022': { drivers: ['vettel', 'stroll'], carImage: '/teams/cars/astonmartin-2022.png' },
      '2023': { drivers: ['alonso', 'stroll'], carImage: '/teams/cars/astonmartin-2023.png' },
      '2024': { drivers: ['alonso', 'stroll'], carImage: '/teams/cars/astonmartin-2024.png' },
      '2025': { drivers: ['alonso', 'stroll'], carImage: '/teams/cars/astonmartin-2025.png' },
    },
  },
  {
    id: 'alpine',
    name: 'Alpine F1 Team',
    color: '#0090ff',
    carImage: '/teams/cars/alpine.png',
    logoImage: '/teams/logos/alpine.png',
    years: {
      '2022': { drivers: ['ocon', 'alonso'], carImage: '/teams/cars/alpine-2022.png' },
      '2023': { drivers: ['ocon', 'gasly'], carImage: '/teams/cars/alpine-2023.png' },
      '2024': { drivers: ['gasly', 'ocon'], carImage: '/teams/cars/alpine-2024.png' },
      '2025': { drivers: ['gasly', 'doohan'], carImage: '/teams/cars/alpine-2025.png' },
    },
  },
  {
    id: 'williams',
    name: 'Williams',
    color: '#005aff',
    carImage: '/teams/cars/williams.png',
    logoImage: '/teams/logos/williams.png',
    years: {
      '2022': { drivers: ['albon', 'latifi'], carImage: '/teams/cars/williams-2022.png' },
      '2023': { drivers: ['albon', 'sargeant'], carImage: '/teams/cars/williams-2023.png' },
      '2024': { drivers: ['albon', 'sargeant', 'colapinto'], carImage: '/teams/cars/williams-2024.png' },
      '2025': { drivers: ['albon', 'sainz'], carImage: '/teams/cars/williams-2025.png' },
    },
  },
  {
    id: 'rb', // Racing Bulls / AlphaTauri
    name: 'Racing Bulls',
    color: '#2b4562',
    carImage: '/teams/cars/racingbulls.png',
    logoImage: '/teams/logos/racingbulls.png',
    years: {
      '2022': { drivers: ['gasly', 'tsunoda'], carImage: '/teams/cars/alphatauri-2022.png' },
      '2023': { drivers: ['tsunoda', 'de_vries', 'ricciardo', 'lawson'], carImage: '/teams/cars/alphatauri-2023.png' },
      '2024': { drivers: ['tsunoda', 'ricciardo', 'lawson'], carImage: '/teams/cars/racingbulls-2024.png' },
      '2025': { drivers: ['tsunoda', 'hadjar'], carImage: '/teams/cars/racingbulls-2025.png' },
    },
  },
  {
    id: 'sauber', // Kick Sauber / Alfa Romeo
    name: 'Kick Sauber',
    color: '#52e252',
    carImage: '/teams/cars/sauber.png',
    logoImage: '/teams/logos/sauber.png',
    years: {
      '2022': { drivers: ['bottas', 'zhou'], carImage: '/teams/cars/alfaromeo-2022.png' },
      '2023': { drivers: ['bottas', 'zhou'], carImage: '/teams/cars/alfaromeo-2023.png' },
      '2024': { drivers: ['bottas', 'zhou'], carImage: '/teams/cars/kicksauber-2024.png' },
      '2025': { drivers: ['hulkenberg', 'bortoleto'], carImage: '/teams/cars/sauber-2025.png' },
    },
  },
  {
    id: 'haas',
    name: 'Haas F1 Team',
    color: '#b6babd',
    carImage: '/teams/cars/haas.png',
    logoImage: '/teams/logos/haas.png',
    years: {
      '2022': { drivers: ['magnussen', 'schumacher'], carImage: '/teams/cars/haas-2022.png' },
      '2023': { drivers: ['magnussen', 'hulkenberg'], carImage: '/teams/cars/haas-2023.png' },
      '2024': { drivers: ['magnussen', 'hulkenberg', 'bearman'], carImage: '/teams/cars/haas-2024.png' },
      '2025': { drivers: ['bearman', 'ocon'], carImage: '/teams/cars/haas-2025.png' },
    },
  },
];

// Get team color by constructor ID
export function getTeamColor(constructorId: string): string {
  const team = teamConfigs.find(
    t => t.id === constructorId || 
         t.name.toLowerCase().includes(constructorId.toLowerCase())
  );
  return team?.color || '#94a3b8';
}

// Get team full name
export function getTeamName(constructorId: string): string {
  const team = teamConfigs.find(t => t.id === constructorId);
  return team?.name || constructorId;
}

// Available car images with their actual file names
const availableCarImages: { [key: string]: string } = {
  'alpine': '/teams/cars/01_alpine.png',
  'aston_martin': '/teams/cars/02_aston_martin.png',
  'ferrari': '/teams/cars/03_ferrari.png',
  'haas': '/teams/cars/04_haas.png',
  'red_bull': '/teams/cars/05_red_bull.png',
  'rb': '/teams/cars/06_visa_rb.png',
  'mercedes': '/teams/cars/07_mercedes.png',
  'mclaren': '/teams/cars/08_mclaren.png',
  'williams': '/teams/cars/09_williams.png',
  'sauber': '/teams/cars/14_Sauber.png',
  'alfa_romeo': '/teams/cars/15_alfa_romeo.png',
  // Fallback mapping for older naming
  'audi': '/teams/cars/10_auodi_revolut.png',
};

// Get car image for a team in a specific year
export function getCarImage(constructorId: string, year?: string): string | undefined {
  // First check if we have an actual image file
  const actualImage = availableCarImages[constructorId];
  if (actualImage) {
    return actualImage;
  }
  
  // Fall back to config-based paths
  const team = teamConfigs.find(t => t.id === constructorId);
  if (!team) return undefined;
  
  if (year) {
    const yearConfig = team.years[year];
    if (yearConfig?.carImage) return yearConfig.carImage;
  }
  
  return team.carImage;
}

// Get car image by constructor name (for API data matching)
export function getCarImageByName(constructorName: string, year?: string): string | undefined {
  const nameLower = constructorName.toLowerCase();
  
  // Try to match by name
  if (nameLower.includes('red bull')) return availableCarImages['red_bull'];
  if (nameLower.includes('ferrari')) return availableCarImages['ferrari'];
  if (nameLower.includes('mercedes')) return availableCarImages['mercedes'];
  if (nameLower.includes('mclaren')) return availableCarImages['mclaren'];
  if (nameLower.includes('aston')) return availableCarImages['aston_martin'];
  if (nameLower.includes('alpine')) return availableCarImages['alpine'];
  if (nameLower.includes('williams')) return availableCarImages['williams'];
  if (nameLower.includes('alphatauri') || nameLower.includes('racing bulls') || nameLower.includes('rb')) 
    return availableCarImages['rb'];
  if (nameLower.includes('haas')) return availableCarImages['haas'];
  
  // Sauber / Alfa Romeo / Kick Sauber / Audi - use year to determine which image
  if (nameLower.includes('alfa romeo')) {
    // Alfa Romeo branding: 2022-2023
    return availableCarImages['alfa_romeo'];
  }
  if (nameLower.includes('kick sauber') || nameLower.includes('sauber') || nameLower.includes('audi')) {
    // Check year for newer Sauber/Audi branding
    if (year && (year === '2024' || year === '2025')) {
      return availableCarImages['sauber'];
    }
    // Default to Alfa Romeo for older years, Sauber for newer
    return availableCarImages['sauber'];
  }
  
  return undefined;
}

// Get all required car images for validation
export function getAllRequiredCarImages(): { year: string; team: string; path: string }[] {
  const images: { year: string; team: string; path: string }[] = [];
  
  teamConfigs.forEach(team => {
    Object.entries(team.years).forEach(([year, config]) => {
      if (config.carImage) {
        images.push({ year, team: team.name, path: config.carImage });
      }
    });
  });
  
  return images;
}

// Check which images are missing
export async function checkMissingImages(): Promise<{ year: string; team: string; path: string }[]> {
  const required = getAllRequiredCarImages();
  
  // This will be checked on the client side
  return required;
}
