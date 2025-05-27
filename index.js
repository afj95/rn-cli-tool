#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 🧠 Get raw args from command line, skipping `node` and file path
const args = process.argv.slice(2);

// 🧠 Main command (e.g. create:screen)
const command = args[0];

// 🛠 Setup variables for screen name and target path
let screenName = null;
let targetDir = process.cwd();

// 🧠 Parse remaining arguments with flag support
for (let i = 1; i < args.length; i++) {
     switch (args[i]) {
          case '--help':
          case '-h':
               console.log(`
Usage: rn create:screen <ScreenName> [--path path]

Options:
  --path, -p    Target directory (default: current folder)
  --help, -h    Show help
`);
               process.exit(0);

          case '--path':
          case '-p':
               targetDir = path.normalize(args[i + 1]);
               i++; // Skip the path value
               break;

          default:
               if (!screenName) {
                    screenName = args[i];
               }
     }
}

// 🧠 Check if user wants to create a screen
if (command === 'create:screen') {
     if (!screenName) {
          console.log('❌ Usage: rn create:screen <ScreenName> [--path path]');
          process.exit(1);
     }

     // 📄 Build destination path
     const destPath = path.join(targetDir, `${screenName}.js`);
     const templatePath = path.join(__dirname, 'templates', 'screen.tpl');

     // 🛡 Check if file exists
     if (fs.existsSync(destPath)) {
          console.log(`❌ Error: File already exists at ${destPath}`);
          process.exit(1);
     }

     // 📄 Load template and inject screen name
     let content = fs.readFileSync(templatePath, 'utf-8');
     content = content.replace(/{{screenName}}/g, screenName);

     // 💾 Save new file
     fs.mkdirSync(path.dirname(destPath), { recursive: true });
     fs.writeFileSync(destPath, content);

     console.log(`\x1b[32m✅ Screen '${screenName}' created at '${destPath}'\x1b[0m`);
} else {
     // ❓ Unknown command
     console.log(`❌ Unknown command: ${command}`);
     console.log(`Use 'rn create:screen --help' for usage info.`);
     process.exit(1);
}
