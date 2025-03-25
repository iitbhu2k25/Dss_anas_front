// app/vector/page.tsx
'use client';

import React from 'react';
import Map from '../vector/components/map';
import Sidebar from '../vector/components/sidebar';
import Features from '../vector/components/features';
// import '';
import { Metadata } from 'next';

export default function VectorPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [featureInfoVisible, setFeatureInfoVisible] = React.useState(true);
  const [currentLayer, setCurrentLayer] = React.useState(null);
  const [activeFeature, setActiveFeature] = React.useState(null);
  const [featureProperties, setFeatureProperties] = React.useState(null);
  const [compassVisible, setCompassVisible] = React.useState(true);
  const [gridVisible, setGridVisible] = React.useState(true);
  
  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleFeatureClick = (feature, layer) => {
    setActiveFeature(layer);
    setFeatureProperties(feature.properties);
  };

  const handleFeatureInfoToggle = (visible) => {
    setFeatureInfoVisible(visible);
  };

  const handleCompassToggle = (visible) => {
    setCompassVisible(visible);
  };

  const handleGridToggle = (visible) => {
    setGridVisible(visible);
  };

  // Create a notification system
  const [notification, setNotification] = React.useState({
    show: false,
    title: '',
    message: '',
    type: 'success'
  });

  const showNotification = (title, message, type = 'success') => {
    setNotification({
      show: true,
      title,
      message,
      type
    });

    // Auto hide after 4 seconds
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-blue-600 text-white p-3 shadow-md z-10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <i className="fas fa-globe-asia text-2xl mr-2"></i>
              <h3 className="text-xl font-semibold m-0">India GIS Vector Data Viewer</h3>
            </div>
            <div className="text-right">
              <span className="text-light">Advanced Geospatial Analysis Tool</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 relative">
        <Sidebar 
          collapsed={sidebarCollapsed}
          onToggle={handleSidebarToggle}
          onMapLayerChange={setCurrentLayer}
          onFeatureInfoToggle={handleFeatureInfoToggle}
          onCompassToggle={handleCompassToggle}
          onGridToggle={handleGridToggle}
          showNotification={showNotification}
        />
        
        <div className="flex flex-1 relative">
          <Map 
            sidebarCollapsed={sidebarCollapsed}
            onFeatureClick={handleFeatureClick}
            currentLayer={currentLayer}
            activeFeature={activeFeature}
            compassVisible={compassVisible}
            gridVisible={gridVisible}
            showNotification={showNotification}/>
          
          {featureInfoVisible && (
            <Features 
              properties={featureProperties}
              onClose={() => handleFeatureInfoToggle(false)}
            />
          )}
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div 
          className={`fixed bottom-5 right-5 bg-white border-l-4 p-4 rounded-lg shadow-lg z-50 min-w-[300px] transform transition-transform ${
            notification.show ? 'translate-y-0' : 'translate-y-20'
          } ${
            notification.type === 'success' ? 'border-green-500' : 
            notification.type === 'error' ? 'border-red-500' : 'border-blue-500'
          }`}
        >
          <div className="flex items-center mb-1">
            <i className={`fas fa-${
              notification.type === 'success' ? 'check-circle text-green-500' : 
              notification.type === 'error' ? 'exclamation-circle text-red-500' : 'info-circle text-blue-500'
            } mr-2 text-xl`}></i>
            <div className="font-semibold text-gray-800">{notification.title}</div>
          </div>
          <div className="text-gray-600 text-sm">{notification.message}</div>
        </div>
      )}
    </div>
  );
}

