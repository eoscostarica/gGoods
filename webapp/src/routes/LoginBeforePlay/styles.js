export default theme => ({
  linkWrapper: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'baseline',
    padding: theme.spacing(3, 1),
    '& .MuiButton-root': {
      padding: theme.spacing(1.5, 1)
    },
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }
  }
})
