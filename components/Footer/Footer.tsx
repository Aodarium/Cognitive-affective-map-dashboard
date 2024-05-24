import { Container, Group, Anchor, Divider } from '@mantine/core';
import { BsClipboardData } from 'react-icons/bs';
import classes from './Footer.module.css';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Impressum' },
  { link: '#', label: 'Blog' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div>
      <Divider mt={100}/>
      <Container className={classes.inner}>
        <BsClipboardData size={28} />
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
