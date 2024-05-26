import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { AuthenticationTitle } from '@/components/LoginWindow/Authentication';
import { Header } from '@/components/Header/Header';

export default function HomePage() {
  async function submitForm(data: any) {
    const body = { email: data.email, password: data.password };
    const url = 'http://localhost:3001' + '/researchers/login';
    setIsLoading(true);

    fetch(url, {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setCookies('CAM-API-KEY', data.token);
        router.push('/experiments');
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }

  const [cookies, setCookies] = useCookies(['CAM-API-KEY']);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  return (
    <>
      <Header activeLink="/login" loggedIn="false" />
      <AuthenticationTitle submitFormEvent={submitForm} isLoading={isLoading} isError={isError} />
    </>
  );
}
