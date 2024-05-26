import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export function BadgeCard({ text, authors, badges, link }: any) {
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
        <div>
        <Badge color="pink">{badges}</Badge>
        <Badge color="green">Environment</Badge>
        <Badge color="yellow">Life</Badge>
        </div>
        <Text fw={500}>{text}</Text>
      </Group>

      <Text size="sm" c="dimmed">
      {authors}
      </Text>

      <Button c="blue" fullWidth mt="md" radius="md">
        <a href={link}>
          See publication
        </a>
      </Button>
    </Card>
  );
}
