export default theme => ({
  mainBox: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  headerBox: {
    paddingBottom: theme.spacing(2)
  },
  MainButton: {
    borderRadius: '50px',
    width: '100%',
    fontWeight: 'normal',
    padding: theme.spacing(1)
  },
  sectionBox: {
    width: '100%',
    paddingBottom: theme.spacing(2)
  },
  overlineTag: {
    width: '100%'
  }
})
