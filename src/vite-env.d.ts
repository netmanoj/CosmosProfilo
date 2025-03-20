
/// <reference types="vite/client" />

declare module "maath/random" {
  export function inSphere(buffer: Float32Array, radius: number): Float32Array;
}

declare namespace JSX {
  interface IntrinsicElements {
    'group': any;
    'meshStandardMaterial': any;
    'pointMaterial': any;
    'meshPhongMaterial': any;
    'sphereGeometry': any;
  }
}
