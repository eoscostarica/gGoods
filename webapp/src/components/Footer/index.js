import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import MuiListItem from '@material-ui/core/ListItem'

import { mainConfig } from '../../config'

import styles from './styles'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <Grid container item xs={12}>
        <List>
          {mainConfig.footerLinks.map((link, index) => (
            <MuiListItem key={index} className={classes.listItem}>
              <ListItemText
                primary={
                  <a href={link.src} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </a>
                }
              />
            </MuiListItem>
          ))}
        </List>
      </Grid>
    </div>
  )
}

export default Footer
