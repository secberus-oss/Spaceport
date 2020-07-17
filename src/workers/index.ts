import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import { rcConfig } from '../types/SpaceportTypes';
const runScript = async () => {
  const appDir = path.resolve(process.cwd());
  const detectSpaceport = fs.readdirSync(process.cwd());
  let configFile: string | boolean | undefined = detectSpaceport.find(file => {
    return file.match('spaceport') !== null;
  });

  configFile = false;

  if (!configFile) {
    configFile = await inquirer
      .prompt({
        name: 'Config_Location',
        type: 'input',
        message:
          'Unable to detect spaceport configuration file.\nPlease input the path to the configuration, or press enter to continue',
      })
      .then(val => {
        if (
          val.Config_Location === '' ||
          typeof val.Config_Location === 'undefined'
        ) {
          return null;
        }
        return val.Config_Location;
      })
      .catch(err => {
        console.log(err);
        process.stderr.write(
          'Unable to locate file from input path. Path should start at root of project.'
        );
        return false;
      });
    if (typeof configFile === 'boolean' || configFile === null) {
      process.exit(0);
    }
  }

  let spaceportConfig: rcConfig | Buffer | boolean | null = false;

  if (configFile !== undefined) {
    spaceportConfig = configFile.match(/(\.js\b)/)
      ? require(path.resolve(appDir, configFile))
      : fs.readFileSync(path.join(appDir, configFile));
  }

  if (!spaceportConfig) {
    process.exit(0);
  }

  if (spaceportConfig instanceof Buffer) {
    try {
      spaceportConfig = JSON.parse(spaceportConfig.toString('utf8'));
    } catch (err) {
      console.error(err);
      process.exit();
    }
  }
  // Exit if invalid type
  if (
    typeof spaceportConfig === 'boolean' ||
    spaceportConfig === null ||
    spaceportConfig instanceof Buffer
  ) {
    process.stdout.write('Spaceport config error');
    process.stdout.write(JSON.stringify(spaceportConfig));
    process.exit(1);
  }

  const parsedConfig: rcConfig = spaceportConfig;

  if ('inputPath' in parsedConfig) {
    console.log('Input path selected');
  }

  if ('outputPath' in parsedConfig) {
    console.log('Output path selected');
  } else {
    console.log('No output path, defaulting to /p');
  }

  if ('retainParentFolderStructure' in parsedConfig) {
    console.log('Retaining parent folder structure');
  }

  if ('modules' in parsedConfig) {
    console.log('Retaining output ');
  }
};

runScript();
