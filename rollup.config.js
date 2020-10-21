import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

const extensions = ['.js', '.ts'];

const name = 'spaceportjs';

export default {
  input: './lib/index.js',
  external: [],
  plugins: [
    resolve({ extensions }),
    commonjs(),
    babel({ extensions, include: ['lib/**/*'] }),
  ],
  output: {
    dir: 'dist',
    format: 'es',
    name,
  },
};
