import React, { useRef } from "react";
import "./HistoryGrid.css";
import { getCityNameFromIATA } from "../../utils/iataToCountryCode";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const HistoryGrid = ({ travels = [], formatDate }) => {
  // Handler para subir imagen (por ahora solo loguea el archivo)
  const handleImageUpload = (e, viaje) => {
    const file = e.target.files[0];
    if (file) {
      console.log(`Imagen seleccionada para el viaje a ${getCityNameFromIATA(viaje.destination?.iata) || viaje.destination?.name}:`, file);
      // Aquí podrías hacer un upload real o guardar la imagen en el estado
    }
  };

  return (
    <div className="history-grid-container">
      <div className="history-grid">
        {travels.map((viaje, idx) => {
          // Referencia para el input file de cada tarjeta
          const fileInputRef = useRef();
          return (
            <div className="history-card" key={viaje._id || idx}>
              <div className="history-card-img" />
              <div className="history-card-info history-card-info-flex">
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
    </div>
  );
};

export default HistoryGrid; 