export default theme => ({
  root: {
    padding: theme.spacing(2)
  },
  colorPickerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    border: 'dashed',
    padding: theme.spacing(2),
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, 0.12)'
  },
  colorPicker: {
    margin: `${theme.spacing(1)}px auto`
  }
})
