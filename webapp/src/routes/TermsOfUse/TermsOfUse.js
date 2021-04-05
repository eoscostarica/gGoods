import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useQuery } from '@apollo/client'
import Box from '@material-ui/core/Box'

import RicardianContract from '../../components/RicardianContract'

import { GET_CONTRACTS_QUERY } from '../../gql'

const useStyles = makeStyles(theme => ({
  tabsWrapper: {
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down('sm')]: {
      '& button': {
        width: '33.3vw'
      }
    }
  },
  wrapper: {
    height: '100%',
    padding: theme.spacing(2, 1, 0, 1),
    '& img': {
      width: 80
    },
    '& p': {
      color: theme.palette.primary.mediumEmphasizedBlackText,
      fontSize: 16,
      lineHeight: 1.75,
      letterSpacing: '0.5px',
      margin: theme.spacing(1, 0, 2, 0)
    },
    '& h1, & h2': {
      textTransform: 'capitalize',
      margin: 0
    },
    '& p a': {
      wordBreak: 'break-all'
    }
  }
}))

const TermsOfUse = () => {
  const classes = useStyles()
  const { data: { ggoodsggoods } = {} } = useQuery(GET_CONTRACTS_QUERY)
  return (
    <>
      {ggoodsggoods && (
        <Box className={classes.wrapper}>
          <RicardianContract
            name={ggoodsggoods.name}
            hash={ggoodsggoods.hash}
            abi={ggoodsggoods.abi}
          />
        </Box>
      )}
    </>
  )
}

export default TermsOfUse
