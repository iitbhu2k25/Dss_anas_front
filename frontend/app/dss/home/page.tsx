'use client';
import React from "react";
import GalleryCarousel from './component/project_images/GalleryCarousel';
import GridSection from "./component/home_grid/GridSection";

export default function Home() {
  return (
    <div>
      <GridSection/>
        <GalleryCarousel/>
    </div>
);
  }