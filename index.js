#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

// Show global help if no command or --help is first
if (args.length === 0 || ['--help', '-h'].includes(args[0])) {
     console.log(`
   Usage:
     rn create:screen <ScreenName> [--path path] [--tsx]
     rn create:component <ComponentName> [--path path] [--tsx]
   
   Options:
     --path, -p    Target directory (default: current folder)
     --tsx         Generate a .tsx file instead of .js
     --force       Overwrite if file already exists
     --help, -h    Show help
   `);
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
          console.error("❌ Failed to parse .rnclirc");
          process.exit(1);
     }
}

let name = null;
let targetDir = process.cwd();

let useTsx = getConfig('defaultExtension', 'js') === 'tsx';
let force = getConfig('useForceByDefault', false);

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
               force = true;
               break;

          case '--help':
          case '-h':
               console.log(`
Usage:
  rn create:screen <ScreenName> [--path path]
  rn create:component <ComponentName> [--path path]

Options:
  --path, -p    Target directory (default: current folder)
  --help, -h    Show help
  --tsx         Generate a .tsx file instead of .js
`);
               process.exit(0);

          default:
               if (!name) {
                    name = args[i];
               }
     }
}

function createFileFromTemplate(templateName, outputName, outputPath, placeholder) {
     const extension = useTsx ? 'tsx' : 'js';
     const destPath = path.join(outputPath, `${outputName}.${extension}`);
     const templatePath = path.join(__dirname, 'templates', `${templateName}.tpl`);

     if (fs.existsSync(destPath)) {
          console.log(`❌ Error: File already exists at ${destPath}`);
          process.exit(1);
     }

     let content = fs.readFileSync(templatePath, 'utf-8');
     content = content.replace(new RegExp(`{{${placeholder}}}`, 'g'), outputName);

     fs.mkdirSync(path.dirname(destPath), { recursive: true });
     fs.writeFileSync(destPath, content);

     console.log(`\x1b[32m✅ ${outputName}.${extension} created at '${destPath}'\x1b[0m`);

}

if (command === 'create:screen') {
     if (!name) {
          console.log('❌ Usage: rn create:screen <ScreenName> [--path path]');
          process.exit(1);
     }

     if (!args.includes('--path') && config.screenPath) {
          targetDir = config.screenPath || process.cwd();
     }

     createFileFromTemplate('screen', name, targetDir, 'screenName');
}

else if (command === 'create:component') {
     if (!name) {
          console.log('❌ Usage: rn create:component <ComponentName> [--path path]');
          process.exit(1);
     }

     if (!args.includes('--path') && config.componentPath) {
          targetDir = config.componentPath || process.cwd();
     }

     createFileFromTemplate('component', name, targetDir, 'componentName');
}

else {
     console.log(`❌ Unknown command: ${command}`);
     console.log(`Use 'rn --help' for usage info.`);
     process.exit(1);
}

function getConfig(key, fallback) {
     return typeof config[key] !== 'undefined' ? config[key] : fallback;
}