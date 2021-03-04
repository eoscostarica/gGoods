export default (theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    boxShadow: theme.shadows[1]
  },
  iconButton: {
    '& svg': {
      width: 22,
      height: 22
    }
  },
  userBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& button': {
      color: theme.palette.getContrastText(theme.palette.background.paper)
    }
  }
})
