import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Badge,
  Blockquote,
  Button,
  Container,
  Loader,
  Notification,
  Space,
  rem,
} from '@mantine/core';
import Router from 'next/router';
import { IconCheck } from '@tabler/icons-react';
import { StatsGridIcons } from '@/components/StatExperiment/StatExperiment';
import { TableParticipants } from '@/components/ParticipantList/ParticipantList';
import StatusModal from '@/components/StatusModal/StatusModal';
import { getStatusColor } from '@/utils/generals';
import { Experiment } from '@/utils/types';
import { Header } from '@/components/HeaderTab/Header';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [experimentContent, setExperimentContent] = useState({} as Experiment);
  const [errorMessage, setErrorMessage] = useState('');
  const [idExperiment, setIdExperiment] = useState('');
  const [isDataReady, setIsDataReady] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [includedData, setIncludedData] = useState(new Set<string>());
  const searchParams = useSearchParams();
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  useEffect(() => {
    let id = searchParams.get('id') || '';
    if (id !== '') {
      window.localStorage.setItem('id', id);
    } else {
      id = window.localStorage.getItem('id') || '';
    }
    setIdExperiment(id);
    const url = `${process.env.URL_HOST}/researchers/getExperimentById?id=${id}`;

    setIsLoading(true);
    fetch(url, {
      credentials: 'include',
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status !== 200) {
          setErrorMessage(data.message);
          throw new Error(errorMessage);
        }
        return data;
      })
      .then((data) => {
        setIsLoading(false);
        setExperimentContent(data);
        setIsDataReady(true);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  function getIncludedData(includedParticipants: Set<string>) {
    setIncludedData(includedParticipants);
  }
  async function updateExperimentStatus(id: string, status: string) {
    fetch(`${process.env.URL_HOST}/researchers/changeExperimentStatus`, {
      body: JSON.stringify({ id, status }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      method: 'PUT',
    })
      .then((res) => res.json())
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
    Router.reload();
  }

  async function downloadExperiment(id: string, experiment: Experiment) {
    const blobConfig = new Blob([JSON.stringify(experiment)], { type: 'text/json;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blobConfig);
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.target = '_blank';
    anchor.download = `${id}.json`;
    anchor.click();
    includedData;
    URL.revokeObjectURL(blobUrl);
  }

  async function deleteExperiment(id: string) {
    fetch(`${process.env.URL_HOST}/researchers/deleteExperiment`, {
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      method: 'DELETE',
    })
      .then((res) => {
        setIsDeleted(true);
        return res.json();
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }

  function confirmDeleteExperiment(id: string, name: string) {
    const resp = window.prompt(
      `Please enter the name of your experiment ${name} to confirm the deletion and press "Ok":`
    );
    if (resp === name) {
      deleteExperiment(id);
      setInterval(() => Router.push('/experiments'), 3000);
    }
  }

  return (
    <>
      <Header activeLink="/login" loggedIn />
      {isDeleted && (
        <Container
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Notification icon={checkIcon} color="teal" title="Deletion completed!" mt="md">
            The experiment has been deleted, redirection to home page
          </Notification>
        </Container>
      )}
      {!isDeleted && isDataReady && (
        <>
          <Container
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <h1>{experimentContent.name}</h1>
            <Space />
            <Badge variant="outline" color={getStatusColor(experimentContent.status.toUpperCase())}>
              {experimentContent.status}
            </Badge>
          </Container>

          <StatsGridIcons daughters={experimentContent.daughters} />
          <TableParticipants daughters={experimentContent.daughters} callback={getIncludedData} />
          <Container
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <StatusModal id={idExperiment} getDataEvent={updateExperimentStatus} />
            <Button
              variant="outline"
              onClick={() => confirmDeleteExperiment(idExperiment, experimentContent.name)}
              style={{ color: 'red', borderColor: 'red' }}
            >
              Delete Experiment
            </Button>
            <Button
              variant="outline"
              onClick={() => downloadExperiment(idExperiment, experimentContent)}
            >
              Download data
            </Button>
          </Container>
        </>
      )}

      {isLoading && <Loader color="blue" size="xl" />}
      {isError && (
        <Container size={420}>
          <Blockquote color="red" radius="lg" iconSize={30} mt="xl">
            {errorMessage}
          </Blockquote>
        </Container>
      )}
    </>
  );
}
