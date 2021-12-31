import { NextPage } from "next";
import Head from "next/head";

interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string;
}
const Meta: NextPage<MetaProps> = ({ title, description, keywords }) => {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <meta name="keywords" content={keywords} />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content={description} />
            <title>{title}</title>
        </Head>
    )
}

Meta.defaultProps = {
    title: "Krypto - Crypto Currency",
    description: "Crypto Currency",
    keywords: "Get the latest crypto currency prices"
}

export default Meta;
