import type { NextPage } from 'next';
import { Loader, Text, TextInput, Button, PasswordInput, Space } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useState } from 'react';
import { registerUser } from '../../utils/register';


const RegisterPage: NextPage = () => {
    const router = useRouter();
	const [cookie, setCookie] = useCookies(["auth"]);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm({
		initialValues: {
			email: '',
			password: '',
			stayLogged: false,
		},

		validationRules: {
			email: (value) => /^\S+@\S+$/.test(value),
			password: (password) => password.trim().length >= 2,
		},
	});

	return (
		<>
			<div style={{ width: 400, margin: "50px auto", backgroundColor: "#ebedef", borderRadius: 10, padding: 10, }}>
				<form onSubmit={form.onSubmit((values) => registerUser(values))}>
					<TextInput
						required
						id="emailInput"
						label="Email"
						placeholder="your@email.com"
						{...form.getInputProps('email')}
					/>

					<PasswordInput
						required
						id="pwdInput"
						label="Password"
						placeholder="password"
						{...form.getInputProps('password')}
					/>

					<Space h="xl" />
					<div style={{ display: "flex", justifyContent: "right" }}>
						{isError && <Text color="red">
							Login/password are not matching
						</Text>}
						{isLoading &&
							<Loader />
						}
						<Button id="submit" type="submit">Log in</Button>
					</div>

				</form>
			</div>
		</>
	) 
}


export default RegisterPage;