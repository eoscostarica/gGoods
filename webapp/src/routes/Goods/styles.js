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
  grid: {
    marginBottom: 10,
    paddingLeft: 100,
    paddingRight: 25,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 10
    }
  },
  available: {
    paddingTop: 10,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0
    }
  }
})
