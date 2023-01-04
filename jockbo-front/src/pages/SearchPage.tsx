import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jockBoSearchFetchApi, totalJockBoFetchApi } from '../api';
import CustomContainer from '../components/CustomContainer';
import JockBoList from '../components/JockBoList';
import SearchForm from '../components/SearchForm';
import SearchList from '../components/SearchList';
import { JockBoTreeItemInfo } from '../store/types';

export default function SearchPage() {
  const [searchItems, setSearchItems] = useState([]);
  const query = useLocation().search;
  const [totalJockBo, setTotalJockBo] = useState<JockBoTreeItemInfo[]>([]);

  // 계보 보는 api가 만들어져야 함
  useEffect(() => {
    totalJockBoFetchApi().then((res) => {
      setTotalJockBo(res);
    });
  }, []);

  useEffect(() => {
    if (query) {
      jockBoSearchFetchApi(query).then((res) => {
        setSearchItems(res);
      });
    }
  }, [query]);

  return (
    <Stack>
      <Stack direction="row">
        <SearchForm />
        <CustomContainer>
          <h3>계보 보기</h3>
          {totalJockBo.length > 0 && <JockBoList jockBo={totalJockBo} />}
        </CustomContainer>
      </Stack>
      <CustomContainer>
        <SearchList searchItems={searchItems} />
      </CustomContainer>
    </Stack>
  );
}
