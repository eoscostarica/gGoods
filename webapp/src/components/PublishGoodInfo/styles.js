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
    marginBottom: theme.spacing(2)
  },
  sectionBoxDouble: {
    marginBottom: theme.spacing(4)
  },
  chip: {
    marginRight: theme.spacing(1),
    borderRadius: 5
  },
  deleteButton: {
    color: '#B00020',
    width: '100%',
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    padding: theme.spacing(1)
  },
  cardRoot: {
    minWidth: 275
  },
  cardActionArea: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  awnserButton: {
    width: '100%'
  }
})
