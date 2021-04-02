export default theme => ({
  card: {
    width: 68,
    height: 68,
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      width: 125,
      height: 125
    }
  },
  cover: {
    width: 68,
    height: 68,
    backgroundColor: '#a5a1a4',
    [theme.breakpoints.up('sm')]: {
      width: 125,
      height: 125
    }
  },
  content: {
    width: 68,
    height: 68,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(3, 220, 244)',
    '& img': {
      width: 68,
      height: 68
    },
    [theme.breakpoints.up('sm')]: {
      width: 125,
      height: 125,
      '& img': {
        width: 125,
        height: 125
      }
    }
  },
  header: {
    height: 50,
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  title: {
    fontSize: 25,
    padding: 10,
    color: '#00'
  },
  resetBtn: {
    left: 12,
    top: 58
  },
  board: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 700,
    margin: '0 auto',
    justifyContent: 'flex-start',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-around'
    }
  },
  memoryGame: {
    padding: theme.spacing(2)
  }
})
