// app/vector/components/sidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function Sidebar({
  collapsed,
  onToggle,
  onMapLayerChange,
  onFeatureInfoToggle,
  onCompassToggle,
  onGridToggle,
  showNotification
}) {
  // Subcategories mapping
  const subcategories = {
    administrative: ["district", "villages"],
    watershed: ["varuna", "basuhi", "morwa", "all"],
    rivers: ["varuna", "basuhi", "morwa"],
    drains: ["varuna", "basuhi", "morwa"],
    canals: ["all"],
    household: [
      "All",
      "Bhadohi",
      "Jaunpur",
      "Pratapgarh",
      "Prayajraj",
      "Varanasi",
    ],
    roads: ["all"],
    railways: ["all"],
    industries: ["all"],
    stps: ["all"],
  };

  // State for form fields
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [lineColor, setLineColor] = useState('#000000');
  const [fillColor, setFillColor] = useState('#78b4db');
  const [opacity, setOpacity] = useState(0.8);
  const [weight, setWeight] = useState(2);
  const [showLabels, setShowLabels] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [showCompass, setShowCompass] = useState(true);
  const [mapTitle, setMapTitle] = useState('');
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportDPI, setExportDPI] = useState('2');
  const [exportLayout, setExportLayout] = useState('a4-landscape');

  // Dropdown state
  const [openDropdown, setOpenDropdown] = useState('');

  // Update subcategory dropdown when category changes
  useEffect(() => {
    setSubcategory('');
  }, [category]);

  // Update map options when they change
  useEffect(() => {
    if (onGridToggle) onGridToggle(showGrid);
  }, [showGrid, onGridToggle]);

  useEffect(() => {
    if (onFeatureInfoToggle) onFeatureInfoToggle(showInfoPanel);
  }, [showInfoPanel, onFeatureInfoToggle]);

  useEffect(() => {
    if (onCompassToggle) onCompassToggle(showCompass);
  }, [showCompass, onCompassToggle]);

  // Handle dropdown toggle
  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? '' : id);
  };

  // Load shapefile data
  const loadShapefile = async () => {
    if (!category || !subcategory) {
      showNotification('Error', 'Please select both category and subcategory', 'error');
      return;
    }

    try {
      showNotification('Loading', 'Fetching vector data...', 'info');
      
      // Simulate API call
      setTimeout(() => {
        // This would be where you fetch and process the GeoJSON data
        showNotification('Success', 'Vector data loaded successfully', 'success');
      }, 1500);
    } catch (error) {
      showNotification('Error', `Failed to load data: ${error.message}`, 'error');
    }
  };

  // Handle export
  const handleExport = () => {
    const title = mapTitle || 'India GIS Vector Map';
    showNotification('Exporting', `Preparing ${exportFormat.toUpperCase()} export...`, 'info');
    
    // Simulate export process
    setTimeout(() => {
      showNotification('Export Complete', `Map exported as ${exportFormat.toUpperCase()} successfully`, 'success');
    }, 2000);
  };

  // Handle basemap change
  const selectBasemap = (basemap) => {
    // Logic for changing basemap would go here
    showNotification('Basemap Changed', `Switched to ${basemap} basemap`, 'info');
    toggleDropdown('');
  };

  // Handle drawing tool selection
  const selectDrawingTool = (tool) => {
    showNotification('Drawing Tool', `${tool} tool activated`, 'info');
    toggleDropdown('');
  };

  // Handle analysis tool selection
  const selectAnalysisTool = (tool) => {
    showNotification('Analysis Tool', `${tool} analysis tool selected`, 'info');
    toggleDropdown('');
  };

  return (
    <>
      <div 
        className={`w-[300px] bg-white p-5 overflow-y-auto transition-all duration-300 z-10 border-r border-gray-200 shadow-md flex-shrink-0 ${
          collapsed ? 'w-0 p-0 overflow-hidden' : ''
        }`}
      >
        <div className="flex justify-between items-center mb-5 pb-2.5 border-b-2 border-blue-500">
          <h5 className="font-semibold text-gray-700">Control Panel</h5>
        </div>

        {/* Feature Selection */}
        <div className="bg-gray-50 rounded-lg p-4 mb-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="text-base font-semibold mb-4 text-gray-700 flex items-center">
            <i className="fas fa-layer-group mr-2 text-blue-500"></i> Feature Selection
          </div>
          
          <div className="mb-3">
            <select 
              id="categorySelect" 
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm cursor-pointer transition-all duration-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27%233498db%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_12px] bg-[length:12px]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled selected>Select Category</option>
              <option value="administrative">Administrative</option>
              <option value="watershed">Watershed</option>
              <option value="rivers">Rivers</option>
              <option value="drains">Drains</option>
              <option value="canals">Canals</option>
              <option value="household">Household</option>
              <option value="roads">Roads</option>
              <option value="railways">Railways</option>
              <option value="industries">Industries</option>
              <option value="stps">STPs</option>
            </select>
          </div>

          <div className="mb-3">
            <select 
              id="subcategorySelect" 
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm cursor-pointer transition-all duration-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27%233498db%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_12px] bg-[length:12px]"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={!category}
            >
              <option value="" disabled selected>Select Subcategory</option>
              {category && subcategories[category]?.map((sub) => (
                <option key={sub} value={sub}>{sub.charAt(0).toUpperCase() + sub.slice(1)}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={loadShapefile}
            disabled={!category || !subcategory}
            className={`w-full py-3 px-5 mt-4 rounded-lg border-none text-white font-medium flex justify-center items-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative ${
              !category || !subcategory 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 after:content-[""] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-lg after:bg-blue-500 after:z-[-1] after:opacity-50 after:animate-pulse'
            }`}
          >
            <i className="fas fa-map-marked-alt mr-2"></i> Plot Features
          </button>
        </div>

        {/* Map Options */}
        <div className="bg-gray-50 rounded-lg p-4 mb-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="text-base font-semibold mb-4 text-gray-700 flex items-center">
            <i className="fas fa-map mr-2 text-blue-500"></i> Map Options
          </div>

          {/* Basemap Dropdown */}
          <div className="relative mb-3">
            <div 
              className={`flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300 cursor-pointer transition-all duration-300 hover:border-blue-500 ${openDropdown === 'basemap' ? 'border-blue-500 rounded-b-none bg-gray-50 shadow-sm' : ''}`}
              onClick={() => toggleDropdown('basemap')}
            >
              <div><i className="fas fa-map mr-2 text-blue-500"></i> Base Map</div>
              <i className={`fas fa-chevron-down transition-transform duration-300 ${openDropdown === 'basemap' ? 'rotate-180' : ''}`}></i>
            </div>
            
            <div className={`absolute left-0 right-0 bg-white border border-blue-500 border-t-0 rounded-b-lg shadow-md z-[1001] transition-all duration-300 ${
              openDropdown === 'basemap' 
                ? 'max-h-[300px] opacity-100 translate-y-0' 
                : 'max-h-0 opacity-0 -translate-y-2 overflow-hidden border-none'
            }`}>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectBasemap('Streets')}>
                <i className="fas fa-road mr-2.5 w-5 text-center text-blue-500"></i> Streets
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectBasemap('Satellite')}>
                <i className="fas fa-satellite mr-2.5 w-5 text-center text-blue-500"></i> Satellite
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectBasemap('Terrain')}>
                <i className="fas fa-mountain mr-2.5 w-5 text-center text-blue-500"></i> Terrain
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectBasemap('Traffic')}>
                <i className="fas fa-car mr-2.5 w-5 text-center text-blue-500"></i> Traffic
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectBasemap('Hybrid')}>
                <i className="fas fa-globe mr-2.5 w-5 text-center text-blue-500"></i> Hybrid
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1" onClick={() => selectBasemap('None')}>
                <i className="fas fa-ban mr-2.5 w-5 text-center text-blue-500"></i> No Basemap
              </div>
            </div>
          </div>

          {/* Drawing Tools Dropdown */}
          <div className="relative mb-3">
            <div 
              className={`flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300 cursor-pointer transition-all duration-300 hover:border-blue-500 ${openDropdown === 'drawing' ? 'border-blue-500 rounded-b-none bg-gray-50 shadow-sm' : ''}`}
              onClick={() => toggleDropdown('drawing')}
            >
              <div><i className="fas fa-pencil-alt mr-2 text-blue-500"></i> Drawing Tools</div>
              <i className={`fas fa-chevron-down transition-transform duration-300 ${openDropdown === 'drawing' ? 'rotate-180' : ''}`}></i>
            </div>
            
            <div className={`absolute left-0 right-0 bg-white border border-blue-500 border-t-0 rounded-b-lg shadow-md z-[1001] transition-all duration-300 ${
              openDropdown === 'drawing' 
                ? 'max-h-[300px] opacity-100 translate-y-0' 
                : 'max-h-0 opacity-0 -translate-y-2 overflow-hidden border-none'
            }`}>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectDrawingTool('Point')}>
                <i className="fas fa-map-marker-alt mr-2.5 w-5 text-center text-blue-500"></i> Add Point
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectDrawingTool('Line')}>
                <i className="fas fa-slash mr-2.5 w-5 text-center text-blue-500"></i> Draw Line
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectDrawingTool('Polygon')}>
                <i className="fas fa-draw-polygon mr-2.5 w-5 text-center text-blue-500"></i> Draw Polygon
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectDrawingTool('Measure')}>
                <i className="fas fa-ruler mr-2.5 w-5 text-center text-blue-500"></i> Measure
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1" onClick={() => selectDrawingTool('Clear')}>
                <i className="fas fa-trash-alt mr-2.5 w-5 text-center text-blue-500"></i> Clear All
              </div>
            </div>
          </div>

          {/* Analysis Tools Dropdown */}
          <div className="relative mb-3">
            <div 
              className={`flex justify-between items-center p-3 bg-white rounded-lg border border-gray-300 cursor-pointer transition-all duration-300 hover:border-blue-500 ${openDropdown === 'analysis' ? 'border-blue-500 rounded-b-none bg-gray-50 shadow-sm' : ''}`}
              onClick={() => toggleDropdown('analysis')}
            >
              <div><i className="fas fa-chart-line mr-2 text-blue-500"></i> Analysis Tools</div>
              <i className={`fas fa-chevron-down transition-transform duration-300 ${openDropdown === 'analysis' ? 'rotate-180' : ''}`}></i>
            </div>
            
            <div className={`absolute left-0 right-0 bg-white border border-blue-500 border-t-0 rounded-b-lg shadow-md z-[1001] transition-all duration-300 ${
              openDropdown === 'analysis' 
                ? 'max-h-[300px] opacity-100 translate-y-0' 
                : 'max-h-0 opacity-0 -translate-y-2 overflow-hidden border-none'
            }`}>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectAnalysisTool('Buffer Zone')}>
                <i className="fas fa-expand-alt mr-2.5 w-5 text-center text-blue-500"></i> Buffer Zone
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectAnalysisTool('Intersection')}>
                <i className="fas fa-object-group mr-2.5 w-5 text-center text-blue-500"></i> Intersection
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectAnalysisTool('Dissolve')}>
                <i className="fas fa-object-ungroup mr-2.5 w-5 text-center text-blue-500"></i> Dissolve
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectAnalysisTool('Statistics')}>
                <i className="fas fa-calculator mr-2.5 w-5 text-center text-blue-500"></i> Statistics
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1 border-b border-gray-100" onClick={() => selectAnalysisTool('Euclidean Distance')}>
                <i className="fas fa-calculator mr-2.5 w-5 text-center text-blue-500"></i> Euclidean Distance
              </div>
              <div className="p-3 cursor-pointer flex items-center hover:bg-gray-50 transition-transform duration-200 hover:translate-x-1" onClick={() => selectAnalysisTool('Union')}>
                <i className="fas fa-calculator mr-2.5 w-5 text-center text-blue-500"></i> Union
              </div>
            </div>
          </div>
        </div>

        {/* Style Options */}
        <div className="bg-gray-50 rounded-lg p-4 mb-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="text-base font-semibold mb-4 text-gray-700 flex items-center">
            <i className="fas fa-palette mr-2 text-blue-500"></i> Style Options
          </div>

          <div className="flex items-center gap-5 mb-4">
            <div className="flex items-center">
              <label htmlFor="lineColor" className="text-sm text-gray-700 mr-2">Line Color:</label>
              <input 
                type="color" 
                id="lineColor" 
                value={lineColor}
                onChange={(e) => setLineColor(e.target.value)}
                className="h-8 w-8 p-0 border-0 rounded cursor-pointer bg-transparent"
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="fillColor" className="text-sm text-gray-700 mr-2">Fill Color:</label>
              <input 
                type="color" 
                id="fillColor" 
                value={fillColor}
                onChange={(e) => setFillColor(e.target.value)}
                className="h-8 w-8 p-0 border-0 rounded cursor-pointer bg-transparent"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="opacity" className="block text-sm text-gray-700 mb-1">
              Opacity: <span id="opacityValue">{opacity}</span>
            </label>
            <input 
              type="range" 
              id="opacity" 
              min="0.1" 
              max="1" 
              step="0.1" 
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-md appearance-none cursor-pointer focus:outline-none"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="weight" className="block text-sm text-gray-700 mb-1">
              Line Weight: <span id="weightValue">{weight}</span>
            </label>
            <input 
              type="range" 
              id="weight" 
              min="1" 
              max="10" 
              step="1" 
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-md appearance-none cursor-pointer focus:outline-none"
            />
          </div>

          <div className="flex items-center mb-2">
            <input 
              className="mr-2 rounded text-blue-500 focus:ring-blue-500" 
              type="checkbox" 
              id="toggleLabels"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
            />
            <label className="text-sm text-gray-700" htmlFor="toggleLabels">Show Labels</label>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-gray-50 rounded-lg p-4 mb-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="text-base font-semibold mb-4 text-gray-700 flex items-center">
            <i className="fas fa-sliders-h mr-2 text-blue-500"></i> Display Settings
          </div>

          <div className="flex items-center mb-2">
            <input 
              className="mr-2 rounded text-blue-500 focus:ring-blue-500" 
              type="checkbox" 
              id="grid-toggle"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            <label className="text-sm text-gray-700" htmlFor="grid-toggle">Coordinate Grid</label>
          </div>

          <div className="flex items-center mb-2">
            <input 
              className="mr-2 rounded text-blue-500 focus:ring-blue-500" 
              type="checkbox" 
              id="info-toggle"
              checked={showInfoPanel}
              onChange={(e) => setShowInfoPanel(e.target.checked)}
            />
            <label className="text-sm text-gray-700" htmlFor="info-toggle">Show Info Panel</label>
          </div>

          <div className="flex items-center">
            <input 
              className="mr-2 rounded text-blue-500 focus:ring-blue-500" 
              type="checkbox" 
              id="compass-toggle"
              checked={showCompass}
              onChange={(e) => setShowCompass(e.target.checked)}
            />
            <label className="text-sm text-gray-700" htmlFor="compass-toggle">Show Compass</label>
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-gray-50 rounded-lg p-4 mb-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="text-base font-semibold mb-4 text-gray-700 flex items-center">
            <i className="fas fa-file-export mr-2 text-blue-500"></i> Export Options
          </div>

          <div className="mb-2">
            <label htmlFor="mapTitle" className="block text-sm text-gray-700 mb-1">Map Title:</label>
            <input 
              type="text" 
              id="mapTitle" 
              placeholder="Enter title..." 
              value={mapTitle}
              onChange={(e) => setMapTitle(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exportFormat" className="block text-sm text-gray-700 mb-1">Export Format:</label>
            <select 
              id="exportFormat" 
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm cursor-pointer transition-all duration-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27%233498db%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_12px] bg-[length:12px]"
            >
              <option value="pdf">.pdf</option>
              <option value="svg">.svg</option>
              <option value="jpg">.jpeg</option>
              <option value="tif">.tif</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="exportDPI" className="block text-sm text-gray-700 mb-1">Export Quality (DPI):</label>
            <select 
              id="exportDPI" 
              value={exportDPI}
              onChange={(e) => setExportDPI(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm cursor-pointer transition-all duration-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27%233498db%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_12px] bg-[length:12px]"
            >
              <option value="1">Low (72 DPI)</option>
              <option value="2">Medium (150 DPI)</option>
              <option value="3">High (300 DPI)</option>
              <option value="4">Ultra High (600 DPI)</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="exportLayout" className="block text-sm text-gray-700 mb-1">Paper Layout:</label>
            <select 
              id="exportLayout" 
              value={exportLayout}
              onChange={(e) => setExportLayout(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm cursor-pointer transition-all duration-300 hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 fill=%27%233498db%27 viewBox=%270 0 16 16%27%3E%3Cpath d=%27M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z%27/%3E%3C/svg%3E')] bg-no-repeat bg-[center_right_12px] bg-[length:12px]"
            >
              <option value="a4-landscape">A4 Landscape</option>
              <option value="a4-portrait">A4 Portrait</option>
              <option value="a3-landscape">A3 Landscape</option>
              <option value="a3-portrait">A3 Portrait</option>
              <option value="letter-landscape">Letter Landscape</option>
              <option value="letter-portrait">Letter Portrait</option>
              <option value="legal-landscape">Legal Landscape</option>
              <option value="legal-portrait">Legal Portrait</option>
            </select>
          </div>
          
          <button 
            onClick={handleExport}
            className="w-full py-3 px-5 mt-2 rounded-lg border-none bg-green-500 text-white font-medium flex justify-center items-center cursor-pointer transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:-translate-y-1"
          >
            <i className="fas fa-download mr-2"></i> Export Map
          </button>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={onToggle}
        className={`absolute z-[999] flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md border-none cursor-pointer transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-110 ${
          collapsed 
            ? 'left-5 top-5' 
            : 'left-[300px] top-5'
        }`}
      >
        <i className={`fas ${collapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
      </button>
    </>
  );