import { useEffect } from "react";
import { Container } from "@mui/joy";
import { useParams } from 'react-router-dom';

export const Component =  function Show(): JSX.Element {
  const { contentId } = useParams();
  
  useEffect(() => {
  }, []);

console.log(contentId); 
  return (
    <Container sx={{ py: 2 }}>
      xxxx
    </Container>
  );
}