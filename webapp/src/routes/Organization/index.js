import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import { CardAvatar } from '../../components/Card'
import styles from './styles'

const useStyles = makeStyles(styles)

const organization = {
  name: 'Marviva',
  category: 'Sealife protection',
  objectives:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae justo eros. Nullam vitae massa vitae ipsum viverra scelerisque vel eu mi. Nullam sodales eros ut erat fringilla laoreet. Duis hendrerit tortor at ex sagittis ullamcorper. Cras leo odio, mattis vitae ultricites id, dapibus sed augue.',
  history:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae justo eros. Nullam vitae massa vitae ipsum viverra scelerisque vel eu mi. Nullam sodales eros ut erat fringilla laoreet. Duis hendrerit tortor at ex sagittis ullamcorper. Cras leo odio, mattis vitae ultricites id, dapibus sed augue.',
  impact:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae justo eros. Nullam vitae massa vitae ipsum viverra scelerisque vel eu mi. Nullam sodales eros ut erat fringilla laoreet. Duis hendrerit tortor at ex sagittis ullamcorper. Cras leo odio, mattis vitae ultricites id, dapibus sed augue.',
  website: 'https://www.marviva.org',
  location: 'Costa Rica',
  email: 'contact@marviva.org',
  goodsList: ['name', 'name', 'name', 'name']
}

const Organization = () => {
  const classes = useStyles()

  return (
    <Box>
      <Box className={classes.mainImageBox}>
        <img
          className={classes.mainImage}
          src="https://www.tastecafeatchesilbeach.co.uk/public/images/sealife%20centre.png"
        />
      </Box>
      <Box className={classes.mainBox}>
        <Box className={classes.titleBox}>
          <Typography noWrap variant="h3">
            {organization.name}
          </Typography>
          <Typography noWrap variant="h6">
            {organization.category}
          </Typography>
        </Box>
        <Box className={classes.sectionBox}>
          <Typography noWrap gutterBottom variant="h6">
            Objectives
          </Typography>
          <Typography variant="body1">{organization.objectives}</Typography>
        </Box>
        <Box className={classes.sectionBox}>
          <Typography noWrap gutterBottom variant="h6">
            History
          </Typography>
          <Typography variant="body1">{organization.history}</Typography>
        </Box>
        <Box className={classes.sectionBox}>
          <Typography noWrap gutterBottom variant="h6">
            Impact
          </Typography>
          <Typography variant="body1">{organization.impact}</Typography>
        </Box>
        <Box className={classes.sectionBox}>
          <Typography noWrap gutterBottom variant="h6">
            Information
          </Typography>
          <Box className={classes.paddingLeftBox}>
            <Box className={classes.subSectionBox}>
              <Typography variant="body1">Website</Typography>
              <Typography variant="body2">{organization.website}</Typography>
            </Box>
            <Box className={classes.subSectionBox}>
              <Typography variant="body1">Location</Typography>
              <Typography variant="body2">{organization.location}</Typography>
            </Box>
            <Box className={classes.subSectionBox}>
              <Typography variant="body1">Contact</Typography>
              <Typography variant="body2">{organization.email}</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.sectionBox}>
          <Typography noWrap gutterBottom variant="h6">
            Our Goods
          </Typography>
          <Box>
            <Grid container spacing={2}>
              {organization.goodsList.map(game => (
                <Grid item xs={6} md={3} lg={2} key={game.name}>
                  <CardAvatar />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Organization
