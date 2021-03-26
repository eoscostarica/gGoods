export default theme => ({
  root: {
    padding: theme.spacing(2),
    position: 'relative',
    width: '100%',
    backgroundColor: '#F7F9FA'
  },
  listItem: {
    display: 'inline-block',
    width: 'auto',
    padding: theme.spacing(0, 2),
    '&:hover, &:active:': {
      color: theme.palette.action.selected
    }
  },
  iconsList: {
    padding: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  legend: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: '28px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.44px'
  },
  orgName: {
    fontSize: 12,
    lineHeight: '31px',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: '0.83px',
    textTransform: 'uppercase'
  },
  gridContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
