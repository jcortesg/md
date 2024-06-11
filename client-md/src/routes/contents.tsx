import { useEffect, useState } from "react";
import { Box, Card, CardContent, Container, Typography, Table } from "@mui/joy";
import axios from "axios";
import Modal from '../components/modal.tsx';

interface IContent {
  _id: number;
  title: string;
  description: string;
  topics: {
    _id: string;
    name: string;
  };
  created_at: string;
  category: {
    _id: string;
    name: string;
  };
  topic: {
    _id: string;
    name: string;
  };
  createdAt: string;
  createdBy: {
    _id: string;
    name: string;
  };
}

export const Component =  function List(): JSX.Element {
  const defaultPosts: IContent[] = [];
  const [contens, setContens]: [IContent[], (contents: IContent[]) => void] = useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");
  const [slectedContent, setSelectedContent]: [IContent | null, (content: IContent | null) => void] = useState<IContent | null>(null);
  const [open, setOpen]: [boolean, (value: boolean) => void] = useState<boolean>(false); // Add open and setOpen

  useEffect(() => {
    axios.get('http://localhost:3000/api/contents').then((response) => {
      const content: IContent[] = response.data.contents;
      setContens(content);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setError("Error fetching data");
      setLoading(false);
    })
  }, []);

  const handleShowContent = (content: IContent) => {
    setOpen(true);
    setSelectedContent(content);
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        <Card sx={{ gridArea: "1 / 1 / 2 / -1" }}>
          <CardContent sx={{ minHeight: 300 }}>

            <Table hoverRow>
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Tema</th>
                  <th>Categoria</th>
                  <th>Fecha de creacion</th>
                  <th>Autor</th>
                </tr>
              </thead>
              <tbody>
                {contens.map((row) => (
                  <tr key={row._id} onClick={() => handleShowContent(row)}>
                    <td>{row.title}</td>
                    <td>{row.topic.name}</td>
                    <td>{row.category.name}</td>
                    <td>{row.createdAt}</td>
                    <td>{row.createdBy.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {slectedContent && (
              <Modal
                content={slectedContent}
                open={open}
                setOpen={setOpen} />
            )}
            {error && <p className="error">{error}</p>}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
