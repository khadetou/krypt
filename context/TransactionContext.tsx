import { createContext, useEffect, useState, FC } from 'react';
import { ethers } from 'ethers';

import { contractAbi, contractAdress } from 'utils/constance';

declare global {
    interface Window {
        ethereum: any;
    }
}

type FormData = {
    addressTo: string;
    amount: string;
    keyword: string;
    message: string;
}
interface TransactionContextState {
    currentAccount?: string;
    connectWallet: () => Promise<void>;
    formData: FormData;
    setFormData: (data: FormData) => void,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, name: string) => void;
    sendTransaction: () => Promise<void>;
}

const defaultValues: TransactionContextState = {
    currentAccount: '',
    formData: {
        addressTo: '',
        amount: '',
        keyword: '',
        message: ''
    },
    connectWallet: async () => { },
    setFormData: () => { },
    handleChange: () => { },
    sendTransaction: async () => { }
}

export const TransactionContext = createContext<TransactionContextState>(defaultValues);


let ethereum: any;

typeof window !== "undefined" ? ethereum = window.ethereum : ethereum = null;


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAdress, contractAbi, signer);
    return transactionContract;
}




export const TransactionProvider: FC = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState<string | undefined>("");
    const [isloading, setIsLoading] = useState<boolean>(false);
    const [transactionCounts, setTransactionCounts] = useState<number>(typeof window !== "undefined" ? parseInt(localStorage.getItem('transactionCount') as string) : 0);


    const [formData, setFormData] = useState<FormData>({
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setFormData({
            ...formData,
            [name]: event.target.value
        })
    }


    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert('Please Install Metamask');
            const transactionContracts = getEthereumContract();
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            // const currentTransactionCount = await transactionContracts.getTransactionCount();
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }

        } catch (error) {
            console.log({ error });
            throw new Error("No ethereum object.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please Install Metamask');
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const sendTransaction = async () => {
        try {
            if (ethereum) {
                //get the data from the form
                const { addressTo, amount, keyword, message } = formData;
                const transactionContract = getEthereumContract();
                const parseAmount = ethers.utils.parseEther(amount);
                await ethereum.request({
                    method: "eth_sendTransaction",
                    params: [{
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208", //21000 GWAI
                        value: parseAmount._hex
                    }]
                });

                const transactionHash = await transactionContract.addToBlockchain(addressTo, parseAmount, message, keyword);
                console.log(transactionHash);
                setIsLoading(true);
                console.log(`Loading transaction -${transactionHash.hash}`);
                await transactionHash.wait();
                setIsLoading(false);
                console.log(`Success -${transactionHash.hash}`);

                const transactionCount = await transactionContract.getTransactionCount();

                setTransactionCounts(transactionCount.toNumber());
            } else {
                throw new Error("No ethereum object.");
            }
        } catch (error) {
            console.log({ error });
            throw new Error("No ethereum object.");
        }
    }

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }} >
            {children}
        </TransactionContext.Provider>
    )
}