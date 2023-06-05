import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: 20,
    overflow: 'auto',
    maxHeight: 'calc(100vh - 200px)',
    position: 'relative',
  },
  table: {
    tableLayout: 'fixed',
  },
  tableHeader: {
    backgroundColor: '#782ed9',
    color: 'white',
    padding: theme.spacing(1),
    textAlign: 'left',
    position: 'sticky',
    top: 0,
    cursor: 'pointer'
  },
  tableCell: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1),
    wordBreak: 'break-word',
    maxWidth: 150,
    whiteSpace: 'pre-wrap',
    overflowWrap: 'break-word',
  },
  sortIcon: {
    fontSize: '1rem',
    marginLeft: theme.spacing(0.5),
  },
}));



function DataTable({ data }) {
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    let sorted = [...data];
    if (sortColumn) {
      sorted = sorted.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];
        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sorted;
  }, [data, sortColumn, sortOrder]);

  const classes = useStyles();
  const tableRef = useRef(null);

  const handleScroll = () => {
    const { scrollTop } = tableRef.current;
    const tbody = tableRef.current.querySelector('.table-body');
    if (tbody) {
      tbody.scrollTop = scrollTop;
    }
  };

  return (
    <div className={classes.tableContainer} onScroll={handleScroll} ref={tableRef}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map((key) => (
              <TableCell
                key={key}
                className={classes.tableHeader}
                onClick={() => handleSort(key)}
              >
                {key}
                {sortColumn === key && (
                  <span className={classes.sortIcon}>
                    {sortOrder === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </span>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              {Object.values(item).map((value, index) => (
                <TableCell key={index} className={classes.tableCell}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
