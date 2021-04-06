export default theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
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
    marginTop: theme.spacing(2)
  },
  firstTitle: {
    marginTop: theme.spacing(3)
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
  },
  browseGoods: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& button': {
      color: theme.palette.primary.main,
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 14,
      lineHeight: '16px',
      letterSpacing: '1px'
    }
  },
  cardsWrapper: {
    display: 'flex',
    padding: `${theme.spacing(1)}px 0`,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& .MuiCard-root': {
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'nowrap',
      overflow: 'scroll'
    }
  },
  ggoodCardsWrapper: {
    '& .MuiCard-root': {
      width: '45%'
    },
    [theme.breakpoints.up('sm')]: {
      '& .MuiCard-root': {
        width: 136,
        minWidth: 136
      }
    }
  },
  infoCardsWrapper: {
    '& img': {
      borderRadius: 50
    },
    '& .MuiCard-root': {
      width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
      '& .MuiCard-root': {
        width: 288,
        minWidth: 288
      }
    }
  }
})
