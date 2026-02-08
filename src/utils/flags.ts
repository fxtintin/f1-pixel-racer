// F1 Circuit Country Flags - Using individual flag images
// Flag images are located at /nation/flags/[中文名]-[国家代码].png

export interface FlagInfo {
  country: string;
  countryCode: string;
  imagePath: string;
}

// Map of circuit IDs/names to their country codes
export const circuitCountryMap: { [key: string]: string } = {
  // 2022-2025 Circuits
  'bahrain': 'BH',
  'jeddah': 'SA',
  'albert_park': 'AU',
  'suzuka': 'JP',
  'shanghai': 'CN',
  'miami': 'US',
  'imola': 'IT',
  'monaco': 'MC',
  'villeneuve': 'CA',
  'catalunya': 'ES',
  'red_bull_ring': 'AT',
  'silverstone': 'GB',
  'hungaroring': 'HU',
  'spa': 'BE',
  'zandvoort': 'NL',
  'monza': 'IT',
  'marina_bay': 'SG',
  'losail': 'QA',
  'americas': 'US',
  'rodriguez': 'MX',
  'interlagos': 'BR',
  'vegas': 'US',
  'yas_marina': 'AE',
  // Alternative names
  'bahrain_international_circuit': 'BH',
  'jeddah_corniche_circuit': 'SA',
  'albert_park_circuit': 'AU',
  'suzuka_circuit': 'JP',
  'shanghai_international_circuit': 'CN',
  'miami_international_autodrome': 'US',
  'imola_circuit': 'IT',
  'circuit_de_monaco': 'MC',
  'circuit_gilles_villeneuve': 'CA',
  'circuit_de_barcelona_catalunya': 'ES',
  'red_bull_ring_circuit': 'AT',
  'silverstone_circuit': 'GB',
  'hungaroring_circuit': 'HU',
  'circuit_de_spa_francorchamps': 'BE',
  'circuit_zandvoort': 'NL',
  'autodromo_nazionale_monza': 'IT',
  'marina_bay_street_circuit': 'SG',
  'losail_international_circuit': 'QA',
  'circuit_of_the_americas': 'US',
  'autodromo_hermanos_rodriguez': 'MX',
  'autodromo_jose_carlos_pace': 'BR',
  'las_vegas_strip_circuit': 'US',
  'yas_marina_circuit': 'AE',
};

// Country code to flag image mapping
const countryFlagImages: { [key: string]: string } = {
  'BH': '/nation/flags/巴林-BH.png',
  'SA': '/nation/flags/沙特阿拉伯-SA.png',
  'AU': '/nation/flags/澳大利亚-AU.png',
  'JP': '/nation/flags/日本-JP.png',
  'CN': '/nation/flags/中国-CN.png',
  'US': '/nation/flags/美国-US.png',
  'IT': '/nation/flags/意大利-IT.png',
  'MC': '/nation/flags/摩纳哥-MC.png',
  'CA': '/nation/flags/加拿大-CA.png',
  'ES': '/nation/flags/西班牙-ES.png',
  'AT': '/nation/flags/奥地利-AT.png',
  'GB': '/nation/flags/英国-GB.png',
  'HU': '/nation/flags/匈牙利-HU.png',
  'BE': '/nation/flags/比利时-BE.png',
  'NL': '/nation/flags/荷兰-NL.png',
  'SG': '/nation/flags/新加坡-SG.png',
  'QA': '/nation/flags/卡塔尔-QA.png',
  'MX': '/nation/flags/墨西哥-MX.png',
  'BR': '/nation/flags/巴西-BR.png',
  'AE': '/nation/flags/阿联酋-AE.png',
};

// Country code to full country name
const countryNames: { [key: string]: string } = {
  'BH': 'Bahrain',
  'SA': 'Saudi Arabia',
  'AU': 'Australia',
  'JP': 'Japan',
  'CN': 'China',
  'US': 'United States',
  'IT': 'Italy',
  'MC': 'Monaco',
  'CA': 'Canada',
  'ES': 'Spain',
  'AT': 'Austria',
  'GB': 'United Kingdom',
  'HU': 'Hungary',
  'BE': 'Belgium',
  'NL': 'Netherlands',
  'SG': 'Singapore',
  'QA': 'Qatar',
  'MX': 'Mexico',
  'BR': 'Brazil',
  'AE': 'UAE',
};

// Get flag for a circuit
export function getCircuitFlag(circuitId: string): FlagInfo | undefined {
  const countryCode = circuitCountryMap[circuitId];
  if (countryCode) {
    return {
      country: countryNames[countryCode] || countryCode,
      countryCode: countryCode,
      imagePath: countryFlagImages[countryCode],
    };
  }
  return undefined;
}

// Get flag by country code
export function getFlagByCountryCode(countryCode: string): FlagInfo | undefined {
  const code = countryCode.toUpperCase();
  if (countryFlagImages[code]) {
    return {
      country: countryNames[code] || code,
      countryCode: code,
      imagePath: countryFlagImages[code],
    };
  }
  return undefined;
}

// Get flag by country name
export function getCountryFlag(countryName: string): FlagInfo | undefined {
  const normalized = countryName.toLowerCase();
  
  for (const [code, name] of Object.entries(countryNames)) {
    if (name.toLowerCase() === normalized) {
      return {
        country: name,
        countryCode: code,
        imagePath: countryFlagImages[code],
      };
    }
  }
  
  return undefined;
}
