import { CookiesProvider } from "react-cookie";
import FooterCentered from "../components/footer/Footer";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import HeaderSimple from "../components/header/Header";

function MyApp({ Component, pageProps }: AppProps) {
    const data_footer = [{ link: "/impressum", label: "Impressum (Notice)" }];

    return (
        <CookiesProvider>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    background: "#D6D58E",
                }}
            >
                <div style={{ width: "100%" }}>
                    <Component {...pageProps} />
                </div>
            </div>
            <FooterCentered links={data_footer} />
        </CookiesProvider>
    );
}

export default MyApp;
