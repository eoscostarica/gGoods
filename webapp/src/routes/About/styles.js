export default theme => ({
  mainBox: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  sectionBox: {
    marginBottom: theme.spacing(4)
  },
  video: {
    height: 300,
    [theme.breakpoints.up('sm')]: {
      height: 600
    }
  }
})
