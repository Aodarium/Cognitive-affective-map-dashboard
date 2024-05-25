import {
  Table,
  Progress,
  Anchor,
  Text,
  Group,
  Container,
  Badge,
  Button,
  ScrollArea,
} from '@mantine/core';
import { BsClipboardData, BsDoorOpen } from 'react-icons/bs';
import Link from 'next/link';
import { useState } from 'react';
import cx from 'clsx';
import { copyToClipboard, getStatusColor } from '@/utils/generals';
import classes from './ExperimentList.module.css';

export function TableReviews({ data }: any) {
  const [scrolled, setScrolled] = useState(false);

  const linkApi = 'some-URLs'; //publicRuntimeConfig.DEV_URL;
  const rows = data.experiments.map((row: any) => {
    const totalReviews = 10;
    const progression = (row.numberCams / totalReviews) * 100;

    return (
      <Table.Tr key={row._id}>
        <Table.Td>
          <Anchor component="button" fz="sm">
            {row.name}
          </Anchor>
        </Table.Td>
        <Table.Td>{new Date(row.creationDate).toLocaleDateString()}</Table.Td>
        <Table.Td>
          <Anchor component="button" fz="sm">
            <Badge color={getStatusColor(row.status.toUpperCase())}>{row.status}</Badge>
          </Anchor>
        </Table.Td>
        <Table.Td>{Intl.NumberFormat().format(totalReviews)}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text
              fz="xs"
              c={progression < 99 ? (progression < 41 ? 'yellow' : 'cyan') : 'teal'}
              fw={700}
            >
              {progression.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={progression}
              color={progression < 99 ? (progression < 41 ? 'yellow' : 'lightblue') : 'teal'}
            />
          </Progress.Root>
        </Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              <Button
                leftSection={<BsClipboardData />}
                variant="subtle"
                onClick={() => {
                  copyToClipboard(row._id, linkApi);
                }}
                className={classes.button}
              >
                Copy link
              </Button>
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              <Link href={`/experiment?id=${row._id}`} passHref>
                <Button leftSection={<BsDoorOpen />} variant="subtle" className={classes.button}>
                  Enter experiment
                </Button>
              </Link>
            </Text>
          </Group>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Container>
      <ScrollArea h={500} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={700} verticalSpacing="xs">
          <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>Experiment name</Table.Th>
              <Table.Th>Creation date</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Collected CAMs</Table.Th>
              <Table.Th>Progress</Table.Th>
              <Table.Th>Link</Table.Th>
              <Table.Th>See data</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
    </Container>
  );
}
