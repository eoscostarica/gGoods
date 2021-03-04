export default (theme) => ({
  wrapper: {
    padding: `${theme.spacing(1) / 4}px ${theme.spacing(4)}px`,
    background: theme.palette.common.white,
    position: 'relative'
  },
  listItem: {
    display: 'inline-block',
    width: 'auto',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '&, &:hover, &:active': {
      color: '#000000'
    }
  }
})
