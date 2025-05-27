# rn-cli-tool

A developer-friendly CLI tool for React Native projects using **Expo Router** or classic file-based navigation. This tool helps you quickly generate screen files with consistent templates and naming conventions — similar to Laravel's artisan commands.

---

## 🚀 Features

* Generate screens and components using a simple command
* Supports nested paths with parentheses (for Expo Router layouts)
* Generate `.tsx` files using the `--tsx` flag
* Lightweight and fast — no dependencies
* Flag support: `--path`, `--tsx`, `--help`

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
rn create:screen <ScreenName> [--path path] [--tsx]
```

### 📄 Create a component

```bash
rn create:component <ComponentName> [--path path] [--tsx]
```

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

Create a component in `src/components`:

```bash
rn create:component Button -p src/components --tsx
```

Show help:

```bash
rn create:screen --help
```

---

## 📁 Project Structure

You should place screen templates inside a `templates` folder, like:

```
templates/
  screen.tpl
  component.tpl
```

The template files use placeholders like `{{screenName}}` or `{{componentName}}`, which will be replaced automatically.

Example `screen.tpl`:

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function {{screenName}}() {
  return (
    <View style={styles.container}>
      <Text>{{screenName}}</Text>
    </View>
  );
}

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

export default function {{componentName}}() {
  return (
    <View style={styles.container}>
      <Text>{{componentName}}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
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
