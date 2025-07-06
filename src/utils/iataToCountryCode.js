const iataToCountryCode = {
  "MAD": "ES", // Madrid, Spain
  "BCN": "ES", // Barcelona, Spain
  "CDG": "FR", // Paris, France
  "JFK": "US", // New York, USA
  "LAX": "US", // Los Angeles, USA
  "LHR": "GB", // London, UK
  "NRT": "JP", // Tokyo, Japan
  "DXB": "AE", // Dubai, UAE
  "PEK": "CN", // Beijing, China
  "SYD": "AU", // Sydney, Australia
  "EZE": "AR", // Buenos Aires, Argentina
  "GRU": "BR", // São Paulo, Brazil
  "MEX": "MX", // Mexico City, Mexico
  "SCL": "CL", // Santiago, Chile
  "BOG": "CO", // Bogotá, Colombia
  "NCE": "FR", // Nice, France
  "MXP": "IT", // Milan, Italy
  "FLR": "IT", // Florence, Italy
  "FCO": "IT", // Rome, Italy
  "NAP": "IT", // Naples, Italy
  "JTR": "GR", // Santorini, Greece
  "ATH": "GR", // Athens, Greece
  "OPO": "PT", // Porto, Portugal
  "LIS": "PT", // Lisbon, Portugal
  "RAK": "MA", // Marrakech, Morocco
  "TTU": "MA", // Tetouan, Morocco
  "MRS": "FR", // Marseille, France
  "PRG": "CZ", // Prague, Czech Republic
  "BRU": "BE", // Brussels, Belgium
  "BUD": "HU", // Budapest, Hungary
  "BER": "DE", // Berlin, Germany
  // Agrega más mapeos aquí
};

const iataToCityName = {
  "MAD": "Madrid",
  "BCN": "Barcelona",
  "CDG": "París",
  "JFK": "Nueva York",
  "LAX": "Los Ángeles",
  "LHR": "Londres",
  "NRT": "Tokio",
  "DXB": "Dubái",
  "PEK": "Pekín",
  "SYD": "Sídney",
  "EZE": "Buenos Aires",
  "GRU": "São Paulo",
  "MEX": "Ciudad de México",
  "SCL": "Santiago de Chile",
  "BOG": "Bogotá",
  "NCE": "Niza",
  "MXP": "Milán",
  "FLR": "Florencia",
  "FCO": "Roma",
  "NAP": "Nápoles",
  "JTR": "Santorini",
  "ATH": "Atenas",
  "OPO": "Oporto",
  "LIS": "Lisboa",
  "RAK": "Marrakech",
  "TTU": "Tetuán",
  "MRS": "Marsella",
  "PRG": "Praga",
  "BRU": "Bruselas",
  "BUD": "Budapest",
  "BER": "Berlín",
  // Agrega más mapeos aquí
};

export const getCountryCodeFromIATA = (iataCode) => {
  return iataToCountryCode[iataCode.toUpperCase()] || null;
};

export const getCityNameFromIATA = (iataCode) => {
  return iataToCityName[iataCode.toUpperCase()] || null;
}; 