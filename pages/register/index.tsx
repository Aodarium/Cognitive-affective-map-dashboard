import type { NextPage } from "next";
import {
    Loader,
    Text,
    TextInput,
    Button,
    PasswordInput,
    Space,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { registerUser } from "../../utils/register";
import HeaderSimple from "../../components/header/Header";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const RegisterPage: NextPage = () => {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cookies, setCookies] = useCookies(["CAM-API-KEY"]);
    const router = useRouter();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
            password: (password) => password.trim().length >= 2,
        },
    });

    const loging = async ({ email, password }) => {
        setIsLoading(true);
        const body = { email: email, password: password };
        const url = "http://localhost:3001" + "/researchers/login";
        const res = await fetch(url, {
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
            method: "POST",
        });
        const result = await res.json();
        setIsLoading(false);

        switch (res.status) {
            case 403:
                setIsError(true);
                break;
            case 200:
                const jwt = result["token"];
                setIsError(false);
                setCookies("CAM-API-KEY", jwt);
                router.push("/dashboard");
                break;
        }
    };

    return (
        <div>
            <HeaderSimple></HeaderSimple>
            <div
                style={{
                    width: 450,
                    margin: "50px auto",
                    padding: 10,
                    background: "#DBF227",
                    borderRadius: 4,
                    border: "#9FC131 2px solid",
                }}
            >
                <form onSubmit={form.onSubmit((values) => loging(values))}>
                    <TextInput
                        id="emailInput"
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps("email")}
                    />

                    <PasswordInput
                        required
                        id="pwdInput"
                        label="Password"
                        placeholder="password"
                        {...form.getInputProps("password")}
                    />

                    <Space h="xl" />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "center",
                        }}
                    >
                        {isError && (
                            <Text
                                color="red"
                                style={{
                                    padding: "10px",
                                }}
                            >
                                Login/password are not matching
                            </Text>
                        )}

                        {isLoading && (
                            <Loader
                                style={{
                                    marginRight: "10px",
                                    margin: "10px",
                                }}
                            />
                        )}
                        <button
                            id="submit"
                            type="submit"
                            style={{
                                border: "#005C53 2px solid",
                                padding: "10px",
                                paddingRight: "20px",
                                paddingLeft: "20px",
                            }}
                        >
                            Log in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
