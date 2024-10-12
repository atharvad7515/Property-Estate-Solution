"use client"; // This ensures the component is treated as a client-side component

import isBrowser from "@/utils/isBrowser"; // Import the isBrowser utility function
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dynamically load the MapContainer and related components from react-leaflet to ensure they're only loaded on the client
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const useMapEvents = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMapEvents),
  { ssr: false }
);

const Map = () => {
  const [markers, setMarkers] = useState([
    { position: [18.5204, 73.8567], id: 1, draggable: true },
  ]);

  useEffect(() => {
    if (isBrowser()) {
      // Leaflet's icon settings must only run on the client
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    }
  }, []);

  const handleMapClick = (e) => {
    const newMarker = {
      position: [e.latlng.lat, e.latlng.lng],
      id: markers.length + 1,
      draggable: true,
    };
    setMarkers([...markers, newMarker]);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        handleMapClick(e);
        alert(`You clicked at ${e.latlng.lat}, ${e.latlng.lng}`);
      },
    });
    return null;
  };

  const handleMarkerDrag = (event, id) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === id
        ? {
            ...marker,
            position: [
              event.target.getLatLng().lat,
              event.target.getLatLng().lng,
            ],
          }
        : marker
    );
    setMarkers(updatedMarkers);
  };

  const handleMarkerRightClick = (id) => {
    const updatedMarkers = markers.filter((marker) => marker.id !== id);
    setMarkers(updatedMarkers);
  };

  return (
    <MapContainer
      center={[18.5204, 73.8567]}
      zoom={13}
      style={{ height: "45vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          draggable={marker.draggable}
          eventHandlers={{
            dragend: (event) => handleMarkerDrag(event, marker.id),
            contextmenu: () => handleMarkerRightClick(marker.id),
          }}
        >
          <Popup>
            Latitude: {marker.position[0]}, Longitude: {marker.position[1]}
            <br />
            Right-click to delete this marker.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
