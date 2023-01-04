import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { JockBoItemInfo } from '../store/types';

interface Props {
  searchItems: JockBoItemInfo[];
}
export default function SearchList({ searchItems }: Props) {
  console.log(searchItems);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>이름</TableCell>
            <TableCell align="right">세(世)</TableCell>
            <TableCell align="right">부명</TableCell>
            <TableCell align="right">조부명</TableCell>
            <TableCell align="right">자명</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchItems.map((searchItem) => (
            <TableRow
              key={searchItem._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {searchItem.myName} ({searchItem.myNamechi})
              </TableCell>
              <TableCell align="right">{searchItem.mySae}</TableCell>
              <TableCell align="right">
                {searchItem.father.myName} ({searchItem.father.myNamechi})
              </TableCell>
              <TableCell align="right">
                {searchItem.father.myName} ({searchItem.grandPa.myNamechi})
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
