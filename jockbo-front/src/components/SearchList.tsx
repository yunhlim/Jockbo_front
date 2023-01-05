import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { JockBoItemInfo } from '../store/types';
import styled from 'styled-components';
import palette from '../utils/palette';

interface Props {
  searchItems: JockBoItemInfo[];
}
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: palette.lightBrown,
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: palette.darkBeige,
  },
  '&:nth-of-type(even)': {
    backgroundColor: palette.beige,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SearchList({ searchItems }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>이름</StyledTableCell>
            <StyledTableCell align="right">세(世)</StyledTableCell>
            <StyledTableCell align="right">부명</StyledTableCell>
            <StyledTableCell align="right">조부명</StyledTableCell>
            <StyledTableCell align="right">자명</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchItems.map((searchItem) => (
            <StyledTableRow key={searchItem._id} hover>
              <StyledTableCell component="th" scope="row">
                {searchItem.myName} ({searchItem.myNamechi})
              </StyledTableCell>
              <StyledTableCell align="right">
                {searchItem.mySae}
              </StyledTableCell>
              <StyledTableCell align="right">
                {searchItem.father.myName} ({searchItem.father.myNamechi})
              </StyledTableCell>
              <StyledTableCell align="right">
                {searchItem.grandPa.myName} ({searchItem.grandPa.myNamechi})
              </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
