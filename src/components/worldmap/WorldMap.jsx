import React, { useState, useMemo } from 'react';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';
import { useGetTravelsQuery } from '../../services/travelApi';
import { getCityNameFromIATA, getCoordinatesFromIATA, getCountryCodeFromIATA, getCountryNameFromCode } from '../../utils/iataToCountryCode';
import './WorldMap.css';
import ImageGallery from '../history/ImageGallery';

const WorldMap = () => {
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const { data: travels = [], isLoading } = useGetTravelsQuery();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleZoomIn = () => {
    setPosition(prev => ({
      ...prev,
      zoom: Math.min(prev.zoom * 1.5, 8)
    }));
  };

  const handleZoomOut = () => {
    setPosition(prev => ({
      ...prev,
      zoom: Math.max(prev.zoom / 1.5, 0.5)
    }));
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) { // Solo clic izquierdo
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      
      const scale = 147 * position.zoom;
      const sensitivity = 0.2;
      const longitudeDelta = (deltaX / scale) * 360 * sensitivity;
      const latitudeDelta = (deltaY / scale) * 180 * sensitivity;
      
      setPosition(prev => ({
        ...prev,
        coordinates: [
          prev.coordinates[0] - longitudeDelta,
          prev.coordinates[1] + latitudeDelta
        ]
      }));
      
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Obtener nombres de países visitados
  const visitedCountryNames = useMemo(() => {
    const names = new Set();
    travels.forEach(travel => {
      const originCountry = getCountryCodeFromIATA(travel.origin.iata);
      const destCountry = getCountryCodeFromIATA(travel.destination.iata);
      if (originCountry) {
        const originName = getCountryNameFromCode(originCountry);
        if (originName) names.add(originName);
      }
      if (destCountry) {
        const destName = getCountryNameFromCode(destCountry);
        if (destName) names.add(destName);
      }
    });
    return names;
  }, [travels]);

  // Convertir los viajes a rutas para el mapa
  const routes = travels
    .filter(travel => {
      const originCoords = getCoordinatesFromIATA(travel.origin.iata);
      const destCoords = getCoordinatesFromIATA(travel.destination.iata);
      return originCoords && destCoords;
    })
    .map(travel => {
      const originCoords = getCoordinatesFromIATA(travel.origin.iata);
      const destCoords = getCoordinatesFromIATA(travel.destination.iata);
      const originName = getCityNameFromIATA(travel.origin.iata) || travel.origin.name;
      const destName = getCityNameFromIATA(travel.destination.iata) || travel.destination.name;
      
      return {
        from: { 
          name: originName, 
          coordinates: originCoords,
          iata: travel.origin.iata
        }, 
        to: { 
          name: destName, 
          coordinates: destCoords,
          iata: travel.destination.iata
        }, 
        name: `${originName} → ${destName}`,
        distance: travel.distance,
        flightTime: travel.estimatedFlightTime,
        date: new Date(travel.departureDate).toLocaleDateString('es-ES')
      };
    });

  // Obtener ciudades únicas para mostrar marcadores
  const uniqueCities = new Map();
  routes.forEach(route => {
    if (!uniqueCities.has(route.from.iata)) {
      uniqueCities.set(route.from.iata, {
        name: route.from.name,
        coordinates: route.from.coordinates,
        iata: route.from.iata
      });
    }
    if (!uniqueCities.has(route.to.iata)) {
      uniqueCities.set(route.to.iata, {
        name: route.to.name,
        coordinates: route.to.coordinates,
        iata: route.to.iata
      });
    }
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
      <Box sx={{ position: 'relative', width: '100%', height: '90vh' }}>
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{
            scale: 147 * position.zoom,
            center: position.coordinates
          }}
          style={{
            width: '100%',
            height: '100%',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={(e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            setPosition(prev => ({
              ...prev,
              zoom: Math.max(0.5, Math.min(8, prev.zoom * delta))
            }));
          }}
        >
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => {
                const countryName = geo.properties.name;
                const isVisited = countryName && visitedCountryNames.has(countryName);
                console.log(visitedCountryNames, geo.properties);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isVisited ? "#4CAF50" : "#B0B0B0"}
                    stroke="#D6D6DA"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: 'none' },
                      hover: { 
                        fill: isVisited ? '#4CAF50' : '#B0B0B0',
                        outline: 'none'
                      },
                      pressed: { outline: 'none' },
                    }}
                    onClick={() => {
                      setSelectedCountry(countryName);
                      // Filtrar imágenes de los viajes relacionados con ese país
                      const images = travels
                        .filter(travel => {
                          const originCountry = getCountryNameFromCode(getCountryCodeFromIATA(travel.origin.iata));
                          const destCountry = getCountryNameFromCode(getCountryCodeFromIATA(travel.destination.iata));
                          return originCountry === countryName || destCountry === countryName;
                        })
                        .flatMap(travel => travel.images || []);
                      setGalleryImages(images);
                      setGalleryOpen(true);
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Marcadores de ciudades únicas */}
          {Array.from(uniqueCities.values()).map((city, index) => (
            <Marker key={`city-${index}`} coordinates={city.coordinates}>
              <circle r={4} fill="#111" opacity={0.8} />
              <text
                textAnchor="middle"
                y={-10}
                style={{ 
                  fontFamily: "system-ui", 
                  fill: "#111", 
                  fontSize: "10px",
                  fontWeight: "bold"
                }}
              >
                {city.name}
              </text>
            </Marker>
          ))}

          {/* Líneas de rutas */}
          {routes.map((route, index) => (
            <Line
              key={`route-${index}`}
              from={route.from.coordinates}
              to={route.to.coordinates}
              stroke="#666"
              strokeWidth={1.5}
              strokeDasharray="5,5"
              opacity={0.7}
            />
          ))}
        </ComposableMap>

        {/* Controles de zoom */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}
        >
          <IconButton
            size="small"
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
            }}
            onClick={handleZoomIn}
            disabled={position.zoom >= 8}
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton
            size="small"
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' }
            }}
            onClick={handleZoomOut}
            disabled={position.zoom <= 0.5}
          >
            <ZoomOutIcon />
          </IconButton>
        </Box>

        {/* Leyenda de países visitados */}
        {visitedCountryNames.size > 0 && (
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 16, 
              left: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 2,
              p: 2,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
              Países Visitados
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box 
                sx={{ 
                  width: 16, 
                  height: 16, 
                  backgroundColor: '#4CAF50', 
                  borderRadius: 1 
                }} 
              />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {visitedCountryNames.size} países
              </Typography>
            </Box>
          </Box>
        )}

        {/* Información de las rutas */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 16, 
            left: 16, 
            right: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 2,
            p: 2,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
            {routes.length > 0 ? `Rutas de Viaje (${routes.length})` : 'No hay rutas registradas'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            {routes.length > 0 
              ? `${uniqueCities.size} ciudades visitadas • Distancia total: ${routes.reduce((sum, route) => sum + route.distance, 0).toLocaleString()} km`
              : 'Agrega viajes para ver las rutas en el mapa'
            }
            {position.zoom !== 1 && ` • Zoom: ${Math.round(position.zoom * 100)}%`}
          </Typography>
        </Box>

        {/* Galería de fotos por país */}
        <ImageGallery
          open={galleryOpen}
          images={galleryImages}
          onClose={() => setGalleryOpen(false)}
        />
      </Box>
  );
};

export default WorldMap; 