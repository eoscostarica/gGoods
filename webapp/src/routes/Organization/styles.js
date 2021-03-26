export default theme => ({
  mainImageBox: {
    width: '100%',
    height: '420px',
    [theme.breakpoints.down('sm')]: {
      height: '200px'
    }
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  mainBox: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  titleBox: {
    marginBottom: theme.spacing(4)
  },
  sectionBox: {
    marginBottom: theme.spacing(4)
  },
  subSectionBox: {
    marginBottom: theme.spacing(2)
  },
  paddingLeftBox: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  }
})
