export default theme => ({
  root: {
    '& .MuiTextField-root': {
      width: '100%',
      marginBottom: theme.spacing(3)
    }
  },
  tabPanel: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  colorPicker: {
    marginBottom: theme.spacing(3),
    with: 'fit-content',
    margin: 'auto'
  },
  dropzoneArea: {
    minHeight: 'fit-content',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    '& .MuiDropzoneArea-text': {
      margin: 0
    },
    '& .MuiDropzonePreviewList-root': {
      width: 'fit-content',
      margin: 0,
      borderRadius: theme.spacing(1)
    },
    '& .MuiDropzonePreviewList-imageContainer': {
      flexBasis: 'initial',
      maxWidth: 'initial',
      padding: theme.spacing(1)
    },
    '& .MuiDropzonePreviewList-image': {
      boxShadow: 'none'
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
