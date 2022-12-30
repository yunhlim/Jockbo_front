import { Stack } from '@mui/material';
import { useState, useRef } from 'react';
import { JockBoItemInfo } from '../store/types';
import styled from 'styled-components';
import Xarrow, { Xwrapper } from 'react-xarrows';
import _ from 'lodash';

interface props {
  items: JockBoItemInfo[];
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

export default function JockBoList({ items }: props) {
  // 세의 시작과 끝 값
  const saeStartValue = useRef(0);
  const saeLastValue = useRef(0);

  // 족보 생성
  const JockBoTreeComponents = (
    cur: number,
    items: JockBoItemInfo[],
    prv: string,
  ) => {
    let sibling = '-1';
    let newSibling = '-1';
    // 이전 형제 정보 저장

    // 세 시작과 끝 값 찾기(표의 왼쪽 칼럼을 정의하기 위함)
    if (cur === 0) {
      saeStartValue.current = items[0].mySae;
    } else if (saeLastValue.current < items[0].mySae) {
      saeLastValue.current = items[0].mySae;
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
                JockBoTreeComponents(cur + 1, item.children, `${item._id}`)}
              {/* 형제 사이 연결 */}
              {idx > 0 && (
                <Xarrow showHead={false} start={`${item._id}`} end={sibling} />
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
  };

  return (
    <div>
      <Stack direction="row">
        <Stack>
          {_.range(saeStartValue.current, saeLastValue.current + 1).map(
            (sae) => {
              return <SaeItem key={sae}>{sae}세</SaeItem>;
            },
          )}
        </Stack>
        <Xwrapper>{JockBoTreeComponents(0, items, '-1')}</Xwrapper>
      </Stack>
    </div>
  );
}
