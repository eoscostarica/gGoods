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
    borderRadius: 8
  },
  mainCanvas: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 310,
    width: 310,
    [theme.breakpoints.up('sm')]: {
      height: 375,
      width: 400
    }
  },
  bottomBox: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(1, 2),
    justifyContent: 'flex-end'
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
