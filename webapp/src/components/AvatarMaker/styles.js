export default theme => ({
  mainCanvasContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(2)
  },
  previewBow: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    boxShadow: '2px 3px 6px 2px rgba(0,0,0,0.41)',
    borderRadius: 8,
    '& canvas': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    }
  },
  bottomBox: {
    display: 'flex'
  },
  mainBox: {},
  borderTabs: {
    border: '1px solid rgb(206 206 206)'
  },
  itemsWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  itemBox: {
    border: '1px solid #aaa',
    width: 150,
    height: 150,
    margin: theme.spacing(1),
    '& img': {
      width: 150,
      height: 150
    },
    '&:hover': {
      cursor: 'pointer'
    }
  },
  tabSelected: {
    backgroundColor: theme.palette.primary.main,
    color: 'white !important'
  },
  textField: {
    width: 45,
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      width: 245
    }
  },
  btnPublish: {
    width: 45,
    color: theme.palette.primary.main,
    [theme.breakpoints.up('sm')]: {
      width: 128
    }
  }
})
