export default theme => ({
  mainBox: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  sectionBox: {
    paddingBottom: theme.spacing(2)
  },
  centerMessage: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  displayInline: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },
  displayInlineCenter: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'center'
    }
  },
  optionsWrapper: {
    margin: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer'
    },
    '& svg': {
      height: 12,
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1)
    },
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '16px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: theme.palette.primary.main
    }
  },
  orgWrapper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      marginBottom: theme.spacing(1),
      width: 128,
      height: 128
    },
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '27px',
      textAlign: 'center',
      letterSpacing: '0.15px',
      color: '#000000',
      width: '85%'
    },
    [theme.breakpoints.up('sm')]: {
      '& .MuiTypography-body1': {
        width: '70%'
      }
    }
  }
})
