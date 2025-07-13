#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const package = require('./package.json');
const chalk = require('chalk');
const figlet = require('figlet');

// Function to display welcome banner
function showBanner() {
     console.log(
          chalk.hex('#61DBFB')(
               figlet.textSync('RN CLI', {
                    font: 'Standard',
                    horizontalLayout: 'default',
                    verticalLayout: 'default'
               })
          )
     );
     console.log(chalk.yellow(`  📱 React Native CLI Tool v${package.version}`));
     console.log(chalk.gray(`  🚀 Generate screens and components with ease`));
     console.log(chalk.gray(`  👨‍💻 By ${package.author}`));
     console.log();
}

const args = process.argv.slice(2);

// Show global help if no command or --help is first
if (args.length === 0 || ['--help', '-h'].includes(args[0])) {
     showBanner();
     console.log(chalk.bold.white(`
   Usage:
     rn create:screen <ScreenName> [options] 
     rn create:component <ComponentName> [options]
   
   Options:
     --path, -p    Target directory (default: current folder)
     --tsx         Generate a .tsx file instead of .js
     --force       Overwrite if file already exists
     --empty, -e   Create an empty screen
     --help, -h    Show help
     --version, -v Show version
   `));
     process.exit(0);
}

// Show version if --version is first argument
if (['--version', '-v'].includes(args[0])) {
     if (args[0] === '--version') {
          showBanner();
          console.log(chalk.green(`Version: ${package.version}`));
          console.log(chalk.gray(`Author: ${package.author}`));
          console.log(chalk.gray(`License: ${package.license}`));
     } else {
          console.log(chalk.green(`Version: ${package.version}`));
     }
     process.exit(0);
}

const command = args[0];

let config = {};
const configPath = path.join(process.cwd(), '.rnclirc');
if (fs.existsSync(configPath)) {
     try {
          // Read the config file and parse it as JSON
          // Getting all the config data from .rnclirc file
          // and store it in the config object
          config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
     } catch (e) {
          console.error(chalk.red("❌ Failed to parse .rnclirc"));
          process.exit(1);
     }
}

let name = null;
let targetDir = process.cwd();

let useTsx = getConfig('defaultExtension', 'js') === 'tsx';
let force = getConfig('useForceByDefault', false);
let empty = getConfig('useEmptyByDefault', false);

for (let i = 1; i < args.length; i++) {
     switch (args[i]) {
          case '--tsx':
               useTsx = true;
               break;

          case '--path':
          case '-p':
               targetDir = path.normalize(args[i + 1]);
               i++;
               break;

          case '--force':
          case '-f':
               force = true;
               break;

          case '--empty':
          case '-e':
               empty = true;
               break;

          case '--help':
          case '-h':
               console.log(chalk.bold.white(`
Usage:
  rn create:screen <ScreenName> [options]
  rn create:component <ComponentName> [options]

Options:
  --path, -p    Target directory (default: current folder)
  --help, -h    Show help
  --tsx         Generate a .tsx file instead of .js
  --version, -v Show version
`));
               process.exit(0);

          default:
               if (!name) {
                    name = args[i];
               }
     }
}

function createFileFromTemplate(templateName, outputName, outputPath, placeholder) {
     const extension = useTsx ? 'tsx' : 'js';
     const emptyFile = empty ? true : false;
     const destPath = path.join(outputPath, `${outputName}.${extension}`);
     const templatePath = path.join(__dirname, 'templates', `${templateName}.tpl`);

     if (fs.existsSync(destPath) && !force) {
          console.log(chalk.red(`❌ Error: File already exists at ${destPath}`));
          process.exit(1);
     }

     let content = fs.readFileSync(templatePath, 'utf-8');
     content = content.replace(new RegExp(`{{${placeholder}}}`, 'g'), outputName);

     fs.mkdirSync(path.dirname(destPath), { recursive: true });
     fs.writeFileSync(destPath, content);

     console.log(chalk.green(`✅ ${outputName}.${extension} created at '${chalk.bold(destPath)}'`));

}

if (command === 'create:screen') {
     if (!name) {
          console.log(chalk.red('❌ Usage: rn create:screen <ScreenName> [options]'));
          process.exit(1);
     }

     if (!args.includes('--path') && config.screenPath) {
          targetDir = config.screenPath || process.cwd();
     }

     if (empty) {
          createFileFromTemplate('empty', name, targetDir, 'screenName');
     } else {
          createFileFromTemplate('screen', name, targetDir, 'screenName');
     }

}

else if (command === 'create:component') {
     if (!name) {
          console.log(chalk.red('❌ Usage: rn create:component <ComponentName> [options]'));
          process.exit(1);
     }

     if (!args.includes('--path') && config.componentPath) {
          targetDir = config.componentPath || process.cwd();
     }

     if (empty) {
          createFileFromTemplate('empty', name, targetDir, 'componentName');
     } else {
          createFileFromTemplate('component', name, targetDir, 'componentName');
     }
}

else {
     console.log(chalk.red(`❌ Unknown command: ${command}`));
     console.log(chalk.yellow(`Use 'rn --help' for usage info.`));
     process.exit(1);
}

function getConfig(key, fallback) {
     return typeof config[key] !== 'undefined' ? config[key] : fallback;
}