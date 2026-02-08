import { lazy } from 'react';

// Lazy load heavy 3D components
export const LazyWebGLShader = lazy(() => 
  import('./ui/web-gl-shader').then(module => ({ default: module.WebGLShader }))
);

export const LazyRotatingEarth = lazy(() => 
  import('./ui/wireframe-dotted-globe').then(module => ({ default: module.default }))
);