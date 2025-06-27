"use client"
import React from 'react'
import { ParallaxProvider } from 'react-scroll-parallax';

interface Props {
    children: React.ReactNode;
}
function ParallaxProviderClient({ children}: Props) {
  return (
    <ParallaxProvider>{children}</ParallaxProvider>
  )
}

export default ParallaxProviderClient