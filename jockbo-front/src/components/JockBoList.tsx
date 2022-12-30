import { Stack } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { JockBoItemInfo, JockBoLineStyle } from '../store/types';
import styled from 'styled-components';
import Xarrow, { useXarrow, Xwrapper } from 'react-xarrows';

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

const JockBoHorizonLine = styled.div<JockBoLineStyle>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${lineThickness}px;
  background: pink;
`;

const JockBoVerticalLine = styled.div<JockBoLineStyle>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${lineThickness}px;
  height: ${margin * 2}rem;
  background: pink;
`;

export default function JockBoList({ items }: props) {
  const [position, setPosition] = useState({
    slu: { top: 0, right: 0, bottom: 0, left: 0 },
    yesl: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  // 딕셔너리 형태로 선언! key는 id 값은 HtmlDivElement
  const locationRef = useRef<Map<number, HTMLDivElement>>(
    new Map<number, HTMLDivElement>(),
  );
  const sluRef = useRef<HTMLDivElement>(null);
  const yeslRef = useRef<HTMLDivElement>(null);

  const getElementPosition = () => {
    if (sluRef.current === null) {
      return;
    }
    if (yeslRef.current === null) {
      return;
    }
    setPosition({
      slu: {
        top: sluRef.current.getBoundingClientRect().top,
        right: sluRef.current.getBoundingClientRect().right,
        left: sluRef.current.getBoundingClientRect().left,
        bottom: sluRef.current.getBoundingClientRect().bottom,
      },
      yesl: {
        top: yeslRef.current.getBoundingClientRect().top,
        right: yeslRef.current.getBoundingClientRect().right,
        left: yeslRef.current.getBoundingClientRect().left,
        bottom: yeslRef.current.getBoundingClientRect().bottom,
      },
    });
  };

  const JockBoTreeComponents = (cur: number, items: JockBoItemInfo[]) => {
    const [position, setPosition] = useState({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    });

    return (
      <Stack direction="row">
        {items.map((item, idx) => {
          useEffect(() => {
            if (cur !== 0 && idx === 0) {
              if (locationRef.current.get(item._id) === undefined) {
                return;
              }
              setPosition({
                top: locationRef.current.get(item._id)!.getBoundingClientRect()
                  .top,
                left: locationRef.current.get(item._id)!.getBoundingClientRect()
                  .left,
                right: locationRef.current
                  .get(item._id)!
                  .getBoundingClientRect().right,
                bottom: locationRef.current
                  .get(item._id)!
                  .getBoundingClientRect().bottom,
              });
            }
          }, [locationRef.current]);
          return (
            <Stack
              key={item._id}
              ref={
                idx != 0
                  ? null
                  : (element: HTMLDivElement) => {
                      locationRef.current.set(item._id, element);
                    }
              }
            >
              <JockBoItem>{item.myName}</JockBoItem>
              {item.children.length > 0 &&
                JockBoTreeComponents(cur + 1, item.children)}
              {
                <JockBoVerticalLine
                  top={position.top - lineThickness}
                  left={(position.left + position.right - lineThickness) / 2}
                />
              }
            </Stack>
          );
        })}
        <div />
      </Stack>
    );
  };

  useEffect(() => {
    getElementPosition();
  }, [sluRef.current, yeslRef.current]);

  return (
    <div id="root">
      <Stack direction="row">
        <Stack>
          <SaeItem>1기</SaeItem>
          <SaeItem>2기</SaeItem>
          <SaeItem>3기</SaeItem>
        </Stack>
        <Stack>
          <JockBoItem ref={sluRef}>스루</JockBoItem>
          <Stack direction="row">
            <JockBoItem>스루 2세 1</JockBoItem>
            <JockBoItem>스루 2세 2</JockBoItem>
          </Stack>
        </Stack>
        <JockBoItem ref={yeslRef}>예슬</JockBoItem>
      </Stack>
      <JockBoHorizonLine
        top={(position.slu.top + position.slu.bottom - lineThickness) / 2}
        left={position.slu.right}
        width={position.yesl.left - position.slu.right}
      />
      {JockBoTreeComponents(0, items)}
    </div>
  );
}
