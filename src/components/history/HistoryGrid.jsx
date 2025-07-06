import React, { useRef, useState } from "react";
import './HistoryGrid.css';
import { getCityNameFromIATA } from "../../utils/iataToCountryCode";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageGallery from './ImageGallery';

const API_URL = '/api';

const HistoryGrid = ({ travels = [], formatDate }) => {
  // Estado para previews locales de imágenes subidas
  const [imagePreviews, setImagePreviews] = useState({});
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const handleImageUpload = async (e, viaje) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview local
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviews(prev => ({ ...prev, [viaje._id]: reader.result }));
    };
    reader.readAsDataURL(file);

    // Subida real al backend
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch(`${API_URL}/${viaje._id}/image`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Error al subir la imagen');
      // Opcional: podrías actualizar la imagen del viaje en el store global aquí
    } catch (err) {
      alert('Error al subir la imagen');
      console.error(err);
    }
  };

  const handleCardClick = (viaje) => {
    if (viaje.images && viaje.images.length > 0) {
      setGalleryImages(viaje.images);
      setGalleryIndex(0);
      setGalleryOpen(true);
    }
  };

  return (
    <div className="history-grid-container">
      <div className="history-grid">
        {travels.map((viaje, idx) => {
          const fileInputRef = useRef();
          // Determinar la imagen a mostrar: preview local, imagen del backend, o placeholder
          let imgSrc = imagePreviews[viaje._id];
          if (!imgSrc && viaje.images && viaje.images.length > 0) {
            imgSrc = viaje.images[0].startsWith('uploads/') ? `/${viaje.images[0]}` : viaje.images[0];
          }
          return (
            <div
              className="history-card"
              key={viaje._id || idx}
              onClick={() => handleCardClick(viaje)}
              style={{ cursor: viaje.images && viaje.images.length > 0 ? 'pointer' : 'default' }}
            >
              <div className="history-card-img">
                {imgSrc ? (
                  <img src={imgSrc} alt="Viaje" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px 12px 0 0' }} />
                ) : null}
              </div>
              <div className="history-card-info history-card-info-flex" onClick={e => e.stopPropagation()}>
                <div>
                  <span className="history-card-city">{getCityNameFromIATA(viaje.destination?.iata) || viaje.destination?.name || ""}</span>
                  <span className="history-card-date">
                    {formatDate(viaje.departureDate)}
                    {viaje.returnDate ? ` - ${formatDate(viaje.returnDate)}` : ""}
                  </span>
                </div>
                <IconButton
                  color="primary"
                  aria-label="subir imagen"
                  component="span"
                  onClick={() => fileInputRef.current.click()}
                  className="history-card-upload-btn"
                >
                  <PhotoCamera />
                </IconButton>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={e => handleImageUpload(e, viaje)}
                />
              </div>
            </div>
          );
        })}
      </div>
      <ImageGallery
        open={galleryOpen}
        images={galleryImages}
        initialIndex={galleryIndex}
        onClose={() => setGalleryOpen(false)}
      />
    </div>
  );
};

export default HistoryGrid; 