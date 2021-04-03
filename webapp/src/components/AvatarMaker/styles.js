export default theme => ({
  tabIndicator: {
    display: 'none'
  },
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
    boxShadow: theme.shadows[3],
    borderRadius: 8,
    '& canvas': {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    }
  },
  bottomBox: {
    display: 'flex',
    width: '100%'
  },
  rootTab: {
    minWidth: 100,
    marginBottom: 10,
    border: '1px solid rgb(206 206 206)'
  },
  flexContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  itemsWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'scroll',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
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
  colorPicker: {
    margin: 'auto'
  }
})
