export default theme => ({
  displayInline: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },
  rowsBox: {
    padding: theme.spacing(2, 2, 0, 2),
    marginTop: theme.spacing(2.5)
  },
  rowsBoxWrap: {
    padding: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '& .MuiCard-root': {
      marginRight: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start',
      '& .MuiCard-root': {
        marginRight: theme.spacing(2)
      }
    }
  },
  optionsWrapper: {
    margin: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer'
    },
    '& svg': {
      height: 12,
      color: '#1565C0',
      marginRight: theme.spacing(1)
    },
    '& span': {
      fontSize: 14,
      lineHeight: '16px',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: '#1565C0'
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
    '& span': {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: '27px',
      textAlign: 'center',
      letterSpacing: '0.15px',
      color: '#000000',
      width: '85%'
    },
    [theme.breakpoints.up('sm')]: {
      '& span': {
        width: '70%'
      }
    }
  },
  browseGoods: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& button': {
      color: '#1565C0',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '16px',
      letterSpacing: '1px'
    }
  },
  cardInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      '& .MuiCard-root': {
        width: '48%',
        marginRight: theme.spacing(1)
      }
    },
    [theme.breakpoints.up('md')]: {
      '& .MuiCard-root': {
        width: 288
      }
    }
  }
})
