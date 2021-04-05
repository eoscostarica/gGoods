export default theme => ({
  closeIcon: {
    position: 'absolute',
    zIndex: 1,
    top: 14,
    right: 14,
    margin: '0',
    height: '5vh',
    '& svg': {
      fontSize: 25,
      color: 'rgba(0, 0, 0, 0.6)'
    }
  },
  dialog: {
    padding: theme.spacing(4)
  },
  sectionBox: {
    marginBottom: theme.spacing(2),
    '& .MuiCard-root': {
      width: '100%'
    }
  },
  sectionBoxDouble: {
    marginBottom: theme.spacing(4)
  },
  chip: {
    marginRight: theme.spacing(1),
    borderRadius: 5
  },
  mainButton: {
    borderRadius: '50px',
    width: '100%',
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    padding: theme.spacing(1)
  },
  googleButton: {
    backgroundColor: 'black',
    fontWeight: 'bold',
    color: 'white',
    borderRadius: '50px',
    width: '100%',
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1)
  },
  paypalButton: {
    backgroundColor: '#FFC439',
    borderRadius: '50px',
    width: '100%',
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    padding: theme.spacing(1)
  }
})
