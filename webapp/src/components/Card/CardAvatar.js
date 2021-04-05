import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'

import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const CardAvatar = ({
  id,
  name,
  image,
  backgroundColor,
  donation,
  onClick
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const handleOnClick = () => {
    onClick && onClick({ id, name, image, backgroundColor })
  }

  return (
    <Card className={classes.cardAvatarRoot} onClick={handleOnClick}>
      <CardActionArea>
        <CardMedia
          style={{
            backgroundColor
          }}
          component="img"
          image={`${mainConfig.ipfsUrl}/ipfs/${image}`}
        />
      </CardActionArea>
      <CardActions>
        <Box>
          <Typography variant="subtitle2">{name}</Typography>
          {donation && (
            <Typography variant="subtitle2">
              {t('donation')} ${donation}
            </Typography>
          )}
        </Box>
      </CardActions>
    </Card>
  )
}

CardAvatar.propTypes = {
  id: PropTypes.any,
  name: PropTypes.string,
  image: PropTypes.string,
  backgroundColor: PropTypes.string,
  donation: PropTypes.string,
  onClick: PropTypes.func
}

export default CardAvatar
