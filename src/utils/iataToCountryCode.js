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

const iataToCoordinates = {
  "MAD": [-3.7492, 40.4168], // Madrid, Spain
  "BCN": [2.1734, 41.3851], // Barcelona, Spain
  "CDG": [2.3522, 48.8566], // Paris, France
  "JFK": [-74.0060, 40.7128], // New York, USA
  "LAX": [-118.2437, 34.0522], // Los Angeles, USA
  "LHR": [-0.1276, 51.5074], // London, UK
  "NRT": [139.6917, 35.6895], // Tokyo, Japan
  "DXB": [55.2708, 25.2048], // Dubai, UAE
  "PEK": [116.4074, 39.9042], // Beijing, China
  "SYD": [151.2093, -33.8688], // Sydney, Australia
  "EZE": [-58.3816, -34.6037], // Buenos Aires, Argentina
  "GRU": [-46.6333, -23.5505], // São Paulo, Brazil
  "MEX": [-99.1332, 19.4326], // Mexico City, Mexico
  "SCL": [-70.6483, -33.4489], // Santiago, Chile
  "BOG": [-74.0721, 4.7110], // Bogotá, Colombia
  "NCE": [7.2619, 43.7102], // Nice, France
  "MXP": [9.1859, 45.4642], // Milan, Italy
  "FLR": [11.2558, 43.7696], // Florence, Italy
  "FCO": [12.4964, 41.9028], // Rome, Italy
  "NAP": [14.2681, 40.8518], // Naples, Italy
  "JTR": [25.4615, 36.3932], // Santorini, Greece
  "ATH": [23.7275, 37.9838], // Athens, Greece
  "OPO": [-8.6291, 41.1579], // Porto, Portugal
  "LIS": [-9.1393, 38.7223], // Lisbon, Portugal
  "RAK": [-7.9821, 31.6340], // Marrakech, Morocco
  "TTU": [-5.3681, 35.5711], // Tetouan, Morocco
  "MRS": [5.3698, 43.2965], // Marseille, France
  "PRG": [14.4378, 50.0755], // Prague, Czech Republic
  "BRU": [4.3517, 50.8503], // Brussels, Belgium
  "BUD": [19.0402, 47.4979], // Budapest, Hungary
  "BER": [13.4050, 52.5200], // Berlin, Germany
  // Agrega más mapeos aquí
};

export const getCountryCodeFromIATA = (iataCode) => {
  return iataToCountryCode[iataCode.toUpperCase()] || null;
};

export const getCityNameFromIATA = (iataCode) => {
  return iataToCityName[iataCode.toUpperCase()] || null;
};

export const getCoordinatesFromIATA = (iataCode) => {
  return iataToCoordinates[iataCode.toUpperCase()] || null;
}; 