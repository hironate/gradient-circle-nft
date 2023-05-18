declare var window: any;
import React, { useEffect, useState } from 'react';
import { useAccount} from 'wagmi';
import Image from 'next/image';
import { getNetwork } from '@wagmi/core';
import {blockchains} from "../utils/constants"
import { switchNetwork } from '@wagmi/core'


function ChainSelector() {
    const {isConnected } = useAccount();

    interface MyObject {
        name: string;
        logo: any;
    }

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentChain, setCurrentChain] = useState<MyObject>({name:"",logo:""});

    useEffect(()=>{
        let chainId = getNetwork().chain?.id || 1;
        setChain(chainId)
    },[isConnected]);

    const setChain = (chainId: any)=>{
        const tempBlockchain = blockchains.filter((blockchain)=>{
                return blockchain.id == chainId
            })
        setCurrentChain({
            name:tempBlockchain[0].name,
            logo:tempBlockchain[0].logo
        })
    }

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const changeChain = async(chainId: any)=>{
        try {
            const network = await switchNetwork({chainId});
            setChain(network.id)
        } catch (error) {
            console.log("chain not found");
        }
    }

    return (
        isConnected &&
            <div className="relative inline-block">
                <div
                    className="inline-flex w-40 items-center cursor-pointer btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 gap-3"
                    onClick={toggleDropdown}
                >
                        <span>{currentChain.name }</span>
                        <Image
                            src={currentChain.logo}
                            alt={`${currentChain.name} Logo`}
                            className="w-5 h-5"
                        />
                </div>

                {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-full bg-white rounded-md shadow-lg py-1">
                        {blockchains.map((blockchain)=>{
                            return <>
                                <button
                                    onClick={() => {changeChain(blockchain.id)}}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex gap-3"
                                >
                                    <Image
                                    src={blockchain.logo}
                                    alt={`${blockchain.name} Logo`}
                                    className="w-6 h-6 text-center"
                                    />
                                    {blockchain.name}
                                </button>
                            </>
                        })}
                    </div>
                )}
            </div>
    );
}

export default ChainSelector;
