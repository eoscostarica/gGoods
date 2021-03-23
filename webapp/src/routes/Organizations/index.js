import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import Grid from '@material-ui/core/Grid'

import styles from './styles'

const useStyles = makeStyles(styles)

const orgnizationsList = [
  {
    name: 'Marviva',
    category: 'Sealife Protection',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat auctor faucibus. Donec sed arcu eu elit gravida rhoncus id non eu tempor diam maximu',
    img:
      'https://www.aquariumofpacific.org/images/made_new/images-news-John_Enright_NU_Orca_Adventure_FINAL_300_900_q85.jpg'
  },
  {
    name: 'NonProfit Name',
    category: 'Sealife Protection',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat auctor faucibus. Donec sed arcu eu elit gravida rhoncus id non eu tempor diam maximu',
    img:
      'https://www.tastecafeatchesilbeach.co.uk/public/images/sealife%20centre.png'
  },
  {
    name: 'NonProfit Name',
    category: 'Sealife Protection',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat auctor faucibus. Donec sed arcu eu elit gravida rhoncus id non eu tempor diam maximu',
    img:
      'https://www.tastecafeatchesilbeach.co.uk/public/images/sealife%20centre.png'
  },
  {
    name: 'NonProfit Name',
    category: 'Sealife Protection',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus consequat auctor faucibus. Donec sed arcu eu elit gravida rhoncus id non eu tempor diam maximu',
    img:
      'https://www.tastecafeatchesilbeach.co.uk/public/images/sealife%20centre.png'
  }
]

const Organizations = () => {
  const classes = useStyles()
  const { t } = useTranslation('organizationsRoute')

  const CardComponent = ({ name, category, description, img }) => {
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
            <Typography className={classes.cardCategory} component="h4">
              {category}
            </Typography>
            <Box className={classes.cardDescriptionBox}>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actionArea}>
          <IconButton
            aria-label="open"
            className={classes.arrowIcon}
            color="primary"
          >
            <ArrowForwardIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }

  CardComponent.propTypes = {
    name: PropTypes.string,
    category: PropTypes.string,
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
          {orgnizationsList.map(org => (
            <Grid item xs={12} md={6} lg={3} key={org.name}>
              <CardComponent
                name={org.name}
                category={org.category}
                description={org.description}
                img={org.img}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}

Organizations.propTypes = {}

export default Organizations
