# rn-cli-tool

A developer-friendly CLI tool for React Native projects using **Expo Router** or classic file-based navigation. This tool helps you quickly generate screen files with consistent templates and naming conventions — similar to Laravel's artisan commands.

📦 **NPM:** [https://www.npmjs.com/package/rn-cli-tool](https://www.npmjs.com/package/rn-cli-tool)

---

## 🚀 Features

* Generate screens and components using a simple command
* Supports nested paths with parentheses (for Expo Router layouts)
* Generate `.tsx` files using the `--tsx` flag
* Force overwrite existing files with `--force` flag
* Create empty template files with `--empty` flag
* Lightweight and fast — no dependencies
* Flag support: `--path`, `--tsx`, `--force`, `--empty`, `--help`, `--version`

---

## 📆 Installation

Install it globally using npm:

```bash
npm install -g rn-cli-tool
```

---

## 💠 Usage

### 📄 Create a screen

```bash
rn create:screen <ScreenName> [options]
```

### 📄 Create a component

```bash
rn create:component <ComponentName> [options]
```

### 🔧 Available Options

| Option | Short | Description | Example |
|--------|-------|-------------|---------|
| `--path` | `-p` | Target directory (default: current folder) | `--path "app/(auth)"` |
| `--tsx` | | Generate a .tsx file instead of .js | `--tsx` |
| `--force` | `-f` | Overwrite if file already exists | `--force` |
| `--empty` | `-e` | Create an empty screen/component template | `--empty` |
| `--help` | `-h` | Show help information | `--help` |
| `--version` | `-v` | Show version information | `--version` |

### 🧪 Examples

Create a screen in the current folder:

```bash
rn create:screen HomeScreen
```

Create a screen inside `app/(auth)` (Expo Router style):

```bash
rn create:screen LoginScreen --path "app/(auth)"
```

Create a screen as TypeScript:

```bash
rn create:screen SplashScreen --tsx
```

Create a screen with force overwrite:

```bash
rn create:screen HomeScreen --force
```

Create an empty screen template:

```bash
rn create:screen LoginScreen --empty
```

Create a component in `src/components`:

```bash
rn create:component Button -p src/components --tsx
```

Create an empty component with force overwrite:

```bash
rn create:component Button --empty --force
```

Show help:

```bash
rn create:screen --help
```

Show version:

```bash
rn --version
```

---

## 📁 Project Structure

You should place screen templates inside a `templates` folder, like:

```
templates/
  screen.tpl
  component.tpl
  empty.tpl
```

The template files use placeholders like `{{screenName}}` or `{{componentName}}`, which will be replaced automatically.

Example `screen.tpl`:

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const {{screenName}} = () => {
  return (
    <View style={styles.container}>
      <Text>{{screenName}}</Text>
    </View>
  );
}

export default {{screenName}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

Example `component.tpl`:

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const {{componentName}} = () => {
  return (
    <View style={styles.container}>
      <Text>{{componentName}}</Text>
    </View>
  );
}

export default {{componentName}};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
```

Example `empty.tpl`:

```js
import React from 'react';

const {{screenName}} = () => {
  return ();
}

export default {{screenName}}

const styles = StyleSheet.create({});
```

---

## 👨‍💼 Author

**Ahmad Jamous**
Full Stack Mobile Developer — React Native & Laravel
[Portfolio & Projects](https://your-portfolio-link.com)

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add new features (such as `create:context` or improved flag parsing), feel free to open an issue or pull request.

To get started:

1. Fork the repository
2. Clone it locally
3. Run `npm link` to test your changes globally
4. Submit a pull request with your improvements

Make sure your code is clean, well-documented, and tested. Let's make React Native development easier together!
