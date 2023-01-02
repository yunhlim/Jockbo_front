import { useEffect, useState } from 'react';
import { totalJockBoFetchApi } from '../api';
import JockBoList from '../components/JockBoList';
import { JockBoItemInfo } from '../store/types';

export default function TotalPage() {
  const [totalJockBo, setTotalJockBo] = useState<JockBoItemInfo[]>([]);
  useEffect(() => {
    totalJockBoFetchApi().then((res) => {
      setTotalJockBo(res);
    });
  }, []);

  return (
    <div>
      <h3>족보 보기</h3>
      {totalJockBo.length > 0 && <JockBoList totalJockBo={totalJockBo} />}
    </div>
  );
}
