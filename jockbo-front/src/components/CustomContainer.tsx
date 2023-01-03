import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const ContainerWrap = styled.div`
  margin: 2rem;
`;

export default function CustomContainer({ children }: Props) {
  return <ContainerWrap>{children}</ContainerWrap>;
}
