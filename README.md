# TravelTracker

TravelTracker es una aplicación web que te permite rastrear y monitorear vuelos en tiempo real. La aplicación utiliza datos de Aviationstack para proporcionar información precisa y actualizada sobre vuelos alrededor del mundo.

## Requisitos Previos

Para que la aplicación funcione correctamente, necesitarás:

1. Una cuenta en [Aviationstack](https://aviationstack.com/)
   - Regístrate para obtener una API key gratuita
   - El plan gratuito incluye 100 solicitudes por mes

2. Node.js instalado en tu sistema
   - Versión recomendada: 16.x o superior

## Configuración

1. Clona este repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd TravelTracker
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y añade tu API key de Aviationstack:

```env
   # API Key de Aviationstack (obligatoria)
   AVIATIONSTACK_API_KEY=1234567890abcdef1234567890abcdef

   # Configuración opcional del entorno
      MONGODB_URI
```

4. Inicia la aplicación en modo desarrollo:
```bash
npm start
```

## Características

- Rastreo de vuelos en tiempo real
- Información detallada de vuelos
- Interfaz de usuario moderna y responsiva
- Modo claro/oscuro automático
- Animaciones suaves y atractivas

## Tecnologías Utilizadas

- React
- Material-UI
- Emotion (para estilos)
- Aviationstack API

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios que te gustaría hacer.

## Licencia

Este proyecto está bajo la Licencia MIT.
