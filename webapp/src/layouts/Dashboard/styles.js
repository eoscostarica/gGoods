export default (theme, drawerWidth) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    overflow: 'hidden'
  },
  mainContent: {
    flex: 1,
    background: theme.palette.background.default,
    borderRadius: theme.spacing(2, 2, 0, 0),
    '@media all and (-ms-high-contrast: none), (-ms-high-contrast: active)': {
      flex: 'none'
    },
    '.MuiPaper-root .MuiPaper-root': {
      boxShadow: 'none'
    }
  },
  subHeader: {
    display: 'flex',
    flexDirection: 'column-reverse',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderBottom: '1px solid #e0e0e0',
    width: '100%',
    h3: {
      marginTop: theme.spacing(2)
    },
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      h3: {
        marginTop: 0
      }
    }
  },
  network: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    '& img': {
      width: 56,
      height: 56,
      borderRadius: '100%',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.primary.contrastText
    },
    borderRadius: '8px 16px 16px 8px',
    paddingLeft: 24,
    minWidth: 220
  }
})
