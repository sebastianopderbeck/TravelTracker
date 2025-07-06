import React, { useState, useEffect } from 'react';
import { Modal, Box, IconButton, Typography, Fade, Grid, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import GridViewIcon from '@mui/icons-material/GridView';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  bgcolor: 'rgba(220,220,220,0.85)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1300,
  outline: 'none',
  overflow: 'hidden',
};

const ImageGallery = ({ open, images = [], initialIndex = 0, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);
  const [mode, setMode] = useState('grid'); // 'grid' o 'single'
  const [galleryImages, setGalleryImages] = useState(images);

  useEffect(() => {
    if (open) {
      setMode('grid');
      setCurrent(initialIndex);
    }
    setGalleryImages(images);
  }, [open, initialIndex, images]);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose && onClose();
  };

  const handleThumbClick = (idx) => {
    setCurrent(idx);
    setMode('single');
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (galleryImages.length === 0) return;
    const newImages = galleryImages.filter((_, idx) => idx !== current);
    setGalleryImages(newImages);
    // TODO: Aquí puedes agregar la llamada al backend para eliminar la imagen del viaje
    if (newImages.length === 0) {
      setMode('grid');
    } else if (current >= newImages.length) {
      setCurrent(newImages.length - 1);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={style} onClick={handleClose}>
          <IconButton
            onClick={handleClose}
            sx={{ position: 'absolute', top: 24, right: 32, color: 'white', zIndex: 2 }}
            aria-label="Cerrar galería"
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          {mode === 'grid' ? (
            <Box
              sx={{
                width: { xs: '95vw', md: '80vw' },
                maxHeight: '85vh',
                borderRadius: 3,
                p: { xs: 1, md: 3 },
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                boxShadow: 'none',
              }}
              onClick={e => e.stopPropagation()}
            >
              <Grid container spacing={2} justifyContent="center">
                {images.map((img, idx) => (
                  <Grid item xs={6} sm={4} md={3} lg={2} key={idx}>
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        boxShadow: 3,
                        transition: 'transform 0.15s cubic-bezier(.4,2,.6,1)',
                        '&:hover': {
                          transform: 'scale(1.07)',
                        }
                      }}
                      onClick={() => handleThumbClick(idx)}
                    >
                      <img
                        src={img.startsWith('uploads/') ? `/${img}` : img}
                        alt={`thumb-${idx + 1}`}
                        style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block', background: '#222' }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box
              sx={{
                maxWidth: '90vw',
                maxHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                width: { xs: '90vw', md: '70vw' },
                height: { xs: 'auto', md: '70vh' },
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: 6,
                bgcolor: 'rgba(0,0,0,0.2)'
              }}
              onClick={e => e.stopPropagation()}
            >
              <IconButton
                onClick={() => setMode('grid')}
                sx={{ position: 'absolute', top: 16, left: 16, color: 'white', zIndex: 2, bgcolor: 'rgba(0,0,0,0.3)' }}
                aria-label="Ver mosaico"
              >
                <GridViewIcon fontSize="medium" />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                sx={{ position: 'absolute', top: 16, right: 16, color: 'white', zIndex: 2, bgcolor: 'rgba(0,0,0,0.3)'  }}
                aria-label="Eliminar imagen"
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
              <IconButton
                onClick={handlePrev}
                sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', color: 'white', zIndex: 2 }}
                aria-label="Anterior"
              >
                <ArrowBackIosNewIcon fontSize="large" />
              </IconButton>
              <img
                src={galleryImages[current].startsWith('uploads/') ? `/${galleryImages[current]}` : galleryImages[current]}
                alt={`Imagen ${current + 1}`}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  borderRadius: 12,
                  background: '#222',
                  margin: 'auto',
                  display: 'block',
                }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  right: 24,
                  color: 'white',
                  bgcolor: 'rgba(0,0,0,0.4)',
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontWeight: 500,
                  fontSize: '1rem',
                  letterSpacing: 1
                }}
              >
                {current + 1} / {galleryImages.length}
              </Typography>
              <IconButton
                onClick={handleNext}
                sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: 'white', zIndex: 2 }}
                aria-label="Siguiente"
              >
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default ImageGallery; 