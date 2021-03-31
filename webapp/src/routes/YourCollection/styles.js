export default theme => ({
  mainBox: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0)
    }
  }
})
