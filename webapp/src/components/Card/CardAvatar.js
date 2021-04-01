import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Link as LinkRouter } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const BodyCardAvatar = ({
  useLink,
  publish,
  viewPusblish,
  handlerPublish,
  goodId,
  img,
  bgColor,
  handlerViewPublish
}) => {
  if (useLink)
    return (
      <LinkRouter
        style={{ textDecoration: 'none' }}
        to={publish || viewPusblish ? '#' : { pathname: `/good/${goodId}` }}
      >
        {publish && (
          <CardActionArea onClick={handlerPublish}>
            <CardMedia
              style={{
                backgroundColor: bgColor
              }}
              component="img"
              image={`${mainConfig.ipfsUrl}/ipfs/${img}`}
            />
          </CardActionArea>
        )}
        {viewPusblish && (
          <CardActionArea onClick={handlerViewPublish}>
            <CardMedia
              style={{
                backgroundColor: bgColor
              }}
              component="img"
              image={`${mainConfig.ipfsUrl}/ipfs/${img}`}
            />
          </CardActionArea>
        )}
        {!publish && !viewPusblish && (
          <CardActionArea>
            <CardMedia
              style={{
                backgroundColor: bgColor
              }}
              component="img"
              image={`${mainConfig.ipfsUrl}/ipfs/${img}`}
            />
          </CardActionArea>
        )}
      </LinkRouter>
    )

  return (
    <CardActionArea>
      <CardMedia
        style={{
          backgroundColor: bgColor
        }}
        component="img"
        image={`${mainConfig.ipfsUrl}/ipfs/${img}`}
      />
    </CardActionArea>
  )
}

BodyCardAvatar.propTypes = {
  viewPusblish: PropTypes.bool,
  publish: PropTypes.bool,
  handlerViewPublish: PropTypes.func,
  handlerPublish: PropTypes.func,
  useLink: PropTypes.bool,
  goodId: PropTypes.string,
  img: PropTypes.string,
  bgColor: PropTypes.string
}

const CardAvatar = ({
  id,
  name,
  donation,
  units,
  publish,
  handlerPublish,
  viewPusblish,
  handlerViewPublish,
  useLink,
  onClick,
  img,
  bgColor
}) => {
  const classes = useStyles()

  const handleOnClick = () => {
    onClick && onClick()
  }

  return (
    <Card className={classes.cardAvatarRoot} onClick={handleOnClick}>
      <BodyCardAvatar
        goodId={id}
        useLink={useLink}
        publish={publish}
        viewPusblish={viewPusblish}
        handlerPublish={handlerPublish}
        handlerViewPublish={handlerViewPublish}
        img={img}
        bgColor={bgColor}
      />
      <CardActions>
        <Box>
          <Typography variant="subtitle2">{name}</Typography>
          {donation && units && (
            <Typography variant="subtitle2">
              Donation ${donation} Units:{units}
            </Typography>
          )}
          {donation && !units && (
            <Typography variant="subtitle2">Donation ${donation}</Typography>
          )}
        </Box>
      </CardActions>
    </Card>
  )
}

CardAvatar.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  donation: PropTypes.string,
  units: PropTypes.number,
  publish: PropTypes.bool,
  handlerPublish: PropTypes.func,
  viewPusblish: PropTypes.bool,
  handlerViewPublish: PropTypes.func,
  onClick: PropTypes.func,
  useLink: PropTypes.bool,
  img: PropTypes.string,
  bgColor: PropTypes.string
}

CardAvatar.defaultProp = {
  name: 'no name',
  useLink: true
}

export default CardAvatar
