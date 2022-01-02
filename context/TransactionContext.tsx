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
    isloading: boolean;
    transactions: any[];
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
    isloading: false,
    transactions: [],
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
    const [transactions, setTransactions] = useState<any[]>([]);

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

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionContract = getEthereumContract();
                const availableTransactions = await transactionContract.getAllTransactions();
                const structuredTransactions = availableTransactions.map((transaction: any) => ({
                    addressTo: transaction.receiver,
                    addressFrom: transaction.sender,
                    timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                    message: transaction.message,
                    keyword: transaction.keyword,
                    amount: parseInt(transaction.amount._hex) / (10 ** 18)
                }));
                // console.log(structuredTransactions);
                setTransactions(structuredTransactions);
            } else {
                console.log('Ethereum is not present');
            }

        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert('Please Install Metamask');
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllTransactions();
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
        checkIfTransactionsExist();
    }, []);

    const checkIfTransactionsExist = async () => {
        try {
            if (currentAccount) {
                const transactionContract = getEthereumContract();
                const currentTransactionCount = await transactionContract.getTransactionCount();
                console.log(currentTransactionCount);
                typeof window !== "undefined" ? localStorage.setItem('transactionCount', currentTransactionCount) : null;
            }
        } catch (error) {
            console.log({ error });
            throw new Error("No ethereum object.");
        }
    }

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
                location.reload();
            } else {
                throw new Error("No ethereum object.");
            }
        } catch (error) {
            console.log({ error });
            throw new Error("No ethereum object.");
        }
    }

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, isloading, transactions }} >
            {children}
        </TransactionContext.Provider>
    )
}