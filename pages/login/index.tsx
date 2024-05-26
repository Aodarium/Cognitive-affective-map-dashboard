import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { AuthenticationTitle } from '@/components/LoginWindow/Authentication';
import { Header } from '@/components/HeaderTab/Header';

export default function HomePage() {
  async function submitForm(data: any) {
    const body = { email: data.email, password: data.password };
    const url = `${process.env.URL_HOST}/researchers/login`;
    setIsLoading(true);

    fetch(url, {
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })
      .then((res) => res.json())
      .then((responseData) => {
        setIsLoading(false);
        setCookies('CAM-API-KEY', responseData.token);
        router.push('/experiments');
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
