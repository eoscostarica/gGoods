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

import Img from '../../images/avatar.png'

import styles from './styles'

const useStyles = makeStyles(styles)

const CardAvatar = ({
  id,
  name,
  donation,
  units,
  publish,
  handlerPublish,
  viewPusblish,
  handlerViewPublish
}) => {
  const classes = useStyles()

  return (
    <Card className={classes.cardAvatarRoot}>
      <LinkRouter
        style={{ textDecoration: 'none' }}
        to={publish ? '#' : { pathname: `/good/ID` }}
      >
        {publish && (
          <CardActionArea onClick={handlerPublish}>
            <CardMedia component="img" image={Img} />
          </CardActionArea>
        )}
        {viewPusblish && (
          <CardActionArea onClick={handlerViewPublish}>
            <CardMedia component="img" image={Img} />
          </CardActionArea>
        )}
        {!publish && !viewPusblish && (
          <CardActionArea>
            <CardMedia component="img" image={Img} />
          </CardActionArea>
        )}
      </LinkRouter>
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
  handlerViewPublish: PropTypes.func
}

export default CardAvatar
