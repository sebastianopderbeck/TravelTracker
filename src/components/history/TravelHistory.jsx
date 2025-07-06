import React, { useState } from 'react';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import GridViewIcon from '@mui/icons-material/GridView';
import { useDeleteTravelMutation, useGetTravelsQuery } from '../../services/travelApi';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import HistoryList from './HistoryList';
import HistoryGrid from './HistoryGrid';

const formatDate = (date) => {
  if (!date) return 'No especificada';
  try {
    return format(new Date(date), 'dd/MM/yyyy', { locale: es });
  } catch (error) {
    console.error('Error formateando fecha:', error);
    return 'Fecha inválida';
  }
};

const TravelHistory = () => {
  const { data: travels, isLoading } = useGetTravelsQuery();
  const [deleteTravel] = useDeleteTravelMutation();
  const [view, setView] = useState('grid'); // 'list' o 'grid'

  const handleDelete = async (id) => {
    try {
      await deleteTravel(id);
    } catch (error) {
      console.error('Error deleting travel:', error);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  // Ordenar los viajes por departureDate antes de mostrarlos
  const sortedTravels = travels ? [...travels].sort((a, b) => {
    return new Date(b.departureDate) - new Date(a.departureDate);
  }) : [];

  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
        <Box>
          <IconButton onClick={() => setView('list')} color={view === 'list' ? 'primary' : 'default'}>
            <ListIcon />
          </IconButton>
          <IconButton onClick={() => setView('grid')} color={view === 'grid' ? 'primary' : 'default'}>
            <GridViewIcon />
          </IconButton>
        </Box>
      </Box>
      {view === 'list' ? (
        <HistoryList travels={sortedTravels} onDelete={handleDelete} formatDate={formatDate} />
      ) : (
        <HistoryGrid travels={sortedTravels} formatDate={formatDate} />
      )}
    </Box>
  );
};

export default TravelHistory; 