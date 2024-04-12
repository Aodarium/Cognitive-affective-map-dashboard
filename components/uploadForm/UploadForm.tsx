import { useCookies } from "react-cookie";
import { TextInput, Button, JsonInput, Modal } from "@mantine/core";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const UploadForm = () => {
    const [cookies] = useCookies(["auth"]);
    const [cam, setCam] = useState([]);
    const [nameExp, setNameExp] = useState("");
    const [link, setLink] = useState("");
    const [opened, setOpened] = useState(false);

    const registerExp = async (event) => {
        event.preventDefault();
        const body = {
            name: nameExp,
            cam: cam,
            link: link,
        };
        setOpened(false);

        const res = await fetch(
            publicRuntimeConfig.DEV_URL + "/researchers/addExperiment",
            {
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            }
        );
        const result = await res.json();
        console.log(result);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 50,
                }}
            >
                <Button
                    id="addExpButton"
                    leftIcon={<BsPlusCircle />}
                    variant="outline"
                    onClick={() => setOpened(true)}
                    styles={(theme) => ({
                        leftIcon: {
                            marginRight: 15,
                        },
                    })}
                >
                    Add experiment
                </Button>
            </div>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                hideCloseButton
            >
                <form onSubmit={registerExp}>
                    <TextInput
                        required
                        label="Name"
                        id="nameExp"
                        value={nameExp}
                        placeholder="Name of the experiment"
                        onChange={(event) =>
                            setNameExp(event.currentTarget.value)
                        }
                    />

                    <JsonInput
                        required
                        placeholder="Paste your cam model here"
                        label="Paste your cam model here:"
                        validationError="Invalid json"
                        radius="md"
                        id="jsonCAM"
                        //required
                        formatOnBlur
                        autosize
                        minRows={10}
                        onChange={(value: any) => setCam(value)}
                    />

                    <TextInput
                        required
                        label="Redirect link"
                        // adapt the name-content
                        id="nameExp"
                        value={link}
                        placeholder="Link to redirect participants at the end"
                        onChange={(event) => setLink(event.currentTarget.value)}
                    />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: 10,
                        }}
                    >
                        <Button id="submit" type="submit">
                            Add experiment
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default UploadForm;
