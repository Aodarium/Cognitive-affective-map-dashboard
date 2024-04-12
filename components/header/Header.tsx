import { useState } from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Text,
} from "@mantine/core";
import { useCookies } from "react-cookie";
import getNavbar from "../../controllers/headerFetcher";

function useDisclosure(
    initialState: boolean,
    callbacks?: { onOpen?(): void; onClose?(): void }
) {
    const [opened, setOpened] = useState(initialState);

    const open = () => {
        if (!opened) {
            setOpened(true);
            callbacks?.onOpen?.();
        }
    };

    const close = () => {
        if (opened) {
            setOpened(false);
            callbacks?.onClose?.();
        }
    };

    const toggle = () => {
        opened ? close() : open();
    };

    return [opened, { open, close, toggle }] as const;
}

interface HeaderSimpleProps {
    links: { link: string; label: string }[];
}

export default function HeaderSimple() {
    const [opened, { toggle }] = useDisclosure(false);

    const [cookie, setCookie] = useCookies(["auth"]);
    const links = getNavbar(cookie?.auth ? true : false);

    const items = links.map((link) => (
        <a key={link.label} href={link.link} target={link.target}>
            {link.label}
        </a>
    ));

    return (
        <div>
            <Group spacing={5}>{items}</Group>
        </div>
    );
}
