import { useEffect } from 'react';
import { totalJockBoFetchApi } from '../api';
import JockBoList from '../components/JockBoList';

export default function TotalPage() {
  useEffect(() => {
    totalJockBoFetchApi().then((res) => {
      console.log(res);
    });
  }, []);

  const data = [
    {
      _id: 1,
      mySae: 1,
      myName: '이병철',
      children: [
        {
          _id: 2,
          mySae: 2,
          myName: '이맹희',
          children: [
            {
              _id: 8,
              mySae: 3,
              myName: '이미경',
            },
            {
              _id: 9,
              mySae: 3,
              myName: '이재현',
            },
          ],
        },
        {
          _id: 3,
          mySae: 2,
          myName: '이창희',
        },
        {
          _id: 4,
          mySae: 2,
          myName: '이건희',
          children: [
            {
              _id: 10,
              mySae: 3,
              myName: '이재용',
            },
            {
              _id: 11,
              mySae: 3,
              myName: '이부진',
            },
            {
              _id: 12,
              mySae: 3,
              myName: '이서현',
            },
          ],
        },
        {
          _id: 5,
          mySae: 2,
          myName: '이인희',
          children: [
            {
              _id: 13,
              mySae: 3,
              myName: '조동혁',
            },
            {
              _id: 14,
              mySae: 3,
              myName: '조동만',
            },
            {
              _id: 15,
              mySae: 3,
              myName: '조동길',
            },
          ],
        },
        {
          _id: 6,
          mySae: 2,
          myName: '이숙희',
        },
        {
          _id: 7,
          mySae: 2,
          myName: '이명희',
          children: [
            {
              _id: 16,
              mySae: 3,
              myName: '정용진',
            },
            {
              _id: 17,
              mySae: 3,
              myName: '정유경',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      <h3>족보 보기</h3>
      <JockBoList items={data} />
    </div>
  );
}
