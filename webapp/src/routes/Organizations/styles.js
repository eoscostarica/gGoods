export default theme => ({
  titlePage: {
    marginBottom: theme.spacing(3)
  },
  textPageDescription: {
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 200
  },
  cardTitle: {
    marginBottom: theme.spacing(0)
  },
  cardCategory: {
    fontSize: '14px',
    marginBottom: theme.spacing(2)
  },
  cardDescriptionBox: {
    height: '60px',
    display: 'box',
    lineClamp: 3,
    boxOrient: 'vertical',
    overflow: 'hidden'
  },
  actionArea: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  arrowIcon: {
    display: 'flex'
  }
})
