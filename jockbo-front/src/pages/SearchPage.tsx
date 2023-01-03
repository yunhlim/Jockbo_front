import { useEffect, useState } from 'react';
import { jockBoListFetchApi } from '../api';
import CustomContainer from '../components/CustomContainer';
import SearchList from '../components/SearchList';

export default function SearchPage() {
  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    jockBoListFetchApi().then((res) => {
      setSearchItems(res);
    });
  }, []);

  return (
    <CustomContainer>
      <SearchList searchItems={searchItems} />
    </CustomContainer>
  );
}
