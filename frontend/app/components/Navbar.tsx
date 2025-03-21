'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  // Handle sticky navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Toggle submenu visibility
  const toggleSubmenu = (e, key) => {
    e.stopPropagation();
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <nav className={`${isSticky ? 'bg-orange-300 shadow-md fixed top-0 left-0 w-full' : 'bg-opacity-10  bg-[#081F5C]'} border-b border-white border-opacity-20 py-4 relative transition-all duration-300 z-40`}>
      <div className="container mx-auto px-4">
        {/* Mobile menu button */}
        <div className="flex justify-between items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        {/* Navbar items */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} lg:block`}>
          <ul className="flex flex-col lg:flex-row lg:justify-center space-y-2 lg:space-y-0">
            {/* Home */}
            <li className="relative group">
              <Link href="/" className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300">
                Home
              </Link>
            </li>

            {/* About */}
            <li className="relative group">
              <Link href="/about" className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300">
                About
              </Link>
            </li>

            {/* Basic Modules */}
            <li className="relative group">
              <button 
                onClick={() => toggleDropdown('basicModules')}
                className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 focus:outline-none"
              >
                Basic Modules <ChevronDown className="inline ml-1 w-4 h-4" />
              </button>
              <ul className={`${openDropdowns.basicModules ? 'block' : 'hidden'} lg:hidden lg:group-hover:block absolute left-0 top-full bg-white bg-opacity-95 border border-gray-200 border-opacity-10 rounded-lg shadow-lg min-w-[200px] p-3 z-50`}>
                <li>
                  <Link href="/population/time-series" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                    Population Estimation and Forecasting
                  </Link>
                </li>
                <li>
                  <Link href="/waterdemand" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                    Water Demand
                  </Link>
                </li>
                <li>
                  <Link href="/watersupply" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                    Water Supply
                  </Link>
                </li>
                <li>
                  <Link href="/sewage" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                    Sewage Generation
                  </Link>
                </li>
              </ul>
            </li>

            {/* GWM */}
            <li className="relative group">
              <button 
                onClick={() => toggleDropdown('gwm')}
                className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 focus:outline-none"
              >
                GWM <ChevronDown className="inline ml-1 w-4 h-4" />
                <span className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-orange-500 bg-opacity-90 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:ml-[-5px] after:border-[5px] after:border-solid after:border-t-blue-900 after:border-r-transparent after:border-b-transparent after:border-l-transparent">
                  Ground Water Management
                </span>
              </button>
              <ul className={`${openDropdowns.gwm ? 'block' : 'hidden'} lg:hidden lg:group-hover:block absolute left-0 top-full bg-white bg-opacity-95 border border-gray-200 border-opacity-10 rounded-lg shadow-lg min-w-[200px] p-3 z-50`}>
                {/* Groundwater Potential Assessment */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'gwPotential')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Groundwater Potential Assessment
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.gwPotential ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Pumping Location Identification
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        GW Potential Zone
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Resource Estimation */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'gwResource')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Resource Estimation
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.gwResource ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Regional Scale Quantification
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Quality Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Identification Of Vulnerable zones
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Managed Aquifer Recharge */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'gwAquifer')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Managed Aquifer Recharge
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.gwAquifer ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Local Scale Water Estimation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Climate Change
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Site suitability For MAR
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Optimized Solution
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* River Aquifer Interaction */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'gwRiver')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    River Aquifer Interaction
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.gwRiver ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Baseflow Estimation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Climate Change and Mitigation
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            {/* RWM */}
            <li className="relative group">
              <button 
                onClick={() => toggleDropdown('rwm')}
                className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 focus:outline-none"
              >
                RWM <ChevronDown className="inline ml-1 w-4 h-4" />
                <span className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-orange-500 bg-opacity-90 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:ml-[-5px] after:border-[5px] after:border-solid after:border-t-blue-900 after:border-r-transparent after:border-b-transparent after:border-l-transparent">
                  River Water Management
                </span>
              </button>
              <ul className={`${openDropdowns.rwm ? 'block' : 'hidden'} lg:hidden lg:group-hover:block absolute left-0 top-full bg-white bg-opacity-95 border border-gray-200 border-opacity-10 rounded-lg shadow-lg min-w-[200px] p-3 z-50`}>
                {/* Resource Estimation */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmResource')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Resource Estimation
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmResource ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Availability
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Flow and Storage Estimation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Quality Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Vulnerability Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contamination Risk Assessment
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Flood Forecasting and Management */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmFlood')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Flood Forecasting and Management
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmFlood ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Flood simulation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        River Routing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contaminant Transport Modelling
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Additional RWM items would be added here */}
              </ul>
            </li>

            <li className="relative group">
              <button 
                onClick={() => toggleDropdown('wrm')}
                className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 focus:outline-none"
              >
                WRM <ChevronDown className="inline ml-1 w-4 h-4" />
                <span className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-orange-500 bg-opacity-90 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:ml-[-5px] after:border-[5px] after:border-solid after:border-t-blue-900 after:border-r-transparent after:border-b-transparent after:border-l-transparent">
                  Water Resource management
                </span>
              </button>
              <ul className={`${openDropdowns.wrm ? 'block' : 'hidden'} lg:hidden lg:group-hover:block absolute left-0 top-full bg-white bg-opacity-95 border border-gray-200 border-opacity-10 rounded-lg shadow-lg min-w-[200px] p-3 z-50`}>
                {/* Resource Estimation */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'wrmResource')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Demand and Forcasting
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.wrmResource ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Current Consumption Pattern
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Future Demand Projection
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Flood Forecasting and Management */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'wrmresource')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Flood Forecasting and Management
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmFlood ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Flood simulation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        River Routing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contaminant Transport Modelling
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Additional RWM items would be added here */}
              </ul>
            </li>

            <li className="relative group">
              <button 
                onClick={() => toggleDropdown('rwm')}
                className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 focus:outline-none"
              >
                RWM <ChevronDown className="inline ml-1 w-4 h-4" />
                <span className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-orange-500 bg-opacity-90 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:ml-[-5px] after:border-[5px] after:border-solid after:border-t-blue-900 after:border-r-transparent after:border-b-transparent after:border-l-transparent">
                  River Water Management
                </span>
              </button>
              <ul className={`${openDropdowns.rwm ? 'block' : 'hidden'} lg:hidden lg:group-hover:block absolute left-0 top-full bg-white bg-opacity-95 border border-gray-200 border-opacity-10 rounded-lg shadow-lg min-w-[200px] p-3 z-50`}>
                {/* Resource Estimation */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmResource')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Resource Estimation
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmResource ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Availability
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Flow and Storage Estimation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Quality Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Vulnerability Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contamination Risk Assessment
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Flood Forecasting and Management */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmFlood')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Flood Forecasting and Management
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmFlood ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Flood simulation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        River Routing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contaminant Transport Modelling
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Additional RWM items would be added here */}
              </ul>
            </li>
            <li className="relative group">
              <button 
                onClick={() => toggleDropdown('rwm')}
                className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 focus:outline-none"
              >
                RWM <ChevronDown className="inline ml-1 w-4 h-4" />
                <span className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-orange-500 bg-opacity-90 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:ml-[-5px] after:border-[5px] after:border-solid after:border-t-blue-900 after:border-r-transparent after:border-b-transparent after:border-l-transparent">
                  River Water Management
                </span>
              </button>
              <ul className={`${openDropdowns.rwm ? 'block' : 'hidden'} lg:hidden lg:group-hover:block absolute left-0 top-full bg-white bg-opacity-95 border border-gray-200 border-opacity-10 rounded-lg shadow-lg min-w-[200px] p-3 z-50`}>
                {/* Resource Estimation */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmResource')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Resource Estimation
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmResource ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Availability
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Flow and Storage Estimation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Quality Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Vulnerability Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contamination Risk Assessment
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Flood Forecasting and Management */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmFlood')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Flood Forecasting and Management
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmFlood ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Flood simulation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        River Routing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contaminant Transport Modelling
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Additional RWM items would be added here */}
              </ul>
            </li>
            <li className="relative group">
              <button 
                onClick={() => toggleDropdown('rwm')}
                className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 focus:outline-none"
              >
                RWM <ChevronDown className="inline ml-1 w-4 h-4" />
                <span className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-orange-500 bg-opacity-90 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:ml-[-5px] after:border-[5px] after:border-solid after:border-t-blue-900 after:border-r-transparent after:border-b-transparent after:border-l-transparent">
                  River Water Management
                </span>
              </button>
              <ul className={`${openDropdowns.rwm ? 'block' : 'hidden'} lg:hidden lg:group-hover:block absolute left-0 top-full bg-white bg-opacity-95 border border-gray-200 border-opacity-10 rounded-lg shadow-lg min-w-[200px] p-3 z-50`}>
                {/* Resource Estimation */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmResource')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Resource Estimation
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmResource ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Availability
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Flow and Storage Estimation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Quality Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Vulnerability Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contamination Risk Assessment
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Flood Forecasting and Management */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmFlood')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Flood Forecasting and Management
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmFlood ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Flood simulation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        River Routing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contaminant Transport Modelling
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Additional RWM items would be added here */}
              </ul>
            </li>
            <li className="relative group">
              <button 
                onClick={() => toggleDropdown('rwm')}
                className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 focus:outline-none"
              >
                RWM <ChevronDown className="inline ml-1 w-4 h-4" />
                <span className="absolute top-[-35px] left-1/2 transform -translate-x-1/2 bg-orange-500 bg-opacity-90 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 after:content-[''] after:absolute after:top-full after:left-1/2 after:ml-[-5px] after:border-[5px] after:border-solid after:border-t-blue-900 after:border-r-transparent after:border-b-transparent after:border-l-transparent">
                  River Water Management
                </span>
              </button>
              <ul className={`${openDropdowns.rwm ? 'block' : 'hidden'} lg:hidden lg:group-hover:block absolute left-0 top-full bg-white bg-opacity-95 border border-gray-200 border-opacity-10 rounded-lg shadow-lg min-w-[200px] p-3 z-50`}>
                {/* Resource Estimation */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmResource')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Resource Estimation
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmResource ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Availability
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Flow and Storage Estimation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Water Quality Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Vulnerability Assessment
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contamination Risk Assessment
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Flood Forecasting and Management */}
                <li className="relative">
                  <button 
                    onClick={(e) => toggleSubmenu(e, 'rwmFlood')}
                    className="w-full text-left px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200 flex justify-between items-center"
                  >
                    Flood Forecasting and Management
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ul className={`${openDropdowns.rwmFlood ? 'block' : 'hidden'} lg:hidden lg:absolute lg:left-full lg:top-0 lg:bg-white lg:bg-opacity-95 lg:border lg:border-gray-200 lg:border-opacity-10 lg:rounded-lg lg:shadow-lg lg:min-w-[200px] lg:p-3 lg:ml-[-1px] lg:mt-[-8px] lg:z-50 ml-4`}>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Flood simulation
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        River Routing
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="block px-4 py-2 text-blue-600 font-semibold  hover:bg-opacity-10 rounded-md transition duration-200">
                        Contaminant Transport Modelling
                      </Link>
                    </li>
                  </ul>
                </li>
                
                {/* Additional RWM items would be added here */}
              </ul>
            </li>

            {/* WRM, System Dynamics, Activities, etc. would be added in a similar pattern */}
            {/* Contact */}
            
            <li className="relative group">
              <Link href="/contact" className="text-white font-semibold text-lg px-5 py-2 inline-block relative hover:translate-y-[-2px] transition-all duration-300 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300">
                Contact
              </Link>
            </li>

           
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;