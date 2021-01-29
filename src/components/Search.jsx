import React from 'react'
import { TextField, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  search: {
    marginBottom: theme.spacing(3)
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    width: '400'
  }

}))

const Search = ({ search, searchInput, handleSearch }) => {
  const classes = useStyles()

  return (
    <Box className={classes.box}>
      <TextField
        type='text'
        value={search}
        inputRef={searchInput}
        onChange={handleSearch}
        className={classes.search}
        placeholder='Buscar'
        variant='outlined'
      />
    </Box>
  )
}

Search.propTypes = {
  search: PropTypes.string,
  searchInput: PropTypes.object,
  handleSearch: PropTypes.func
}

export default Search
