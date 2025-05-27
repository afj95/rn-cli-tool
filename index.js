#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

let name = null;
let targetDir = process.cwd();
let useTsx = false;

for (let i = 1; i < args.length; i++) {
     switch (args[i]) {
          case '--tsx':
               useTsx = true;
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

          case '--path':
          case '-p':
               targetDir = path.normalize(args[i + 1]);
               i++;
               break;

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

     createFileFromTemplate('screen', name, targetDir, 'screenName');
}

else if (command === 'create:component') {
     if (!name) {
          console.log('❌ Usage: rn create:component <ComponentName> [--path path]');
          process.exit(1);
     }

     createFileFromTemplate('component', name, targetDir, 'componentName');
}

else {
     console.log(`❌ Unknown command: ${command}`);
     console.log(`Use 'rn --help' for usage info.`);
     process.exit(1);
}
