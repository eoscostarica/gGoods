import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import TelegramIcon from '@material-ui/icons/Telegram'
import Github from '../../images/assets/github.svg'
import EOSCRLogo from '../../images/assets/eoscr-logo.svg'

import styles from './styles'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Grid container item xs={12} className={classes.gridContent}>
        <List className={classes.iconsList}>
          <ListItem className={classes.listItem}>
            <a href="https://t.me/eoscr">
              <TelegramIcon className={classes.icon} />
            </a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={
                <a
                  href="https://github.com/eoscostarica/gGoods"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={Github} alt="github" />
                </a>
              }
            />
          </ListItem>
        </List>
        <Typography className={classes.legend}>
          gGoods is an open source project, check out our repo and join the
          Discord channel.
        </Typography>
        <List className={classes.iconsList}>
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={
                <a href="" target="_blank" rel="noopener noreferrer">
                  <img src={EOSCRLogo} alt="eoscr logo" />
                </a>
              }
            />
          </ListItem>
        </List>
        <Typography className={classes.orgName}>
          EOS Costa Rica - 2021
        </Typography>
      </Grid>
    </Box>
  )
}

export default memo(Footer)
