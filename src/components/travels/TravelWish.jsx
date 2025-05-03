import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { useGetWishesQuery, useAddWishMutation, useUpdateWishMutation, useDeleteWishMutation } from '../../services/wishApi';

const TravelWish = () => {
  const { data: wishes = [], isLoading } = useGetWishesQuery();
  const [addWish] = useAddWishMutation();
  const [updateWish] = useUpdateWishMutation();
  const [deleteWish] = useDeleteWishMutation();
  
  const [newWish, setNewWish] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleAddWish = async () => {
    if (newWish.trim()) {
      try {
        await addWish({ text: newWish }).unwrap();
        setNewWish('');
      } catch (error) {
        console.error('Error al añadir el deseo:', error);
      }
    }
  };

  const handleDeleteWish = async (id) => {
    try {
      await deleteWish(id).unwrap();
    } catch (error) {
      console.error('Error al eliminar el deseo:', error);
    }
  };

  const handleEditWish = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const handleSaveEdit = async (id) => {
    try {
      await updateWish({ id, text: editText }).unwrap();
      setEditingId(null);
      setEditText('');
    } catch (error) {
      console.error('Error al actualizar el deseo:', error);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Lista de Deseos de Viaje
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Añade un nuevo destino deseado"
          value={newWish}
          onChange={(e) => setNewWish(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddWish()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddWish}
          startIcon={<AddIcon />}
        >
          Añadir
        </Button>
      </Box>

      <List>
        {wishes.map((wish) => (
          <React.Fragment key={wish._id}>
            <ListItem>
              {editingId === wish._id ? (
                <Box sx={{ display: 'flex', width: '100%', gap: 1 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(wish._id)}
                  />
                  <IconButton
                    color="primary"
                    onClick={() => handleSaveEdit(wish._id)}
                  >
                    <CheckIcon />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <ListItemText primary={wish.text} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditWish(wish._id, wish.text)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteWish(wish._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              )}
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default TravelWish; 