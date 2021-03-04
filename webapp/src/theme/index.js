import { createMuiTheme } from '@material-ui/core/styles'

import { darkPalette, lightPalette } from './palettes'
import typography from './typography'
import overrides from './overrides'
import breakpoints from './breakpoints'
import props from './props'
import shadows from './shadows'

export const lightTheme = createMuiTheme({
  spacing: 8,
  breakpoints: breakpoints,
  overrides: overrides,
  props: props,
  typography: typography,
  shadows: shadows,
  palette: lightPalette
})

export const darkTheme = createMuiTheme({
  spacing: 8,
  breakpoints: breakpoints,
  overrides: overrides,
  props: props,
  typography: typography,
  shadows: shadows,
  palette: darkPalette
})
