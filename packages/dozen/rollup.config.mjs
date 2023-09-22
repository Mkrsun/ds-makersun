import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import svgr from '@svgr/rollup';
import analyzer from 'rollup-plugin-analyzer';
import sass from 'rollup-plugin-sass';
import image from '@rollup/plugin-image';

const rollupConfig = {
  input: 'src/index.ts', // tu punto de entrada
  output: {
    dir: 'lib',
    format: 'es', // o 'es' si prefieres ES modules
  },
  plugins: [
    peerDepsExternal(),
    resolve(), // Ayuda a Rollup a encontrar módulos externos
    svgr(),
    json(), // Permite importar archivos JSON
    image(),
    sass({
      insert: true, // Esto inyectará los estilos en el DOM en tiempo de ejecución
    }),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    analyzer(), // Muestra un análisis de tu bundle
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    'react-is',
    'react-redux',
  ],
};

export default rollupConfig;
