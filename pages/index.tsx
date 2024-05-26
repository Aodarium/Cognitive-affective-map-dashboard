import { Welcome } from '../components/Welcome/Welcome';
import { Header } from '../components/HeaderTab/Header';
import { useRouter } from 'next/router';

export default function HomePage() {
  return (
    <>
      <Header activeLink="/" loggedIn="false" />
      <Welcome />
    </>
  );
}
