export default theme => ({
  card: {
    margin: theme.spacing(1)
  },
  cover: {
    width: 128,
    height: 165,
    backgroundColor: '#a5a1a4',
    [theme.breakpoints.up('sm')]: {
      width: 126,
      height: 163
    },
    [theme.breakpoints.up('md')]: {
      width: 167,
      height: 204
    }
  },
  content: {
    '& .MuiCard-root': {
      width: 128,
      height: 165
    },
    [theme.breakpoints.up('sm')]: {
      '& .MuiCard-root': {
        width: 126,
        height: 163
      }
    },
    [theme.breakpoints.up('md')]: {
      '& .MuiCard-root': {
        width: 167,
        height: 204
      }
    }
  },
  header: {
    padding: theme.spacing(1),
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
  board: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: 780,
    margin: '0 auto',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      maxWidth: 1024
    }
  },
  memoryGame: {
    padding: theme.spacing(2)
  }
})
