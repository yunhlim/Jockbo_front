import { Stack } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { JockBoItemInfo } from '../store/types';
import styled from 'styled-components';
import Xarrow, { Xwrapper } from 'react-xarrows';
import _ from 'lodash';
import CustomContainer from './CustomContainer';

interface Props {
  totalJockBo: JockBoItemInfo[];
}

const JockBoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 2rem;
  background: black;
  margin: 0.5rem;
  padding: 0.5rem;
  color: white;
`;

const SaeItem = styled(JockBoItem)`
  width: 3rem;
`;

export default function JockBoList({ totalJockBo }: Props) {
  // 세의 시작과 끝 값
  const [saeStartValue, setSaeStartValue] = useState<number>(0);
  const [saeLastValue, setSaeLastValue] = useState<number>(0);

  const [JockBoComponent, setJockBoComponent] = useState(<div></div>);

  // 족보 생성은 한 번만 되도록
  useEffect(() => {
    setJockBoComponent(
      <Xwrapper>{JockBoTreeRecur(0, totalJockBo, '-1')}</Xwrapper>,
    );
  }, []);

  // 족보 생성
  const JockBoTreeRecur = useCallback(
    (cur: number, items: JockBoItemInfo[], prv: string) => {
      // 이전 형제 정보 저장
      let sibling = '-1';
      let newSibling = '-1';

      // 세 시작과 끝 값 찾기(표의 왼쪽 칼럼을 정의하기 위함)
      if (cur === 0) {
        setSaeStartValue(Number(items[0].mySae));
      } else if (saeLastValue < Number(items[0].mySae)) {
        setSaeLastValue(Number(items[0].mySae));
      }

      return (
        <Stack direction="row">
          {items.map((item, idx) => {
            sibling = newSibling;
            newSibling = `${item._id}`;
            return (
              <Stack key={item._id}>
                <JockBoItem id={`${item._id}`}>
                  {item.myName} {item.myNamechi}
                </JockBoItem>
                {item.children.length > 0 &&
                  JockBoTreeRecur(cur + 1, item.children, `${item._id}`)}
                {/* 형제 사이 연결 */}
                {idx > 0 && (
                  <Xarrow
                    showHead={false}
                    start={`${item._id}`}
                    end={sibling}
                    lineColor={'black'}
                  />
                )}
              </Stack>
            );
          })}
          {/* 자식 관계 라인 연결 */}
          {cur > 0 && (
            <Xarrow
              showHead={false}
              start={`${items[0]._id}`}
              end={prv}
              lineColor={'black'}
            />
          )}
          <div />
        </Stack>
      );
    },
    [],
  );

  return (
    <CustomContainer>
      <Stack direction="row">
        <Stack>
          {_.range(saeStartValue, saeLastValue + 1).map((sae) => {
            return <SaeItem key={sae}>{sae} 世</SaeItem>;
          })}
        </Stack>
        {JockBoComponent}
      </Stack>
    </CustomContainer>
  );
}
