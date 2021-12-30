import { NextPage } from "next";

interface MetaProps {
    title?: string;
    description?: string;
    keywords?: string;
}
const Meta: NextPage<MetaProps> = ({ title, description, keywords }) => {
    return (
        <div>

        </div>
    )
}

Meta.defaultProps = {
    title: "Krypto - Crypto Currency",
    description: "Crypto Currency",
    keywords: "Get the latest crypto currency prices"
}

export default Meta;
