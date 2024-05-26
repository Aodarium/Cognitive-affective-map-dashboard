import { useRouter } from 'next/router';
import { Blockquote, Container } from '@mantine/core';
import { useState } from 'react';
import { NewExpForm } from '@/components/NewExpForm/NewExpForm';
import { Header } from '@/components/HeaderTab/Header';

function validateConfiguration(file: string) {
  file;
  return true;
}

export default function HomePage() {
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState(0);
  const [error, setError] = useState('');
  const [colour, setColour] = useState('');
  const router = useRouter();

  async function submitForm(data: any) {
    const body = {
      name: data.expName,
      link: data.link,
      numberOfParticipantsWanted: data.numberOfParticipantsWanted,
      configuration: JSON.stringify(data.configuration),
    };

    setIsError(!validateConfiguration(data));

    const url = `${process.env.URL_HOST}/researchers/addExperiment`;

    fetch(url, {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => {
        setErrorStatus(res.status);
        return res.json();
      })
      .then((responseData) => {
        if (errorStatus !== 201) {
          setIsError(true);
          setError(responseData.message);
          setColour('red');
          return;
        }
        setIsError(true);
        setColour('green');
        setTimeout(() => router.push('/experiments'), 2000);
      })
      .catch(() => {
        setIsError(true);
      });
  }
  return (
    <>
      <Header activeLink="/experiments" loggedIn />
      <NewExpForm submitFormEvent={submitForm} />
      {isError && (
        <Container size={420}>
          <Blockquote color={colour} radius="lg" iconSize={30} mt="xl">
            {error}
          </Blockquote>
        </Container>
      )}
    </>
  );
}
