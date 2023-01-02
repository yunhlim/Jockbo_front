import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TextFieldsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  autoComplete : off;
  noValidate;
  component: form;
`;

export default function SearchForm() {
  // 이름
  // 세
  // 아버지 이름
  // 할아버지 이름
  const navigate = useNavigate();
  return (
    <>
      <h3>족보 검색</h3>
      <TextFieldsWrapper
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <TextField label="이름" variant="standard" />
        <TextField label="세(世)" variant="standard" />
        <TextField label="부 이름" variant="standard" />
        <TextField label="조부 이름" variant="standard" />
      </TextFieldsWrapper>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate('/search');
          }}
        >
          검색
        </Button>
        <Button variant="contained" color="warning">
          초기화
        </Button>
      </Box>
    </>
  );
}
