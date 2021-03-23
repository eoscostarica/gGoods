import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import styles from './styles'

const useStyles = makeStyles(styles)

const GamesList = [
  {
    name: 'Selfie Cam',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat auctor faucibus. Donec sed arcu eu elit gravida',
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGLm94nV3FeX81RSgRuKGJ2RDTtqJNblQVWw&usqp=CAU'
  },
  {
    name: 'Free your Animal',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat auctor faucibus. Donec sed arcu eu elit gravida rhoncus id non eu tempor diam maximu',
    img:
      'https://images-na.ssl-images-amazon.com/images/I/71XltR452RL._AC_SL1500_.jpg'
  }
]

const Games = () => {
  const classes = useStyles()
  const { t } = useTranslation('gamesRoute')

  const CardComponent = ({ name, description, img }) => {
    return (
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={img} title={name} />
          <CardContent>
            <Typography
              className={classes.cardTitle}
              variant="h5"
              component="h2"
            >
              {name}
            </Typography>
            <Box className={classes.cardDescriptionBox}>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actionArea}>
          <Button color="primary" className={classes.buttonCard}>
            Play game
          </Button>
        </CardActions>
      </Card>
    )
  }

  CardComponent.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.string
  }

  return (
    <Box>
      <Typography variant="h4" className={classes.titlePage}>
        {t('title')}
      </Typography>
      <Typography className={classes.textPageDescription}>
        {t('paragraph1')}
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {GamesList.map(game => (
            <Grid item xs={12} md={6} lg={3} key={game.name}>
              <CardComponent
                name={game.name}
                category={game.category}
                description={game.description}
                img={game.img}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

Games.propTypes = {}

export default Games
