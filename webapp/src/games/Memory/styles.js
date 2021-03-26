export default () => ({
  card: {
    width: 125,
    height: 125
  },
  cover: {
    width: 125,
    height: 125,
    backgroundColor: '#a5a1a4'
  },
  content: {
    width: 125,
    height: 125,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(3, 220, 244)',
    '& img': {
      width: 125,
      height: 125
    }
  },
  header: {
    height: 50,
    border: '1px solid black',
    marginBottom: 10,
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
    width: 700,
    height: 600,
    margin: '0 auto',
    justifyContent: 'space-around'
  }
})
