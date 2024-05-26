import { Welcome } from '../components/Welcome/Welcome';
import { Header } from '../components/HeaderTab/Header';

export default function HomePage() {
  return (
    <>
      <Header activeLink="/" loggedIn="false" />
      <Welcome />
    </>
  );
}
