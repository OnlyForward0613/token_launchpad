'use client';
import { useState, useRef } from 'react';
import ConnectButton from "@/components/ConnectButton";
import Header from "@/components/Header";
// import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { toMetaplexFileFromBrowser } from '@metaplex-foundation/js';
import { createSPLToken } from '@/contexts/createSPLToken';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export default function Home() {

    const wallet = useWallet()
    const { connection } = useConnection()

    const [tokenName, setTokenName] = useState("")
    const [tokenSymbol, setTokenSymbol] = useState("")
    const [tokenLogo, setTokenLogo] = useState<File | null>()
    const [tokenDecimal, setTokenDecimal] = useState(9)
    const [tokenBalance, setTokenBalance] = useState(0)

    // const [isShowOrigin, setIsShowOrigin] = useState(false);
    // const wallet = useWallet();
    // const [loading, setLoading] = useState(false);
    // const handleNftStake = async () => {
    //   if (!mint) return;
    //   try {
    //     const tx = await stakeNFT(wallet, mint, setLoading);
    //     if (!tx || !wallet.publicKey) return;
    //     await stake(tx, wallet.publicKey?.toBase58(), setLoading, getNfts);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    const handleCreateToken = async () => {
        if (
            tokenName != "" &&
            tokenSymbol != "" &&
            tokenLogo != null &&
            tokenBalance != 0
        ) {
            if (!wallet.publicKey) return;
            const _file = await toMetaplexFileFromBrowser(tokenLogo);
            await createSPLToken(wallet.publicKey, wallet, connection, tokenBalance, tokenDecimal, true, tokenName, tokenSymbol, "", "", _file, "string")
        } else {
            alert("Invalid params")
        }
    }

    const handleNameChange = (value: string) => {
        setTokenName(value)
    }
    const handleSymbolChange = (value: string) => {
        setTokenSymbol(value)
    }
    const handleLogoFileChange = (files: FileList | null) => {
        if (files) {
            setTokenLogo(files[0])
        } else {
            setTokenLogo(null)
        }
    }
    const handleDecimalChange = (value: string) => {
        setTokenDecimal(parseInt(value))
    }
    const handleBalanceChange = (value: string) => {
        setTokenBalance(parseInt(value))
    }

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleBig = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    return (
        <div className="w-full h-full min-h-screen flex items-start pt-6 sm:pt-0 sm:items-center justify-center bg-secondary-200  sm:bg-secondary-300">
            <div className="flex flex-col max-w-[480px] w-full bg-secondary-200 rounded-xl p-6 gap-6">
                <div className='flex items-center justify-between'>
                    <div className='text-white text-2xl font-semibold'>
                        Create Token
                    </div>
                    <Image
                        src='/icons/x.svg'
                        alt='cross'
                        width={24}
                        height={24}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className="text-sm text-secondary-400">Name</p>
                    <input
                        className="w-full rounded-xl text-sm bg-secondary-500 py-3 px-4 placeholder:text-secondary-700 text-white focus:ring-0 focus:border-0 focus:outline-none"
                        placeholder="Token Name"
                        onChange={(e) => handleNameChange(e.target.value)}
                        value={tokenName}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className="text-sm text-secondary-400">Symbol</p>
                    <input
                        className="w-full rounded-xl text-sm bg-secondary-500 py-3 px-4 placeholder:text-secondary-700 text-white focus:ring-0 focus:border-0 focus:outline-none"
                        placeholder="Token Symbol"
                        onChange={(e) => handleSymbolChange(e.target.value)}
                        value={tokenSymbol}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <p className="text-sm text-secondary-400">Token Logo</p>
                    <div className='w-full bg-secondary-500 flex flex-col items-center px-4 py-3 gap-3'>
                        <div className='flex flex-col items-center'>
                            <div className='text-white text-sm font-normal'>
                                Token Symbol
                            </div>
                            <div className='text-secondary-700 text-xs font-normal'>
                                Token Name
                            </div>
                        </div>
                        <button className='bg-secondary-800 rounded-xl text-white px-4 py-2 text-sm font-semibold'  onClick={handleBig}>
                            Upload File
                            <input
                                type="file"
                                className='opacity-0 min-h-full min-w-full'
                                accept='image/png, image/jpeg'
                                ref={fileInputRef} style={{ display: 'none' }}
                                onChange={(e) => handleLogoFileChange(e.target.files)}
                            />
                        </button>
                    </div>
                </div>
                <div className='w-full flex items-center justify-between gap-4'>
                    <div className='w-full flex flex-col gap-1'>
                        <p className="text-sm text-secondary-400">Amount</p>
                        <input
                            type="number"
                            className="w-full rounded-xl text-sm bg-secondary-500 py-3 px-4 placeholder:text-secondary-700 text-white focus:ring-0 focus:border-0 focus:outline-none"
                            onChange={(e) => handleDecimalChange(e.target.value)}
                            value={tokenDecimal}
                        />
                    </div>
                    <div className='w-full flex flex-col gap-1'>
                        <p className="text-sm text-secondary-400">
                            Token to Mint
                        </p>
                        <input
                            type="number"
                            className="w-full rounded-xl text-sm bg-secondary-500 py-3 px-4 placeholder:text-secondary-700 text-white focus:ring-0 focus:border-0 focus:outline-none"
                            onChange={(e) => handleBalanceChange(e.target.value)}
                            value={tokenBalance}
                        />
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='text-secondary-400 text-sm font-normal'>
                        Create Token Fee
                    </div>
                    <div className='text-white font-semibold text-sm'>
                        0.62 Sol
                    </div>
                </div>
                <button
                    className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                    onClick={handleCreateToken}

                >
                    Create
                </button>
            </div>
        </div>
    );
}
