/*import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './Network.css';

const columns = [
  { id: 'source', label: 'Company Name', minWidth: 170 },
  { id: 'target', label: 'Similar Company', minWidth: 170 },
  { id: 'label', label: 'Similarity Value', minWidth: 170, align: 'center',
    format: (value) => value.toLocaleString('en-US'),
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%'
  },
  container: {
    maxHeight: 440,
    backgroundColor: '#222222',
    boxShadow: "5px 5px 10px #1d1d1d, -5px -5px 10px #272727; !important"
  },
  data: {
      color: 'white'
  }
});

const headCells = [
  { id: 'source', numeric: false, disablePadding: true, label: 'Company Name' },
  { id: 'target', numeric: false, disablePadding: false, label: 'Similar Company' },
  { id: 'simVal', numeric: true, disablePadding: false, label: 'Similarity Value' }
];

export default function StickyHeadTable(networkData) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('simVal');
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  padding={headCell.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {networkData.data.links.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell className={classes.data} key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}*/

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import './Network.css';

function createData(source, target, simVal) {
  return { source, target, simVal};
}

const rows = [
  createData('Cupcake', 'Donut', 3.7),
  createData('Donut', 'Fhoneyrozen', 25.0),
  createData('Eclair', 'Honey', 16.0),
  createData('Frozen yoghurt', 'Jelly', 6.0),
  createData('Gingerbread', 'Oreo', 16.0),
  createData('Honeycomb', 'Cupcake', 3.2),
  createData('Ice cream sandwich', 'Kitkat', 9.0),
  createData('Jelly Bean', 'Nougat', 0.0),
  createData('KitKat', 'Lollipop', 26.0),
  createData('Lollipop', 'Gingerbread', 0.2),
  createData('Marshmallow', 'Donut', 0),
  createData('Nougat', 'Eclair', 19.0),
  createData('Oreo', 'xyz', 18.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'source', numeric: false, label: 'Source', minWidth: 170  },
  { id: 'target', numeric: false, label: 'Target' , minWidth: 170 },
  { id: 'simVal', numeric: true, label: 'Similarity Value', minWidth: 170 }
];

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.data}
            key={headCell.id}
            align='left'
            padding='default'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              className={classes.data}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      }: {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Similar Companies
        </Typography>
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      
    </Toolbar>
  );
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%'
  },
  paper: {
    width: '100%'
  },
  container: {
    maxHeight: 440,
    backgroundColor: '#222222',
    boxShadow: "5px 5px 10px #1d1d1d, -5px -5px 10px #272727; !important"
  },
  table: {
    minWidth: 750,
  },
  data: {
    color: 'white'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    color: 'white',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('simVal');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer className = {classes.container}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='medium'
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              //numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell className={classes.data} component="th" id={labelId} scope="row" padding="default">
                        {row.source}
                      </TableCell>
                      <TableCell className={classes.data} align="left">{row.target}</TableCell>
                      <TableCell className={classes.data} align="left">{row.simVal}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell className={classes.data} colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.container}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
