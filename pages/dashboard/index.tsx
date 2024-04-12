import type { NextPage } from "next";
import Experiments from "../../components/experiments/Experiments";
import { useCookies } from "react-cookie";
import fetcher from "../../controllers/fetcher";
import useSWR from "swr";
import { Alert, Loader } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Manage: NextPage = () => {
    const [cookies] = useCookies(["auth"]);
    const jwt = cookies?.auth || "";
    const linkApi = "http://localhost:3001";
    const link = linkApi + "/researchers/getExperimentByAuthor";
    const { data, isLoading, error } = useSWR({ link, method: "GET" }, fetcher, { revalidateOnFocus: false, revalidateOnReconnect: false });

    if (error) {
        return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Something went wrong!"
                    color="red"
                >
                    The connection to the API failed. Please check your internet
                    connection or the status of the server.
                </Alert>
            </div>
        );
    }

    if (data?.status == 401) {
        return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Alert
                    icon={<IconAlertCircle size={16} />}
                    title="Loging error!"
                    color="red"
                >
                    It looks like you are not authentificated, please log in
                    again.
                </Alert>
            </div>
        );
    }

    if (!data) {
        return (
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Loader />
            </div>
        );
    }

    return <Experiments data={data.data} />;
};

export default Manage;
