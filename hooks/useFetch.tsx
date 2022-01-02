import { FC, useEffect, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GIPHY_API;

interface UseFetchProps {
    keyword: string;
}
const UseFetch = ({ keyword }: UseFetchProps) => {
    const [gifUrl, setGifUrl] = useState('');



    const fetchGif = async () => {
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const { data } = await response.json();
            setGifUrl(data[0]?.images?.downsized_medium?.url);

        } catch (error) {
            setGifUrl("https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C28");
        }
    }

    useEffect(() => {
        if (keyword) {
            fetchGif();
        }
    }, [keyword]);

    return gifUrl;
}



export default UseFetch;