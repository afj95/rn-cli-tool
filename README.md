# rn-cli-tool

A developer-friendly CLI tool for React Native projects using **Expo Router** or classic file-based navigation. This tool helps you quickly generate screen files with consistent templates and naming conventions — similar to Laravel's artisan commands.

---

## 🚀 Features

* Generate screens using a simple command
* Supports nested paths with parentheses (for Expo Router layouts)
* Lightweight and fast — no dependencies
* Flag support: `--path`, `--help`

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
rn create:screen <ScreenName> [--path path]
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

or using the shorthand:

```bash
rn create:screen ProfileScreen -p "app/(profile)"
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
```

The `screen.tpl` file uses `{{screenName}}` as a placeholder, which will be replaced automatically.

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

Contributions are welcome! If you'd like to add new features (such as create:component or improved flag parsing), feel free to open an issue or pull request.

To get started:

- Fork the repository
- Clone it locally
- Run npm link to test your changes globally
- Submit a pull request with your improvements

Make sure your code is clean, well-documented, and tested. Let's make React Native development easier together!