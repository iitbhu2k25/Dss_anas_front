// app/vector/components/map.tsx
'use client';

import React, { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

export default function Map({
  sidebarCollapsed,
  onFeatureClick,
  currentLayer,
  activeFeature,
  compassVisible,
  gridVisible,
  showNotification
}) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [baseLayers, setBaseLayers] = useState({});
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);
  const drawnItemsRef = useRef(null);
  const gridLinesRef = useRef([]);
  const labelLayerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Dynamic imports for client-side only
      const L = require('leaflet');
      require('leaflet-draw');
      
      // Fix icon paths
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
      
      // Create map if it doesn't exist
      if (!map) {
        const newMap = L.map(mapRef.current, {
          zoomControl: false,
        }).setView([22.3511, 78.6677], 5);
        
        // Create basemaps
        const newBaseLayers = {
          streets: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }),
          satellite: L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; <a href="https://www.google.com/maps">Google Maps</a>',
          }),
          terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
          }),
          traffic: L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            attribution: '&copy; <a href="https://www.google.com/maps">Google Traffic</a>',
          }),
          hybrid: L.layerGroup([
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
              attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
              maxZoom: 19,
            }),
            L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.png', {
              attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              subdomains: 'abcd',
              maxZoom: 20,
              opacity: 0.7,
            }),
          ]),
          
          none: L.tileLayer('', {
            attribution: 'No basemap',
          }),
        };
        
        // Add default basemap
        newBaseLayers.traffic.addTo(newMap);
        
        // Scale control
        L.control.scale({
          imperial: false,
          position: 'bottomleft',
        }).addTo(newMap);
        
        

        // Drawing tools
        const drawnItems = new L.FeatureGroup();
        newMap.addLayer(drawnItems);
        drawnItemsRef.current = drawnItems;
        
        const drawControl = new L.Control.Draw({
          position: 'topright',
          draw: {
            polyline: {
              shapeOptions: {
                color: '#3498db',
                weight: 4,
              },
            },
            polygon: {
              allowIntersection: false,
              drawError: {
                color: '#e74c3c',
                timeout: 1000,
              },
              shapeOptions: {
                color: '#3498db',
              },
            },
            circle: {
              shapeOptions: {
                color: '#3498db',
              },
            },
            marker: true,
            rectangle: {
              shapeOptions: {
                color: '#3498db',
              },
            },
          },
          edit: {
            featureGroup: drawnItems,
          },
        });
        
        // Update coordinates on mouse move
        newMap.on('mousemove', (e) => {
          setCoordinates({
            lat: e.latlng.lat.toFixed(5),
            lng: e.latlng.lng.toFixed(5),
          });
        });
        
        // Handle drawing events
        newMap.on(L.Draw.Event.CREATED, function (event) {
          const layer = event.layer;
          drawnItems.addLayer(layer);
        
          // If it's a polygon, calculate area
          if (layer instanceof L.Polygon) {
            const latlngs = layer.getLatLngs()[0];
        
            // Calculate area (using simple formula for demo)
            let area = 0;
            for (let i = 0; i < latlngs.length; i++) {
              const j = (i + 1) % latlngs.length;
              area += latlngs[i].lng * latlngs[j].lat;
              area -= latlngs[j].lng * latlngs[i].lat;
            }
            area = Math.abs(area) * 0.5 * 111.32 * 111.32; // Rough conversion to square km
        
            layer
              .bindPopup(`<strong>Area:</strong> ${area.toFixed(2)} sq km`)
              .openPopup();
          }
        
          // If it's a polyline, calculate length
          if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
            const latlngs = layer.getLatLngs();
            let length = 0;
        
            for (let i = 0; i < latlngs.length - 1; i++) {
              length += latlngs[i].distanceTo(latlngs[i + 1]);
            }
        
            layer
              .bindPopup(
                `<strong>Length:</strong> ${(length / 1000).toFixed(2)} km`
              )
              .openPopup();
          }
        
          // If it's a marker, show coordinates
          if (layer instanceof L.Marker) {
            const latLng = layer.getLatLng();
            layer
              .bindPopup(
                `<strong>Coordinates:</strong><br>Lat: ${latLng.lat.toFixed(
                  5
                )}<br>Lng: ${latLng.lng.toFixed(5)}`
              )
              .openPopup();
          }
        
          showNotification(
            "Drawing Complete",
            "Your drawing has been added to the map",
            "success"
          );
        });
        
        setMap(newMap);
        setBaseLayers(newBaseLayers);
      }
      
    }
    
    // Cleanup
    return () => {
      if (map) {
        map.remove();
      }
    };
  }, []);

  // Update map size when sidebar collapses
  useEffect(() => {
    if (map) {
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    }
  }, [sidebarCollapsed, map]);

  // Handle compass visibility
  useEffect(() => {
    if (map) {
      const compass = document.getElementById('compass');
      if (compass) {
        compass.style.display = compassVisible ? 'flex' : 'none';
      }
    }
  }, [compassVisible, map]);

  // // Handle grid visibility
  // useEffect(() => {
  //   if (map && gridVisible) {
  //     addCoordinateGrid();
  //   } else if (map && !gridVisible) {
  //     removeCoordinateGrid();
  //   }
  // }, [gridVisible, map]);
  
  // Handle active feature highlighting
  useEffect(() => {
    if (currentLayer && activeFeature) {
      // Reset styles on all features
      currentLayer.eachLayer((layer) => {
        if (layer !== activeFeature) {
          currentLayer.resetStyle(layer);
        }
      });
      
      // Apply active style to selected feature
      activeFeature.setStyle({
        weight: 3,
        color: '#ff4444',
        fillOpacity: 0.7,
      });
    }
  }, [activeFeature, currentLayer]);

  // Function to add coordinate grid
  // const addCoordinateGrid = () => {
  //   if (!map) return;
    
  //   const L = require('leaflet');
    
  //   // Clear previous grid lines
  //   removeCoordinateGrid();
    
  //   // Latitude lines (every 5 degrees)
  //   for (let lat = 5; lat <= 40; lat += 5) {
  //     const line = L.polyline(
  //       [
  //         [lat, 65],
  //         [lat, 100],
  //       ],
  //       {
  //         color: '#3498db',
  //         weight: 1,
  //         opacity: 0.5,
  //         dashArray: '5,5',
  //       }
  //     ).addTo(map);

  //     const label = L.marker([lat, 65], {
  //       icon: L.divIcon({
  //         className: 'coordinate-label',
  //         html: `${lat}°N`,
  //         iconSize: [40, 20],
  //         iconAnchor: [0, 10],
  //       }),
  //     }).addTo(map);

  //     gridLinesRef.current.push(line, label);
  //   }

  //   // Longitude lines (every 5 degrees)
  //   for (let lng = 65; lng <= 100; lng += 5) {
  //     const line = L.polyline(
  //       [
  //         [5, lng],
  //         [40, lng],
  //       ],
  //       {
  //         color: '#3498db',
  //         weight: 1,
  //         opacity: 0.5,
  //         dashArray: '5,5',
  //       }
  //     ).addTo(map);

  //     const label = L.marker([5, lng], {
  //       icon: L.divIcon({
  //         className: 'coordinate-label',
  //         html: `${lng}°E`,
  //         iconSize: [40, 20],
  //         iconAnchor: [20, -5],
  //       }),
  //     }).addTo(map);

  //     gridLinesRef.current.push(line, label);
  //   }
  // };
  
  // Function to remove coordinate grid
  const removeCoordinateGrid = () => {
    if (!map) return;
    
    gridLinesRef.current.forEach((line) => {
      if (map.hasLayer(line)) {
        map.removeLayer(line);
      }
    });
    gridLinesRef.current = [];
  };

  // Function to change basemap
  const changeBasemap = (basemapId) => {
    if (!map || !baseLayers) return;
    
    // Remove all current layers
    Object.values(baseLayers).forEach((layer) => {
      if (map.hasLayer(layer)) {
        map.removeLayer(layer);
      }
    });

    // Add selected layer if it's not 'none'
    if (basemapId !== 'none') {
      map.addLayer(baseLayers[basemapId]);
    }

    // Show notification
    const basemapName = basemapId.charAt(0).toUpperCase() + basemapId.slice(1);
    showNotification(
      "Basemap Changed",
      `Switched to ${basemapName} basemap`,
      "info"
    );
  };

  // Function to handle zoom in
  const handleZoomIn = () => {
    if (map) map.zoomIn(1);
  };

  // Function to handle zoom out
  const handleZoomOut = () => {
    if (map) map.zoomOut(1);
  };

  // Function to handle home button
  const handleHomeClick = () => {
    if (map) {
      map.setView([22.3511, 78.6677], 4);
      showNotification("Map Reset", "Returned to default view", "info");
    }
  };

  // Function to handle locate button
  const handleLocateClick = () => {
    if (!map) return;
    
    showNotification("Location", "Finding your location...", "info");
    
    map.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true,  // Use GPS if available
      timeout: 10000,            // Wait up to 10 seconds
      maximumAge: 0              // Don't use cached location
    })
    .on("locationfound", function (e) {
      const L = require('leaflet');
      
      // Add a marker at the location
      const locationMarker = L.circleMarker(e.latlng, {
        radius: 8,
        color: "#3498db",
        weight: 3,
        opacity: 1,
        fillColor: "#3498db",
        fillOpacity: 0.4,
      }).addTo(map);
      
      showNotification(
        "Location Found", 
        "Your current location has been located",
        "success"
      );
    })
    .on("locationerror", function (e) {
      const L = require('leaflet');
      
      // Fallback for demo or if geolocation fails
      const randomLat = 22.3511 + (Math.random() * 2 - 1);
      const randomLng = 78.6677 + (Math.random() * 2 - 1);
      map.setView([randomLat, randomLng], 10);
      
      L.marker([randomLat, randomLng])
        .addTo(map)
        .bindPopup("Simulated location (Geolocation not available)")
        .openPopup();
      
      showNotification(
        "Location Simulated",
        "Using demo location (geolocation unavailable)",
        "info"
      );
    });
  };

  // Function to handle fullscreen
  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        showNotification(
          "Error",
          `Fullscreen failed: ${err.message}`,
          "error"
        );
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Function to handle shapefile download
  const handleDownload = () => {
    showNotification(
      "Download Started",
      "Your vector data is being downloaded",
      "success"
    );
  };

  return (
    <div className="relative flex-1">
      <div className="relative w-full h-full">
        <div ref={mapRef} className="w-full h-[calc(100vh-56px)]" />
        
        {/* Compass */}
        {compassVisible && (
          <div id="compass" className="absolute top-20 left-5 z-10 w-[100px] h-[100px] bg-white/90 rounded-full shadow-md flex items-center justify-center pointer-events-none transition-all duration-300 backdrop-blur-sm">
            <div className="w-[90px] h-[90px] relative animate-[compass-fade-in_1s_ease]">
              <div className="absolute top-0 left-0 w-full h-full border-2 border-blue-500/20 rounded-full"></div>
              <div className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] rounded-full bg-gradient-to-br from-gray-50 to-gray-200 shadow-inner"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-[70%] -translate-x-1/2 -translate-y-1/2 origin-center">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-t from-transparent to-red-600 clip-path-triangle-n transform-origin-bottom"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-gray-800 clip-path-triangle-s transform-origin-top"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white to-gray-300 rounded-full shadow-sm z-[3]"></div>
              <div className="absolute top-0 left-0 w-full h-full font-['Poppins',sans-serif] font-semibold text-xs pointer-events-none">
                <div className="absolute top-[5px] left-1/2 -translate-x-1/2 text-red-600">N</div>
                <div className="absolute top-[18%] right-[18%] text-gray-600 text-[10px]">NE</div>
                <div className="absolute top-1/2 right-[5px] -translate-y-1/2 text-gray-600">E</div>
                <div className="absolute bottom-[18%] right-[18%] text-gray-600 text-[10px]">SE</div>
                <div className="absolute bottom-[5px] left-1/2 -translate-x-1/2 text-gray-600">S</div>
                <div className="absolute bottom-[18%] left-[18%] text-gray-600 text-[10px]">SW</div>
                <div className="absolute top-1/2 left-[5px] -translate-y-1/2 text-gray-600">W</div>
                <div className="absolute top-[18%] left-[18%] text-gray-600 text-[10px]">NW</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Download Button */}
        <button 
          onClick={handleDownload}
          className="absolute top-5 right-5 bg-white rounded-lg py-2.5 px-4 shadow-md z-10 flex items-center font-medium text-gray-700 cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg">
          <i className="fas fa-download mr-2 text-blue-500 hover:text-white transition-colors"></i> Download Shapefile
        </button>
        
        {/* Map Controls */}
        <div className="absolute right-5 bottom-8 bg-white rounded-xl shadow-md z-10 flex flex-col p-1.5 transition-transform duration-300 hover:-translate-x-1">
          <button onClick={handleZoomIn} className="w-10 h-10 border-none bg-white rounded-lg my-0.5 cursor-pointer transition-all duration-200 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white hover:scale-110" title="Zoom In">
            <i className="fas fa-plus"></i>
          </button>
          <button onClick={handleZoomOut} className="w-10 h-10 border-none bg-white rounded-lg my-0.5 cursor-pointer transition-all duration-200 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white hover:scale-110" title="Zoom Out">
            <i className="fas fa-minus"></i>
          </button>
          <button onClick={handleHomeClick} className="w-10 h-10 border-none bg-white rounded-lg my-0.5 cursor-pointer transition-all duration-200 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white hover:scale-110" title="Default View">
            <i className="fas fa-home"></i>
          </button>
          <button onClick={handleLocateClick} className="w-10 h-10 border-none bg-white rounded-lg my-0.5 cursor-pointer transition-all duration-200 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white hover:scale-110 relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-lg after:bg-blue-500 after:z-[-1] after:opacity-50 after:animate-ping" title="My Location">
            <i className="fas fa-location-arrow"></i>
          </button>
          <button onClick={handleFullScreen} className="w-10 h-10 border-none bg-white rounded-lg my-0.5 cursor-pointer transition-all duration-200 flex items-center justify-center text-gray-700 hover:bg-blue-500 hover:text-white hover:scale-110" title="Fullscreen">
            <i className="fas fa-expand"></i>
          </button>
        </div>
        
       
        
        
        
        {/* Loader */}
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 py-6 px-8 rounded-2xl shadow-md z-10 flex items-center transition-all duration-300 animate-fade-in">
            <div className="mr-4">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <span className="text-gray-700">Loading vector data...</span>
          </div>
        )}
      </div>
    </div>
  );
}