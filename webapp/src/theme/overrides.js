const overrides = theme => ({
  MuiAlert: {
    message: {
      overflowWrap: 'anywhere'
    }
  },
  MuiDropzoneArea: {
    root: {
      minHeight: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2)
    },
    text: {
      marginTop: 0,
      marginBottom: 0
    }
  },
  MuiDropzonePreviewList: {
    root: {
      width: 'fit-content',
      margin: 0,
      borderRadius: theme.spacing(1)
    },
    imageContainer: {
      display: 'flex',
      flexBasis: 'initial',
      maxWidth: 'initial',
      padding: `${theme.spacing(1)}px !important`
    },
    image: {
      boxShadow: 'none'
    }
  }
})

export default overrides
