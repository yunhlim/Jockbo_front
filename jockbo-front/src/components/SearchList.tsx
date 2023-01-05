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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Box, Modal, Typography } from '@mui/material';
import { jockBoDetailFetchApi } from '../api';

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

const ModalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SearchList({ searchItems }: Props) {
  const [open, setOpen] = useState(false);
  const [userEtc, setUserEtc] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userDetailClickHandler = (id: string) => {
    handleOpen();
    jockBoDetailFetchApi(id).then((res) => {
      console.log(res);
      setUserEtc(res[0].ect);
    });
  };

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
            <StyledTableCell align="right">상세정보</StyledTableCell>
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
              <StyledTableCell align="right">
                <button
                  onClick={() => userDetailClickHandler(searchItem._id)}
                  style={{ border: 0, outline: 0 }}
                >
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    color={palette.darkBrown}
                    size={'2x'}
                  />
                </button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={ModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            상세 정보
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {userEtc}
          </Typography>
        </Box>
      </Modal>
    </TableContainer>
  );
}
