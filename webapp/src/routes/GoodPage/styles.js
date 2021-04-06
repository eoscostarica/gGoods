export default theme => ({
  mainBox: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2)
    }
  },
  titleBox: {
    marginBottom: theme.spacing(4)
  },
  sectionBox: {
    marginBottom: theme.spacing(4)
  },
  priceBox: {
    marginTop: theme.spacing(2)
  },
  chip: {
    marginRight: theme.spacing(1),
    borderRadius: 5
  },
  boxFlexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  buyButtonDesktop: {
    top: 0,
    right: 0,
    borderRadius: 50
  },
  card: {
    '& .MuiCard-root': {
      width: '100%'
    },
    '& .MuiCardActions-root': {
      padding: 0
    }
  },
  links: {
    color: '#000000',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
})
