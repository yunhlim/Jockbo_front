import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { searchDataInfo } from '../store/types';
import CustomContainer from './CustomContainer';

const TextFieldsWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  autoComplete : off;
  noValidate;
  component: form;
`;

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState<searchDataInfo>({});

  const onChangeText = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    textType: string,
  ) => {
    switch (textType) {
      case 'myName':
        setSearchData((prv) => ({ ...prv, myName: event.target.value }));
        break;
      case 'mySae':
        setSearchData((prv) => ({ ...prv, mySae: event.target.value }));
        break;
      case 'fatherName':
        setSearchData((prv) => ({ ...prv, fatherName: event.target.value }));
        break;
      case 'grandPaName':
        setSearchData((prv) => ({ ...prv, grandPaName: event.target.value }));
        break;
      default:
        break;
    }
  };

  const searchHandler = () => {
    if (Object.keys(searchData).length > 0) {
      navigate({
        pathname: '/search',
        search: `?${createSearchParams(searchData)}`,
      });
    } else {
      alert('입력된 값이 없습니다.');
    }
  };

  return (
    <CustomContainer>
      <h3>족보 검색</h3>
      <TextFieldsWrapper
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
      >
        <TextField
          label="이름"
          variant="standard"
          type="text"
          value={searchData.myName || ''}
          onChange={(e) => onChangeText(e, 'myName')}
        />
        <TextField
          label="세(世)"
          variant="standard"
          type="number"
          value={searchData.mySae || ''}
          onChange={(e) => onChangeText(e, 'mySae')}
        />
        <TextField
          label="부 이름"
          variant="standard"
          type="text"
          value={searchData.fatherName || ''}
          onChange={(e) => onChangeText(e, 'fatherName')}
        />
        <TextField
          label="조부 이름"
          variant="standard"
          type="text"
          value={searchData.grandPaName || ''}
          onChange={(e) => onChangeText(e, 'grandPaName')}
        />
      </TextFieldsWrapper>
      <Box
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
      >
        <Button variant="contained" onClick={searchHandler}>
          검색
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setSearchData({})}
        >
          초기화
        </Button>
      </Box>
    </CustomContainer>
  );
}
