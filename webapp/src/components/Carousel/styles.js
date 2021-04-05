export default theme => ({
  navigationBox: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    '& .MuiTypography-body1': {
      fontWeight: 'bold',
      fontSize: 12,
      lineHeight: '16px',
      letterSpacing: '1.5px',
      textTransform: 'uppercase'
    },
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
      '& .MuiTypography-body1': {
        margin: theme.spacing(0, 3)
      }
    }
  },
  carousel: {
    height: '100%',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  arrow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 65,
    height: 65,
    cursor: 'pointer',
    transition: 'all 500ms',
    marginLeft: 5,
    marginRight: 5,
    '&:hover': {
      cursor: 'pointer'
    },
    '& svg': {
      fontSize: 35
    }
  },
  item: {
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition:
      'box-shadow 1s, height 250ms, width 250ms, left 1s, margin-top 1s, line-height 250ms, background-color 1s',
    '& img': {
      maxWidth: '100%'
    }
  },
  levelLeft2: {
    boxShadow: '-1px 5px 5px 1px rgba(0,0,0,0.55)',
    height: 160,
    width: 130,
    zIndex: 0,
    '& img': {
      marginTop: theme.spacing(0.5),
      width: 130,
      height: 130
    }
  },
  levelLeft1: {
    boxShadow: '-1px 5px 5px 1px rgba(0,0,0,0.55)',
    height: 240,
    width: '23%',
    zIndex: 1,
    '& img': {
      marginTop: theme.spacing(4.5),
      width: 160,
      height: 160
    },
    [theme.breakpoints.up('sm')]: {
      width: 160
    }
  },
  levelCurrent: {
    boxShadow: '-1px 5px 5px 1px rgba(0,0,0,0.55)',
    height: 285,
    width: 200,
    zIndex: 2,
    '& h5': {
      fontSize: 24,
      whiteSpace: 'nowrap'
    },
    '& .MuiTypography-body1': {
      fontSize: 14,
      whiteSpace: 'nowrap',
      width: '100%',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      textAlign: 'center'
    },
    '& img': {
      marginTop: theme.spacing(3),
      width: 200,
      height: 200
    }
  },
  levelRight1: {
    boxShadow: '-1px 5px 5px 1px rgba(0,0,0,0.55)',
    height: 240,
    width: '23%',
    zIndex: 1,
    '& img': {
      marginTop: theme.spacing(4.5),
      width: 160,
      height: 160
    },
    [theme.breakpoints.up('sm')]: {
      width: 160
    }
  },
  levelRight2: {
    boxShadow: '-1px 5px 5px 1px rgba(0,0,0,0.55)',
    height: 160,
    width: 130,
    zIndex: 0,
    '& img': {
      marginTop: theme.spacing(0.5),
      width: 130,
      height: 130
    }
  },
  box: {
    height: 350,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3)
  },
  leftArrow: {
    '& .MuiSvgIcon-root': {
      marginLeft: 7
    }
  },
  legend: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: '25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5
  },
  legendRight1: {
    paddingBottom: theme.spacing(0.5),
    '& h5': {
      fontSize: 18,
      whiteSpace: 'nowrap',
      width: '50%'
    },
    '& .MuiTypography-body1': {
      fontSize: 11,
      whiteSpace: 'nowrap',
      width: '50%',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    [theme.breakpoints.up('sm')]: {
      '& h5': {
        width: '100%',
        textAlign: 'center'
      },
      '& .MuiTypography-body1': {
        width: '100%',
        textAlign: 'center'
      }
    }
  },
  legendRight2: {
    paddingBottom: theme.spacing(0.3),
    '& h5': {
      fontSize: 11,
      whiteSpace: 'nowrap',
      width: '50%'
    },
    '& .MuiTypography-body1': {
      fontSize: 8,
      whiteSpace: 'nowrap',
      width: '50%',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    [theme.breakpoints.up('sm')]: {
      '& h5': {
        width: '100%',
        textAlign: 'center'
      },
      '& .MuiTypography-body1': {
        width: '100%',
        textAlign: 'center'
      }
    }
  },
  legendLeft1: {
    paddingBottom: theme.spacing(0.5),
    alignItems: 'end',
    '& h5': {
      fontSize: 18,
      whiteSpace: 'nowrap',
      width: '70%',
      overflow: 'hidden',
      direction: 'rtl'
    },
    '& .MuiTypography-body1': {
      fontSize: 11,
      whiteSpace: 'nowrap',
      width: '70%',
      overflow: 'hidden',
      direction: 'rtl',
      textOverflow: 'ellipsis'
    },
    [theme.breakpoints.up('sm')]: {
      '& h5': {
        width: '100%',
        direction: 'ltr',
        textAlign: 'center'
      },
      '& .MuiTypography-body1': {
        width: '100%',
        direction: 'ltr',
        textAlign: 'center'
      }
    }
  },
  legendLeft2: {
    paddingBottom: theme.spacing(0.3),
    alignItems: 'end',
    '& h5': {
      fontSize: 11,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      direction: 'rtl'
    },
    '& .MuiTypography-body1': {
      fontSize: 8,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      direction: 'rtl',
      textOverflow: 'ellipsis'
    },
    [theme.breakpoints.up('sm')]: {
      alignItems: 'center',
      '& h5': {
        width: '100%',
        direction: 'ltr',
        textAlign: 'center'
      },
      '& .MuiTypography-body1': {
        width: '100%',
        direction: 'ltr',
        textAlign: 'center'
      }
    }
  },
  boxLoading: {
    height: '100%',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  }
})
