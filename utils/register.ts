import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const registerUser = async (event) => {
    const body = {
        email: event.email,
        password: event.password,
    };

    const res = await fetch(
        publicRuntimeConfig.DEV_URL + "/researchers/login",
        {
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }
    );

    const result = await res.json();
};

// //write end to end tests for the functino above
// test('should return true if the user is logged in', () => {
//     const result = registerUser({email: '
//     ', password: 'password'});
//     expect(result).toBe(true);
// }
