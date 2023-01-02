import { Container } from '@mui/material';

interface Props {
  children: React.ReactNode;
}

export default function CustomContainer({ children }: Props) {
  return <Container fixed>{children}</Container>;
}
