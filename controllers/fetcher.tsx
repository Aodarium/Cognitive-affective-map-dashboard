// Date: 07/27/21
/**
 * This function fetches the data from the server
 * @param link link for the request
 * @param jwt JWT of the user
 */
export default async function fetcher({ link, method }) {
    const response = await fetch(link, {
        method: method,
        credentials: "include",
    });
    const data = await response.json();
    console.log(data);

    return { status: response.status, data };

    //let info = {
    //    method: 'POST',
    //    body: JSON.stringify({
    //        jwt: jwt
    //    }),
    //    headers: {
    //        'Accept': 'application/json',
    //        'Content-Type': 'application/json',
    //    }
    //}
    //const response = await fetch(link, info)
    //const data = await response.json();
    //return { status: response.status, data };
}
