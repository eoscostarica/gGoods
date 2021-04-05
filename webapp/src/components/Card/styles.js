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
  cardImageMedia: {
    height: 336,
    [theme.breakpoints.up('sm')]: {
      height: 500
    }
  },
  media: {
    height: '100%'
  },
  boxInfoCard: {
    height: 75,
    zIndex: 2,
    position: 'fixed',
    top: 261,
    backgroundColor: 'rgba(0, 0, 0, 0.20)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    '& .MuiTypography-body1': {
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
  cardSkeleton: {
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 168
    },
    '& .MuiCardContent-root': {
      padding: theme.spacing(2, 1)
    }
  },
  mediaSkeleton: {
    height: 168
  },
  cardAvatarRoot: {
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      width: 168
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
