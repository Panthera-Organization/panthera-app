---
name: theme-styles
description: >-
  Apply the panthera-app theme to every Expo UI component without extra React
  re-renders. Use when adding or changing an Expo UI component, styles,
  colors, Appearance, Unistyles, useUnistyles, withUnistyles, seedColor, or
  colorScheme.
---

# Theme styles

These rules apply to every Expo UI component. A theme change updates native colors through `Appearance`. It does not render the component to repaint it.

Unistyles updates a React Native style on the shadow tree. Expo UI reads props such as `colorScheme`, `seedColor`, and text color during render. A theme value in those props renders the component again.

## Do this

1. Use the wrapper in `@/components` when one exists. The rules below still apply when an Expo UI component has no wrapper.
2. Put a theme-dependent React Native style in `StyleSheet.create((theme) => ...)`. This is the path that updates the shadow tree and does not render the component.
3. Put one `Host` around each Expo UI subtree. Inside it, lay out with Expo UI layout components. Yoga flex on the host does not position that subtree.
4. Change the theme only through `saveThemePreference` and `applyThemePreference` in `src/theme/preference.ts`. That function updates Unistyles and calls `Appearance.setColorScheme` for every Expo UI component in the tree.
5. Leave color props off the component. Omitted colors follow the appearance from step 4.
6. When a component must show the saved theme, call `readThemePreference()` during render. Call `saveThemePreference` before that render. Do not store that value in `useState` to pass it back.

`seedColor` and `hostSeedColor` are fallbacks. They stay the same in light and dark. A change to either value is a new prop, and that prop renders the component again. Put a color that differs by theme in the theme objects in `src/theme/unistyles.ts`. Read it with `StyleSheet.create((theme) => ...)`. That path updates the shadow tree and does not render the component.

## Avoid these steps

- Do not call `useUnistyles` or `withUnistyles` to set a prop on an Expo UI component.

`useUnistyles` stays on the React Navigation theme only. Native tabs read `theme.dark` and `theme.colors` from that theme object. The render continues through the navigator and the mounted screens. Do not add the hook to an Expo UI component to copy that pattern.

## Checks

- An Expo UI component does not import `useUnistyles` or `withUnistyles`.
- An Expo UI component does not set `colorScheme`, `seedColor`, or its own tint.
- A theme color on a React Native style is inside `StyleSheet.create((theme) => ...)`.
