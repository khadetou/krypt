import { qualities } from "./qualities";
import { SiEthereum } from 'react-icons/si'
import { BsInfoCircle } from 'react-icons/bs'
import { Loader } from ".";
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";



interface InputProps {
    placeholder: string,
    name: string,
    type: string,
    value?: string,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void,
}


const Input: React.FC<InputProps> = ({ placeholder, type, name, value, handleChange }) => {

    return (
        <input
            placeholder={placeholder}
            name={name}
            type={type}
            value={value}
            onChange={(e) => handleChange(e, name)}
            step="0.0001"
            className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
        />
    );
}


const Welcome = () => {
    const { connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction } = useContext(TransactionContext);
    const { addressTo, amount, keyword, message } = formData;
    //HTMLFormElement, HTMLButtonElement
    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {

        e.preventDefault();
        if (!addressTo || !amount || !keyword || !message) return;
        sendTransaction();
    }
    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-3xl sm:text-5xl text-gradient py-1">
                        Send Crypto <br /> across The world
                    </h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell krypto currencies easily on Krypto.
                    </p>
                    {!currentAccount && (<button
                        type="button"
                        onClick={connectWallet}
                        className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full hover:bg-[#2546bd] text-white font-bold text-lg cursor-pointer"
                    >
                        <p className="text-white text-base font-semibold ">Connect Wallet</p>
                    </button>)
                    }


                    <div
                        className="grid sm:grid-cols-3 grid-col-2 w-full mt-10"
                    >
                        {qualities.map((item, idx) => (
                            <div key={idx} className={item.style}>
                                {item.title}
                            </div>
                        ))}
                    </div>
                </div>


                <div className="flex flex-1 flex-col items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between item-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className="text-white text-sm font-light">
                                    Address
                                </p>
                                <p className="text-white font-semibold text-lg mt-1">
                                    Ethereum
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />

                        {
                            false ?
                                (<Loader />)
                                :
                                (
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4fc7] rounded-full cursor-pointer "
                                    >
                                        Send Now
                                    </button>
                                )

                        }
                    </div>

                </div>

            </div>


        </div>
    )
}



export default Welcome


