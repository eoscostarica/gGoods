export default (theme, darken) => ({
  drawer: {
    borderRight: 0,
    '> div': {
      borderRight: 0
    }
  },
  scrollbar: {
    backgroundColor: theme.palette.background.paper
  },
  list: {
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'center'
  },
  brand: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette.background.paper,
    fontFamily: theme.typography.fontFamily,
    minHeight: 56,
    padding: theme.spacing(2),
    cursor: 'default',
    [theme.breakpoints.up('sm')]: {
      minHeight: 64
    }
  },
  sidebarSection: {
    color: theme.palette.getContrastText(theme.palette.background.paper),
    padding: theme.spacing(2, 2, 1, 3),
    display: 'block',
    fontWeight: '600'
  },
  category: {
    padding: theme.spacing(2, 3, 2, 3),
    display: 'flex',
    flexDirection: 'row',
    color: theme.palette.getContrastText(theme.palette.background.paper),
    '& svg': {
      fontSize: 20,
      width: 20,
      height: 20
    },
    '& svg, .MuiListItemText-root': {
      opacity: 0.5
    },
    '&:hover': {
      backgroundColor: darken(0.05, theme.palette.background.paper),
      'svg, .MuiListItemText-root': {
        opacity: 1
      }
    }
  },
  categoryText: {
    margin: 0,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.fontWeightRegular,
    padding: theme.spacing(0, 1)
  },
  categoryIconLess: {
    color: theme.palette.getContrastText(theme.palette.background.paper)
  },
  categoryIconMore: {
    color: theme.palette.getContrastText(theme.palette.background.paper)
  },
  link: {
    padding: theme.spacing(2, 0, 2, 5)
  },
  badge: {
    fontSize: 11,
    fontWeight: theme.typography.fontWeightBold,
    height: 20,
    backgroundColor: theme.palette.primary.main,
    'span.MuiChip-label, span.MuiChip-label:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(0, 1)
    }
  },
  sidebarFooter: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 2),
    minHeight: 61,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sidebarFooterText: {
    color: theme.palette.getContrastText(theme.palette.background.paper)
  },
  sidebarFooterSubText: {
    color: theme.palette.primary.contrastText,
    fontSize: '0.725rem',
    display: 'block',
    padding: 1
  }
})
