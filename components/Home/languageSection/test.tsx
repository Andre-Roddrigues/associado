'use client';

import { ParallaxBanner } from "react-scroll-parallax";
import ContentLanguage from "./Content";


 export default function ParallaxImage () {
    return (
        <ParallaxBanner
            layers={[
            { image: '/images/LANGUAGE.jpeg', speed: 40 },
            { image: '/images/LANGUAGE.jpeg', speed: 30 },
            ]}
            className=" mt-4 h-96 lg:h-[45vh] object-cover"
        >
            <ContentLanguage/>
      </ParallaxBanner>
    );
  };