# Sample GIPHY React Native App

## To run the app inside Expo Go

1. Make sure to have `nodejs` installed
2. Open your terminal and clone this repo
3. Navigate to the `GiphyApp` directory from your terminal
4. Create a `.env` file with the following contents

```
EXPO_PUBLIC_GIPHY_API_URL=https://api.giphy.com/v1
EXPO_PUBLIC_GIPHY_API_KEY=YOUR_GIPHY_API_KEY
```

5. Inside this project, run `npm i` to install dependencies
6. Run the `npx expo start` command to start the dev server
7. Download Expo Go ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) | [iOS](https://itunes.apple.com/app/apple-store/id982107779))
8. Launch Expo Go on your device
9. Scan QR code that showed up inside your terminal after you ran `npx expo start`
10. Enjoy

## Why Expo and not React Native CLI?

Expo has come a long way since the early days of React Native. Initially I was planning on
using RN CLI to bootstrap the app but after taking a look at Expo recently, I came to the
conclusion that for the use case of this simple app, Expo was the way to go.

Expo now offers a great way to stay in the Expo ecosystem yet still be able to make changes
to the native side of things with tools such as `prebuild`. Read more about it
[here](https://docs.expo.dev/workflow/prebuild/) and [here](https://docs.expo.dev/workflow/customizing/).

**NOTE:**

Since I didn't have access to a personal macOS device, testing the app inside iOS was going
to be impossible. Thankfully, Expo Go came in useful for this, allowing me to quickly test
on both platforms due to Expo Go.

## Approach and Architecture

This app is written in TypeScript and leverages type checking (and allows for intellisense)
for most of its code. Most types live inside their respective files unless they are used by multiple
components/hooks/utils. Look inside the `@types/` folder for these types.

The choice was made not to use any CSS-in-JS library like `styled-components` or a UI framework
like `react-native-paper`. The reasons for that are two-fold:

1. This app is simple enough that we don't need to bring in a whole dependency just for
a few elements
2. CSS-in-JS libraries while awesome, also suffer from performance problems. Since this
app is very simple, let's keep it as fast as possible too.

We follow the standard functional React architecture with an emphasis on hooks.
Custom hooks were written for certain functionality in the app to make them more React-y
and queries made using Tanstack Query were also put in hooks to reduce boilerplate code
when defining API calls.

Also, a lot of UI elements were separated out into individual components to make testing
and maintainability in the future easier.

## Libraries used

A few libraries were used in the making of this application. While I tried to keep
dependencies as few as possible, the inevitability of importing a library into the
app grew in the interest of time.

### Libraries for creating custom components

The following libraries were used to create the Skeleton placeholder component
that is used on the Home screen as a new GIF is being fetched from the GIPHY API.

1. React Native Masked View
2. React Native Reanimated
3. Expo Linear Gradient

### Libraries to replace core React Native components

The following libraries were chosen mainly for their performance:

1. Expo Image
    - Expo Image is a library to display images inside a React Native application.
    It supports animated image formats like `.gifs` and `.webp` along with having caching
    capabilities. It's also fast

2. FlashList
    - Great library that replaces React Native's FlatList implementation with a higher
    performing one. Since this app does not use RN's "The New Architecture" and thus,
    can't leverage Fabric, this seemed like a better option.

### Other libraries

1. Tanstack Query
    - Tanstack Query is a great way to manage the async state of the application and
    provides a bunch of tools for us to use in managing said state. The reason it was
    used here was due to the ease at which it allows for refetching of data at intervals,
    making the random GIF fetching logic simpler to implement.

2. Mock Service Worker
    - An easy-to-setup library for helping to mock API calls in development or during running
    tests.
