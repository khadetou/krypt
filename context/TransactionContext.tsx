import { createContext, useEffect, useState, FC } from 'react';
import { ethers } from 'ethers';

import { contractAbi, contractAdress } from 'utils/constance';

declare global {
    interface Window {
        ethereum: any;
    }
}

interface TransactionContextState {
    currentAccount?: string;
    connectWallet: () => Promise<void>
}

const defaultValues: TransactionContextState = {
    currentAccount: '',
    connectWallet: async () => { }
}

export const TransactionContext = createContext<TransactionContextState>(defaultValues);


let ethereum: any;

typeof window !== "undefined" ? ethereum = window.ethereum : ethereum = null;


const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAdress, contractAbi, signer);
    console.log(
        {
            provider,
            signer,
            transactionContract
        }
    );
}



export const TransactionProvider: FC = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState<string | undefined>("");

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert('Please Install Metamask');
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No account found");
            }

        } catch (error) {
            console.log(error);
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
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount }} >
            {children}
        </TransactionContext.Provider>
    )
}