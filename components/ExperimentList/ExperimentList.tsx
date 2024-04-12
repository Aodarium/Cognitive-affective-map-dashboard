import { Table, Progress, Anchor, Text, Group, Container, Badge, Button } from '@mantine/core';
import { BsClipboardData, BsDoorOpen } from 'react-icons/bs';

import classes from './ExperimentList.module.css';
import Link from 'next/link';

export function TableReviews({ data }: any) {
  const rows = data.experiments.map((row: any) => {
    const totalReviews = 10;
    const progression = (row.numberCams / totalReviews) * 100;
    const mapColor = {
      active: 'lime',
      archived: 'violet',
      completed: 'yellow',
      inactive: 'red',
    };
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
            <Badge variant="outline" color={mapColor[row.status]}>
              {row.status}
            </Badge>
          </Anchor>
        </Table.Td>
        <Table.Td>{Intl.NumberFormat().format(totalReviews)}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              {progression.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={progression}
              color="teal"
            />
          </Progress.Root>
        </Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="teal" fw={700}>
              <Link href={'/experiment?id=' + row._id} passHref>
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
      <Table.ScrollContainer minWidth={200}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Experiment name</Table.Th>
              <Table.Th>Creation date</Table.Th>
              <Table.Th>Author</Table.Th>
              <Table.Th>Collected CAMs</Table.Th>
              <Table.Th>Progress</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Container>
  );
}