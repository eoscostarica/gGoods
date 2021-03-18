export default () => {
  const defaultHeight = 80
  const defaultWidth = 25
  const level2Height = defaultHeight - 8
  const level2Width = defaultWidth - 8
  const level1Height = defaultHeight - 2
  const level1Width = defaultWidth - 2
  const level0Height = defaultHeight + 5
  const level0Width = defaultWidth + 5
  const level2Bs = '-.1em .1em .2em #212121'
  const level1Bs = '-.2em .2em .4em #212121'
  const subLevel2Bs = '.1em .1em .2em #212121'
  const subLevel1Bs = '.2em .2em .4em #212121'
  const level0Bs = '0 .4em .8em #212121'

  return {
    carousel: {
      height: '100%',
      width: '100%',
      margin: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    arrow: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 75,
      width: 55,
      height: 55,
      backgroundColor: '#6796E5',
      cursor: 'pointer',
      transition: 'all 500ms',
      marginLeft: 5,
      color: '#FFFFFF',
      marginRight: 5,
      '&:hover': {
        backgroundColor: '#512DA8',
        color: '#FFEB3B'
      }
    },
    item: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontSize: 100,
      transition:
        'box-shadow 1s, height 250ms, width 250ms, left 1s, margin-top 1s, line-height 250ms, background-color 1s'
    },
    levelLeft2: {
      boxShadow: level2Bs,
      height: `${level2Height}%`,
      width: `${level2Width}%`,
      backgroundColor: '#228291',
      zIndex: 0
    },
    levelLeft1: {
      boxShadow: level1Bs,
      height: `${level1Height}%`,
      width: `${level1Width}%`,
      backgroundColor: '#6796E5',
      zIndex: 1
    },
    levelCurrent: {
      boxShadow: level0Bs,
      height: `${level0Height}%`,
      width: `${level0Width}%`,
      backgroundColor: '#4EC9E1',
      zIndex: 2
    },
    levelRight1: {
      boxShadow: subLevel1Bs,
      height: `${level1Height}%`,
      width: `${level1Width}%`,
      backgroundColor: '#6796E5',
      zIndex: 1
    },
    levelRight2: {
      boxShadow: subLevel2Bs,
      height: `${level2Height}%`,
      width: `${level2Width}%`,
      backgroundColor: '#228291',
      zIndex: 0
    },
    box: {
      height: 500,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    leftArrow: {
      '& .MuiSvgIcon-root': {
        marginLeft: 7
      }
    }
  }
}
