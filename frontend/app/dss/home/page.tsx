'use client';
import React from "react";
import GalleryCarousel from './component/project_images/GalleryCarousel';
import GridSection from "./component/home_grid/GridSection";
import SocialGridSection from '../home/component/social/social';
import StepCards from "./component/cards/card";
export default function Home() {
  return (
    <div>
        <GridSection/>
        
        <GalleryCarousel/>
        <StepCards />
        <SocialGridSection />

    </div>
);
  }