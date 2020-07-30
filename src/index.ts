// index.ts
import _ from 'lodash';
_.debounce(() => {
  console.log('Debounced...');
}, 5000);
console.log('Welcome to spaceport!');
