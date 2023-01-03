import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jockBoSearchFetchApi } from '../api';
import CustomContainer from '../components/CustomContainer';
import SearchList from '../components/SearchList';

export default function SearchPage() {
  const [searchItems, setSearchItems] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    if (query) {
      jockBoSearchFetchApi(query).then((res) => {
        setSearchItems(res);
      });
    }
  }, [query]);

  return (
    <CustomContainer>
      <SearchList searchItems={searchItems} />
    </CustomContainer>
  );
}
