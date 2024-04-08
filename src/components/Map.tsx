import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import { useAppSelector } from "../redux/hooks";

const Map = () => {
  const shapes = useAppSelector((state) => state.shapes.data);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    mapRef.current = L.map("map-id", { zoomControl: false }).setView(
      [55.7558, 37.6173],
      4
    );

    mapRef.current.attributionControl.remove();

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    layerRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  useEffect(() => {
    layerRef.current?.clearLayers();

    shapes.forEach((shape) => {
      if (!layerRef.current) return;

      let coordinates;

      if (shape.geometry.type === "Point") {
        coordinates = shape.geometry.coordinates;
        L.marker(coordinates).addTo(layerRef.current);
      } else {
        coordinates = shape.geometry.coordinates[0];
        L.polygon(coordinates).addTo(layerRef.current);
      }
    });
  }, [shapes]);

  return <div id="map-id"></div>;
};

export default Map;
