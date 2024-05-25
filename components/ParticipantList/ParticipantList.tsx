/* eslint-disable arrow-body-style */
import { Table, Text, Group, Container, Button, Modal, Checkbox } from '@mantine/core';
import { BsDoorOpen } from 'react-icons/bs';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import classes from './ParticipantList.module.css';
import { NetworkDiagram } from '../Network/NetworkDiagram';

export function TableParticipants({ daughters, callback }: any) {
  function getData(includedData: Set<string>) {
    callback(includedData);
  }
  const [opened, { open, close }] = useDisclosure(false);
  const [currentData, setCurrentData] = useState({});
  const [includedData, setIncludedData] = useState(new Set<string>());

  const rows = daughters.map((row: any) => {
    return (
      <Table.Tr key={row.participantID}>
        <Table.Td>{row.participantID}</Table.Td>
        <Table.Td>{new Date(row.creationDate).toLocaleDateString()}</Table.Td>
        <Group justify="space-between">
          <Text fz="xs" c="teal" fw={700}>
            <Button
              onClick={() => {
                setCurrentData(row.cam);
                open();
              }}
              leftSection={<BsDoorOpen />}
              variant="subtle"
              className={classes.button}
            >
              See network
            </Button>
          </Text>
        </Group>
        <Table.Td>
          <Checkbox
            name="includeData"
            id={row.participantID}
            label="include"
            color="lime"
            onChange={(event) => {
              const copySet = includedData;
              if (event.currentTarget.checked) {
                copySet.add(row.participantID);
              } else {
                copySet.delete(row.participantID);
              }
              setIncludedData(copySet);
              getData(includedData);
            }}
          />
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Map drawn - rendered with a force applied"
        centered
        size="auto"
      >
        <NetworkDiagram rawData={currentData} width={600} height={600} />
      </Modal>
      <Container>
        <Table.ScrollContainer minWidth={200}>
          <Table verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Participant id</Table.Th>
                <Table.Th>Submission date</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Container>
    </>
  );
}
