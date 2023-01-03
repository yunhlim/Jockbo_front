import { useEffect, useState } from 'react';
import { totalJockBoFetchApi } from '../api';
import CustomContainer from '../components/CustomContainer';
import JockBoList from '../components/JockBoList';
import { JockBoTreeItemInfo } from '../store/types';

export default function TotalPage() {
  const [totalJockBo, setTotalJockBo] = useState<JockBoTreeItemInfo[]>([]);
  useEffect(() => {
    totalJockBoFetchApi().then((res) => {
      setTotalJockBo(res);
    });
  }, []);

  return (
    <CustomContainer>
      <h3>전체 족보</h3>
      {totalJockBo.length > 0 && <JockBoList totalJockBo={totalJockBo} />}
    </CustomContainer>
  );
}
