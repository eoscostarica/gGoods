export default theme => ({
  root: {
    padding: theme.spacing(2)
  },
  chips: {
    '& .MuiChip-root': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  },
  selected: {
    backgroundColor: `${theme.palette.primary.main} !important`
  },
  media: {
    height: 140
  }
})
