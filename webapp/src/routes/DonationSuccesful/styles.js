export default theme => ({
  mainBox: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  titlePage: {
    marginBottom: theme.spacing(3)
  },
  textPageDescription: {
    marginBottom: theme.spacing(2)
  }
})
