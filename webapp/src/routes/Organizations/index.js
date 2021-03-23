import React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { CardOng } from '../../components/Card'
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
              <CardOng
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
