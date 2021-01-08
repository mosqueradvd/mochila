import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import Layout from 'components/Layout'
import { fetchOrganizations } from '@dux/organizationsSlice'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableSortLabel,
  Paper,
  Box,
  Typography,
  TableRow,
  Container,
  Button
} from '@material-ui/core'
import { Search as SearchIcon, Edit as EditIcon } from '@material-ui/icons'
import Skeleton from '@material-ui/lab/Skeleton'

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  { id: 'id_organizacion', numeric: true, label: 'Número' },
  { id: 'representante_legal', numeric: false, label: 'Representante legal' },
  { id: 'nombre', numeric: false, label: 'Organización' },
  { id: 'ver', numeric: false, label: 'Ver' },
  { id: 'modificar', numeric: false, label: 'Modificar' }
]

function EnhancedTableHead (props) {
  const { classes, order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox' />
        {headCells.map((headCell) => {
          const orderLabel = order === 'desc' ? 'sorted descending' : 'sorted ascending'
          return (
            <TableCell
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (<span className={classes.visuallyHidden}>{orderLabel}</span>) : null}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  box: {
    marginBottom: theme.spacing(1)
  },
  search: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(6),
    maxWidth: 400
  },
  skeleton: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const ComponentListOrganizations = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.organizations.isLoading)
  const organizations = useSelector(state => state.organizations.data)
  useEffect(() => {
    dispatch(fetchOrganizations())
  }, [dispatch])

  console.log('organization', organizations)
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected] = useState([])
  const [page, setPage] = useState(0)

  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, organizations.length - page * rowsPerPage)

  if (isLoading) {
    return (
      <div className={classes.skeleton}>
        <Skeleton animation={false} width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='pulse' width={350} height={30} />
        <Skeleton animation='wave' width={350} height={30} />
        <Skeleton animation='wave' width={350} height={30} />
        <Skeleton animation='wave' width={350} height={30} />
        <Skeleton animation='wave' variant='rect' width={350} height={200} />
      </div>
    )
  }
  return (
    <Layout pageTitle='modificar organizaciones'>
      <Container className={classes.container}>
        <Box display='flex' justifyContent='space-between' className={classes.box}>
          <Typography variant='h4' color='primary'>
            Organizaciones
          </Typography>
          <Link href='/admin/organization/new'>
            <Button
              variant='contained'
              color='primary'
            >
              Crear Organización
            </Button>
          </Link>

        </Box>

        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby='tableTitle'
              aria-label='enhanced table'
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={organizations.length}
              />
              <TableBody>
                {stableSort(organizations, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox' />
                        <TableCell component='th' id={labelId} scope='row'>
                          {index + 1}
                        </TableCell>
                        <TableCell align='left'>
                          {row.legalRepresentative}
                        </TableCell>
                        <TableCell align='left'>{row.name}</TableCell>
                        <TableCell align='left'>
                          <Button>
                            <Link
                              href={`/admin/organization/${row._id}`}
                            >
                              <SearchIcon />
                            </Link>
                          </Button>

                        </TableCell>
                        <TableCell align='left'>
                          <Button>
                            <Link
                              href={`/admin/organization/edit/${row._id}`}
                            >
                              <EditIcon />
                            </Link>
                          </Button>

                        </TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            count={organizations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </Layout>
  )
}

export default ComponentListOrganizations
