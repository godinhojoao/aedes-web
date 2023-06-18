import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/marciofirmino/BrazilMap/master/Brasil_2.json";

type Location = {
  name: string;
  coordinates: [number, number];
};

// get this from backend
const locations: Location[] = [
  {
    name: "Bagé",
    coordinates: [-54.1059, -31.3298],
  },
  {
    name: "Location 2",
    coordinates: [-53.565859, -31.506423],
  },
];

export function ComplaintsMap() {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  const handleMouseEnter = (location: Location) => {
    setHoveredLocation(location);
  };

  const handleMouseLeave = () => {
    setHoveredLocation(null);
  };

  return (
    <div style={{ width: "100%" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 3200,
          center: [-53, -30.5],
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#DDD"
                stroke="#FFF"
              />
            ))
          }
        </Geographies>
        {locations.map((location, index) => {
          return (
            <Marker
              key={index}
              coordinates={location.coordinates}
              onMouseEnter={() => handleMouseEnter(location)}
              onMouseLeave={handleMouseLeave}
            >
              <circle
                r={4}
                fill={hoveredLocation === location ? "#FF0000" : "#F00"}
              />
              {hoveredLocation === location && (
                <text
                  textAnchor="middle"
                  y="-10"
                  style={{ fontFamily: "Arial", fontSize: "12px" }}
                >
                  {location.name}
                </text>
              )}
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
