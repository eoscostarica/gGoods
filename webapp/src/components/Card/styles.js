export default theme => ({
  cardInfoRoot: {
    margin: theme.spacing(1, 0)
  },
  title: {
    fontSize: 14
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  infoImg: {
    width: 80,
    height: 80
  },
  btnLearnMore: {
    color: '#1565C0',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: '1px'
  },
  cardImageRoot: {
    width: '100%'
  },
  media: {
    height: 336,
    [theme.breakpoints.up('sm')]: {
      height: 500
    }
  },
  boxInfoCard: {
    height: 75,
    zIndex: 2,
    position: 'fixed',
    top: 261,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    '& span': {
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '0.25px',
      color: '#FFFFFF'
    },
    '& h5': {
      fontSize: 24,
      lineHeight: '24px',
      color: '#FFFFFF'
    },
    [theme.breakpoints.up('sm')]: {
      top: 426
    }
  },
  cardAvatarRoot: {
    width: '46%',
    margin: theme.spacing(2, 0),
    [theme.breakpoints.up('sm')]: {
      width: 167
    }
  },
  cardOngMedia: {
    height: 200
  },
  cardOngTitle: {
    marginBottom: theme.spacing(0)
  },
  cardOngCategory: {
    fontSize: '14px',
    marginBottom: theme.spacing(2)
  },
  cardOngDescriptionBox: {
    height: '60px',
    display: 'box',
    lineClamp: 3,
    boxOrient: 'vertical',
    overflow: 'hidden'
  },
  cardActionOngArea: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  arrowIcon: {
    display: 'flex'
  },
  cardGameButton: {
    fontWeight: 'bold'
  }
})
