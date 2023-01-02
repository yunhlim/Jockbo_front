import { Stack } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { JockBoItemInfo } from '../store/types';
import styled from 'styled-components';
import Xarrow, { Xwrapper } from 'react-xarrows';
import _ from 'lodash';

interface props {
  jockBos: JockBoItemInfo[];
}

const margin = 0.3;

const JockBoItem = styled.div`
  width: 5rem;
  height: 2rem;
  background: black;
  text-align: center;
  margin: ${margin}rem;
  align-items: center;
`;

const SaeItem = styled(JockBoItem)`
  width: 3rem;
`;

export default function JockBoList({ jockBos }: props) {
  // 세의 시작과 끝 값
  const [saeStartValue, setSaeStartValue] = useState(0);
  const [saeLastValue, setSaeLastValue] = useState(0);

  const [JockBoComponent, setJockBoComponent] = useState(<div></div>);

  // 족보 생성은 한 번만 되도록
  useEffect(() => {
    setJockBoComponent(
      <Xwrapper>{JockBoTreeRecur(0, jockBos, '-1')}</Xwrapper>,
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
        setSaeStartValue(items[0].mySae);
      } else if (saeLastValue < items[0].mySae) {
        setSaeLastValue(items[0].mySae);
      }

      return (
        <Stack direction="row">
          {items.map((item, idx) => {
            sibling = newSibling;
            newSibling = `${item._id}`;
            return (
              <Stack key={item._id}>
                <JockBoItem id={`${item._id}`}>{item.myName}</JockBoItem>
                {item.children.length > 0 &&
                  JockBoTreeRecur(cur + 1, item.children, `${item._id}`)}
                {/* 형제 사이 연결 */}
                {idx > 0 && (
                  <Xarrow
                    showHead={false}
                    start={`${item._id}`}
                    end={sibling}
                  />
                )}
              </Stack>
            );
          })}
          {/* 자식 관계 라인 연결 */}
          {cur > 0 && (
            <Xarrow showHead={false} start={`${items[0]._id}`} end={prv} />
          )}
          <div />
        </Stack>
      );
    },
    [],
  );

  return (
    <div>
      <Stack direction="row">
        <Stack>
          {_.range(saeStartValue, saeLastValue + 1).map((sae) => {
            return <SaeItem key={sae}>{sae}세</SaeItem>;
          })}
        </Stack>
        {JockBoComponent}
      </Stack>
    </div>
  );
}
