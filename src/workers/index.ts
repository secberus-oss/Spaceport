import fs from 'fs';
import path from 'path';
console.log('Running');
const appDir = path.resolve(process.cwd());
const detectSpaceport = fs.readdirSync(process.cwd());
const configFile = detectSpaceport.find(file => {
  return file.match('spaceport') !== null;
});

if (!configFile) {
  process.stderr.write('Unable to locate a spaceport configuration file.');
  process.exit(1);
}

let spaceportConfig = configFile.match(/(\.js\b)/)
  ? require(path.resolve(appDir, configFile))
  : fs.readFileSync(path.join(appDir, configFile));

if (spaceportConfig instanceof Buffer) {
  spaceportConfig = spaceportConfig.toString('utf8');
}

console.log(spaceportConfig);
