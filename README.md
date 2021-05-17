# Star Wars Challenge

## Description

The goal of this challenge is:

- List all characters sorted by name.
- Show a spinner while data is being loaded.
- Paging the characters.
- Display "name" and actual name of "homeworld" for each character in list.
- Go to a character details screen when tapping a single character.
- Show "name" of character together with an avatar based on "gender", "hair_color", "eye_color" and "skin_color"

Plus:

- If API endpoint returns error for some reason, this app show a button that allow user to refetch the characters and his homeworlds for a better UX.
- Paginating character list.
- Reactotron to debug.

## Code quality:

This project use this tools in order to create a consistent codebase, improve developer performance and reduce bugs:

- Eslint: Javascript linter
- Prettier: Code formater
- EditorConfig: Code consistence between OS and IDEs.

## Next steps

### Code

- Add Typescript to improve DX and minimize bugs.
- Add unit, snapshot and integration tests using jest and react native testing library.
- Add CI/CD for this project.
- Add fastlane to deploy this project in Apple Store and Play Store.
- Swap library react-native-avataaars because this library has a bad performance. It uses a webview under the hood. We can use a Image or Giphy to improve the UX (or create our own library).

### UX

- Add Animation in FlatList for a smooth fadeIn when scroll.
- Add a TabBar to render People, Planet and Films.
- Add SplashScreen.
- Accessibility.
- Theming.
- Dark mode.

## Run project

In root folder, run:

ios:

```javascript
yarn build-and-run:ios
```

android:

```javascript
yarn build-and-run:android
```

## Other commands:

Install dependencies:

```javascript
yarn
```

Start bundler:

```javascript
yarn start
```

Run lint:

```javascript
yarn lint
```

Run lint fix:

```javascript
yarn lint-fix
```

## Other info:

The lib react-native-avatars does not work for react-native >= 0.60. I forked it, fixed it and in this project I am using [my fork](https://github.com/dutradotdev/react-native-avataaars).
