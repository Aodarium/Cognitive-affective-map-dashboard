import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export function BadgeCard() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: 300, margin: 10 }}>
      <Card.Section>
        <Image
          src="./experiment1.svg"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group mt="md" mb="xs">
        <Text fw={500}>A covid study about Life and Death</Text>
        <div>
        <Badge color="pink">Covid</Badge>
        <Badge color="green">Environment</Badge>
        <Badge color="yellow">Life</Badge>
        </div>
      </Group>

      <Text size="sm" c="dimmed">
      By T. John, A. Tales and R. Henries
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        See publication
      </Button>
    </Card>
  );
}
