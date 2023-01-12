import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jockBo5saeFetchApi, jockBoSearchFetchApi } from '../api';
import CustomContainer from '../components/CustomContainer';
import JockBoList from '../components/JockBoList';
import SearchForm from '../components/SearchForm';
import SearchList from '../components/SearchList';
import { JockBoTreeItemInfo } from '../store/types';

export default function SearchPage() {
  const [searchItems, setSearchItems] = useState([]);
  const [gyeBoId, setGyeBoId] = useState('1');
  const [gyeBoTree, setGyeBoTree] = useState<JockBoTreeItemInfo[]>([]);
  const query = useLocation().search;

  // 계보 보는 api가 만들어져야 함
  useEffect(() => {
    jockBo5saeFetchApi(gyeBoId).then((res) => {
      setGyeBoTree(res);
      console.log(gyeBoId);
      console.log(res);
    });
  }, [gyeBoId]);

  useEffect(() => {
    if (query) {
      jockBoSearchFetchApi(query).then((res) => {
        setSearchItems(res);
        console.log(res);
      });
    }
  }, [query]);

  return (
    <Stack>
      <Stack direction="row">
        <SearchForm />
        <CustomContainer>
          <h3>계보 보기</h3>
          {gyeBoTree.length > 0 && (
            <JockBoList
              jockBo={gyeBoTree}
              myId={gyeBoId}
              setGyeBoId={setGyeBoId}
            />
          )}
        </CustomContainer>
      </Stack>
      <CustomContainer>
        {searchItems.length > 0 && (
          <SearchList searchItems={searchItems} setGyeBoId={setGyeBoId} />
        )}
      </CustomContainer>
    </Stack>
  );
}
