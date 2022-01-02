import { TransactionContext } from "@/context/TransactionContext";
import useFetch from "hooks/useFetch";
import { FC, useContext } from "react";
import Image from "next/image";
import dummyData from "utils/data";
import { shortenAddress } from "utils/shortendAddress";

interface TransactionCardProps {
    addressTo: string;
    addressFrom: string;
    timestamp: string;
    message: string;
    keyword?: string;
    amount: string;
    url: string;
}
const TransactionCard: FC<TransactionCardProps> = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {

    const gifUrl = useFetch({ keyword });
    console.log(gifUrl);


    return (
        <div className="bg-[#181918] m-4 flex-1 flex
    2xl:min-w-[450px]
    2xl:max-w-[500px]
    sm:min-w-[270px]
    sm:maxn-w-[300px]
    flex-col p-3 rounded-md hover:shadow-2xl
    ">
            <div className="flex flex-col items-center w-full mt-3">
                <div className="w-full mb-6 p-2">
                    <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
                    </a>
                    <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noopener noreferrer">
                        <p className="text-white text-base">From: {shortenAddress(addressTo)}</p>
                    </a>
                    <p className="text-white text-base">
                        Amount: {amount} ETH
                    </p>
                    {message && (
                        <>
                            <br />
                            <p className="text-white text-base">Message: {message}</p>
                        </>
                    )}
                </div>

                <div className="w-full h-64 2xl:h-96 rounded-md shadow-lg relative">
                    <Image
                        src={gifUrl || url}
                        alt="gif"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl z-10">
                    <p className="text-[#37c7da] font-bold">{timestamp}</p>
                </div>
            </div>
        </div>
    );
}

const Transactions = () => {

    const { currentAccount } = useContext(TransactionContext);

    return (
        <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
            <div className="flex flex-col md:p-12 py-12 px-4">
                {currentAccount ?
                    (<h3 className="text-white text-3xl text-center my-2">
                        Latest Transactions
                    </h3>)
                    :
                    (<h3 className="text-white text-3xl text-center my-2">Connect your account to the latest transactions</h3>)
                }

                <div className="flex flex-wrap justify-center items-center mt-10">
                    {
                        dummyData.reverse().map((transaction, index) => (
                            <TransactionCard {...transaction} key={index} />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Transactions
