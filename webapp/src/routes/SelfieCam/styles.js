export default theme => ({
  titlePage: {
    marginBottom: theme.spacing(3)
  },
  textPageDescription: {
    marginBottom: theme.spacing(2)
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    height: 285,
    '& .react-html5-camera-photo>video': {
      width: '100%',
      height: 285
    },
    '&:focus': {
      outline: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      width: 640,
      height: 480,
      '& .react-html5-camera-photo>video': {
        width: 640,
        height: 480
      }
    }
  },
  picture: {
    width: '100%',
    height: 285,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    border: `1px solid rgba(0, 0, 0, 0.5)`,
    [theme.breakpoints.up('sm')]: {
      width: 640,
      height: 480
    }
  },
  selfieBox: {
    padding: theme.spacing(0, 2)
  },
  selfieOptionBtn: {
    marginTop: 284,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.up('sm')]: {
      marginTop: 479
    }
  },
  cancelBtn: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)'
  },
  boxButton: {
    display: 'flex',
    '&:hover': {
      cursor: 'pointer'
    },
    '& .MuiSvgIcon-root': {
      color: 'rgba(0, 0, 0, 0.6)',
      marginRight: theme.spacing(1)
    },
    '& p': {
      color: 'rgba(0, 0, 0, 0.6)',
      fontSize: 16,
      lineHeight: '28px',
      alignItems: 'center',
      letterSpacing: '0.44px'
    }
  },
  displayNone: {
    display: 'none'
  }
})
