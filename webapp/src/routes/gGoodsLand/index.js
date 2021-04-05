import React, { useState, forwardRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useQuery, useMutation } from '@apollo/client'

import { GET_NFT_ON_THE_MAP, MY_GGOODS, SAVE_NFT_ON_THE_MAP } from '../../gql'
import { mainConfig } from '../../config'
import styles from './styles'
import PlaceYourGoodMap from '../../components/PlaceYourGood'
import GoodsMap from '../../components/GoodsMap'
import { useSharedState } from '../../context/state.context'

const useStyles = makeStyles(styles)

const Transition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const gGoodsLand = () => {
  const classes = useStyles()
  const { t } = useTranslation('nftsMap')
  const [open, setOpen] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState()
  const [ggoods, setGgoods] = useState()
  const [anchors, setAnchors] = useState([])
  const [saveClicked, setSaveClicked] = useState(false)
  const [state] = useSharedState()
  const { loading, data } = useQuery(MY_GGOODS, { fetchPolicy: 'network-only' })
  const {
    loading: loadingGetNftOnTheMap,
    data: { ggoods_map: responseGetNftOnTheMap } = {}
  } = useQuery(GET_NFT_ON_THE_MAP, { fetchPolicy: 'network-only' })
  const [
    saveNftOnTheMap,
    {
      error: errorSaveNftOnTheMap,
      data: { insert_ggoods_map: responseSaveNftOnTheMap } = {}
    }
  ] = useMutation(SAVE_NFT_ON_THE_MAP)

  const submitNftsToTheMap = () => {
    if (anchors.length > 0)
      saveNftOnTheMap({
        variables: {
          objects: prepareDataToUpload(anchors)
        }
      })
  }

  const prepareDataToUpload = data => {
    return data.map(d => {
      return {
        user_id: state.user.id,
        good_id: d.id,
        coordinates: JSON.stringify(d.coordinates)
      }
    })
  }

  const handleSetAnchor = value => {
    if (value.length > 0) setAnchors(prev => [...prev, ...value])
  }

  const handleSaveButtonClick = () => {
    setSaveClicked(true)
    setOpen(false)
  }

  useEffect(() => {
    if (responseSaveNftOnTheMap) {
      setSnackbarMessage(t('successfullySaved'))
      setOpenSnackbar(true)
    }
  }, [responseSaveNftOnTheMap])

  useEffect(() => {
    if (anchors.length && saveClicked) submitNftsToTheMap()
  }, [saveClicked, anchors])

  useEffect(() => {
    if (ggoods && responseGetNftOnTheMap)
      setAnchors(prev => [
        ...prev,
        ...ggoods.filter(g =>
          responseGetNftOnTheMap.some(el => {
            if (el.good_id === g.id) {
              g.coordinates = el.coordinates
              return true
            }
            return false
          })
        )
      ])
  }, [responseGetNftOnTheMap, ggoods])

  useEffect(() => {
    if (data?.ggoods) {
      setGgoods(
        data.ggoods
          ?.filter(item => !!item?.metadata?.imageSmall)
          .map(item => ({
            id: `${item?.id}`,
            image: `${mainConfig.ipfsUrl}/ipfs/${item?.metadata?.imageSmall}`,
            backgroundColor: item?.metadata?.backgroundColor,
            description: item?.metadata?.description,
            name: item?.metadata?.name
          }))
      )
    }
  }, [loading, loadingGetNftOnTheMap])

  useEffect(() => {
    console.log(`An error has ocurred ${errorSaveNftOnTheMap}`)
  }, [errorSaveNftOnTheMap])

  return (
    <Grid>
      <Dialog
        fullScreen
        open={open}
        onClose={() => setOpen(false)}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpen(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {t('successfullySaved')}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSaveButtonClick}>
              {t('save')}
            </Button>
          </Toolbar>
        </AppBar>
        {ggoods && (
          <PlaceYourGoodMap
            availableGoods={ggoods}
            setAnchors={handleSetAnchor}
            saveClicked={saveClicked}
          />
        )}
      </Dialog>
      <GoodsMap anchors={anchors} placeAnewGood={() => setOpen(true)} />
      <Snackbar open={openSnackbar} autoHideDuration={3000}>
        <Alert severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default gGoodsLand
