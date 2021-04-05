export default theme => ({
  titlePage: {
    marginBottom: theme.spacing(3)
  },
  textPageDescription: {
    marginBottom: theme.spacing(2)
  },
  mainBox: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  available: {
    flexGrow: 1,
    paddingTop: 5
  },
  box: {
    display: 'flex',
    marginBottom: theme.spacing(1)
  }
})
