import { createMuiTheme } from '@material-ui/core/styles'

import palette from './palette'
import breakpoints from './breakpoints'
import typography from './typography'
import overrides from './overrides'

export default useDarkMode => {
  const theme = createMuiTheme({
    breakpoints,
    typography,
    palette: { type: useDarkMode ? 'dark' : 'light', ...palette }
  })
  theme.overrides = overrides(theme)

  return theme
}
