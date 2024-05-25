import { Group, Paper, Text, ThemeIcon, SimpleGrid, Container } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import classes from './StatExperiment.module.css';
import { Daughter } from '@/utils/types';

export function StatsGridIcons({ daughters }: any) {
  const arrayValuesNodes: number[] = [];
  const arrayDatesCAMs: string[] = [];

  daughters.forEach((daughter: Daughter) => {
    const currentCam = daughter.cam;
    arrayDatesCAMs.push(currentCam.date);
    currentCam.nodes.forEach((element) => {
      if (element.value === 10) {
        arrayValuesNodes.push(0);
      } else {
        arrayValuesNodes.push(element.value);
      }
    });
  });
  const dataStat = [
    {
      title: 'Participants',
      value: daughters.length,
      diff: 34,
      text: 'participants joined the experiment',
    },
    {
      title: 'Profit',
      value: arrayValuesNodes.reduce((a, b) => a + b, 0),
      diff: 13,
      text: 'concepts have been drawn',
    },
    {
      title: 'Mean valence',
      value: 100 / arrayValuesNodes.length || 0,
      diff: -8,
      text: 'mean valence over all cams drawn',
    },
  ];

  const stats = dataStat.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="apart">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
            }}
            size={38}
            radius="md"
          >
            <DiffIcon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text c="dimmed" fz="sm" mt="md">
          <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
            {stat.diff}%
          </Text>{' '}
          {stat.text}
        </Text>
      </Paper>
    );
  });

  return (
    <Container>
      <div className={classes.root}>
        <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
      </div>
    </Container>
  );
}
