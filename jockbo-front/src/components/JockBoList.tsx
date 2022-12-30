import { Stack } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { JockBoItemInfo } from '../store/types';
import styled from 'styled-components';
import Xarrow, { Xwrapper } from 'react-xarrows';

interface props {
  items: JockBoItemInfo[];
}

const lineThickness = 5;
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
  const JockBoTreeComponents = (
    cur: number,
    items: JockBoItemInfo[],
    prv: string,
  ) => {
    let sibling = '-1';
    let newSibling = '-1';
    // 이전 형제 정보 저장
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
    <div id="root">
      <Stack direction="row">
        <Stack>
          <SaeItem>1기</SaeItem>
          <SaeItem>2기</SaeItem>
          <SaeItem>3기</SaeItem>
        </Stack>
        <Stack>
          <JockBoItem>스루</JockBoItem>
          <Stack direction="row">
            <JockBoItem>스루 2세 1</JockBoItem>
            <JockBoItem>스루 2세 2</JockBoItem>
          </Stack>
        </Stack>
        <JockBoItem>예슬</JockBoItem>
      </Stack>
      <Xwrapper>{JockBoTreeComponents(0, items, '-1')}</Xwrapper>
    </div>
  );
}
