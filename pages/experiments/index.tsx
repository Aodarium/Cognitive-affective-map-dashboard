import { useEffect, useState } from 'react';
import { Blockquote, Button, Container, Loader, Space } from '@mantine/core';
import router from 'next/router';
import { TableReviews } from '@/components/ExperimentList/ExperimentList';
import { Header } from '@/components/HeaderTab/Header';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(null);

  const url = `${process.env.URL_HOST}/researchers/getExperimentByAuthor`;
  useEffect(() => {
    setIsLoading(true);
    fetch(url, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((responseData) => {
        setIsLoading(false);
        setData(responseData);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <>
      <Header activeLink="/experiments" loggedIn />
      {data && (
        <>
          <TableReviews data={data} />
          <Space h="xl" />
          <Space h="xl" />
          <Container size={420}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outline" color="green" onClick={() => router.push('/newExperiment')}>
                Add new experiment
              </Button>
            </div>
          </Container>
        </>
      )}
      {isLoading && (
        <Container
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader color="blue" size="xl" />
        </Container>
      )}
      {isError && (
        <Container size={420}>
          <Blockquote color="red" radius="lg" iconSize={30} mt="xl">
            It looks like something is not good well. Try again later.
          </Blockquote>
        </Container>
      )}
    </>
  );
}
