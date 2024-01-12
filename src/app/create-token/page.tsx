'use client';
import { useState, useRef } from 'react';
import ConnectButton from "@/components/ConnectButton";
import Header from "@/components/Header";
// import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { toMetaplexFileFromBrowser } from '@metaplex-foundation/js';
import { createSPLToken } from '@/contexts/createSPLToken';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import LandingHeader from '@/components/LandingHeader/LandingHeader';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {

    const wallet = useWallet()
    const { connection } = useConnection()
    const router = useRouter();
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
    const [step, setStep] = useState(1);
    const sendLanding = () => {
        router.push('/');
    }
    const handleCreateToken = async () => {
        // if (
        //     tokenName != "" &&
        //     tokenSymbol != "" &&
        //     tokenLogo != null &&
        //     tokenBalance != 0
        // ) {
        //     if (!wallet.publicKey) return;
        //     const _file = await toMetaplexFileFromBrowser(tokenLogo);
        //     await createSPLToken(wallet.publicKey, wallet, connection, tokenBalance, tokenDecimal, true, tokenName, tokenSymbol, "", "", _file, "string")
        // } else {
        //     alert("Invalid params")
        // }
        setStep(2);
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
            <LandingHeader />
            {
                step == 1 && (
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
                                className='cursor-pointer'
                                onClick={() => sendLanding()}
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
                                <button className='bg-secondary-800 rounded-xl text-white px-4 py-2 text-sm font-semibold' onClick={handleBig}>
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
                )
            }
            {
                step == 2 && (
                    <div className="flex flex-col max-w-[480px] w-full bg-secondary-200 rounded-xl p-6 gap-8">
                        <div className='flex items-center justify-center'>
                            <div className='text-white text-2xl font-semibold'>
                                Revoke Mint Authority
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                            <p className="text-sm text-secondary-400">Token Mint Address</p>
                            <div className='p-2 w-full gap-2 flex items-center text-white rounded-xl bg-secondary-300'>
                                <Image
                                    src="/icons/avatar-image.png"
                                    alt="avatar image"
                                    width={32}
                                    height={32}
                                    className='object-cover object-center w-8 h-8'
                                />
                                <p className='truncate w-[90%] text-sm'>
                                    0x8ad129ykba801298t1wopskgdfiyaasdas7gdas532vgd8b6123
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <button
                                className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                                onClick={() => setStep(3)}
                            >
                                Revoke it
                            </button>
                            <button
                                className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-800"
                                onClick={() => setStep(1)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }
            {
                step == 3 && (
                    <div className="flex flex-col max-w-[480px] w-full bg-secondary-200 rounded-xl p-6 gap-8">
                        <div className='flex items-center justify-center'>
                            <div className='text-white text-2xl font-semibold'>
                                Revoke Freezing Authority
                            </div>
                        </div>
                        <div className='flex flex-col items-center gap-1'>
                            <p className="text-sm text-secondary-400">Token Mint Address</p>
                            <div className='p-2 w-full gap-2 flex items-center text-white rounded-xl bg-secondary-300'>
                                <Image
                                    src="/icons/avatar-image.png"
                                    alt="avatar image"
                                    width={32}
                                    height={32}
                                    className='object-cover object-center w-8 h-8'
                                />
                                <p className='truncate w-[90%] text-sm'>
                                    0x8ad129ykba801298t1wopskgdfiyaasdas7gdas532vgd8b6123
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <button
                                className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                                onClick={() => setStep(4)}
                            >
                                Confirm
                            </button>
                            <button
                                className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-800"
                                onClick={() => setStep(2)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }
            {
                step == 4 && (
                    <div className="flex flex-col max-w-[480px] w-full bg-secondary-200 rounded-xl p-6 gap-6">
                        <div className='flex items-center justify-between'>
                            <div className='text-white text-2xl font-semibold'>
                                Add LP
                            </div>
                            <Image
                                src='/icons/x.svg'
                                alt='cross'
                                width={24}
                                height={24}
                                className='cursor-pointer'
                                onClick={() => sendLanding()}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className="text-sm text-secondary-400">Wallet Address</p>
                            <div className='p-2 w-full gap-2 flex items-center text-white rounded-xl bg-secondary-300'>
                                <Image
                                    src="/icons/avatar-image.png"
                                    alt="avatar image"
                                    width={32}
                                    height={32}
                                    className='object-cover object-center w-8 h-8'
                                />
                                <p className='truncate w-[90%] text-sm'>
                                    0x8ad129ykba801298t1wopskgdfiyaasdas7gdas532vgd8b6123
                                </p>
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-1'>
                            <p className="text-sm text-secondary-400">
                                Amount
                            </p>
                            <div className='w-full relative'>
                                <input
                                    type="number"
                                    className="w-full rounded-xl text-sm bg-secondary-500 py-3 px-4 placeholder:text-secondary-700 text-white focus:ring-0 focus:border-0 focus:outline-none"
                                    onChange={(e) => handleBalanceChange(e.target.value)}
                                    value={tokenBalance}
                                />
                                <p className='absolute right-4 top-[10px] text-secondary-700'>$sol</p>
                            </div>
                        </div>
                        <button
                            className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                            onClick={() => setStep(5)}
                        >
                            Add Liquidity
                        </button>
                    </div>
                )
            }
            {
                step == 5 && (
                    <div className="flex flex-col max-w-[480px] w-full bg-secondary-200 rounded-xl p-6 gap-6">
                        <div className='flex items-center justify-between'>
                            <div className='text-white text-2xl font-semibold'>
                                Create The Market
                            </div>
                            <Image
                                src='/icons/x.svg'
                                alt='cross'
                                width={24}
                                height={24}
                                className='cursor-pointer'
                                onClick={() => sendLanding()}
                            />
                        </div>
                        <div className='flex flex-col gap-1 items-center'>
                            <p className="text-sm text-secondary-400">Token Mint Address</p>
                            <div className='p-2 w-full gap-2 flex items-center text-white rounded-xl bg-secondary-300'>
                                <Image
                                    src="/icons/avatar-image.png"
                                    alt="avatar image"
                                    width={32}
                                    height={32}
                                    className='object-cover object-center w-8 h-8'
                                />
                                <p className='truncate w-[90%]'>
                                    0x8ad129ykba801298t1wopskgdfiyaasdas7gdas532vgd8b6123
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='text-secondary-400 text-sm font-normal'>
                                Create Market Fee
                            </div>
                            <div className='text-white font-semibold text-sm'>
                                2.7 Sol
                            </div>
                        </div>
                        <button
                            className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                            onClick={() => setStep(6)}
                        >
                            Create Market
                        </button>
                    </div>
                )
            }
            {
                step == 6 && (
                    <div className="flex flex-col max-w-[480px] w-full bg-secondary-200 rounded-xl p-6 gap-6">
                        <div className='flex items-center justify-between'>
                            <div className='text-white text-2xl font-semibold'>
                                Burn
                            </div>
                            <Image
                                src='/icons/x.svg'
                                alt='cross'
                                width={24}
                                height={24}
                                className='cursor-pointer'
                                onClick={() => sendLanding()}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className="text-sm text-secondary-400">Wallet Address</p>
                            <div className='p-2 w-full gap-2 flex items-center text-white rounded-xl bg-secondary-300'>
                                <Image
                                    src="/icons/avatar-image.png"
                                    alt="avatar image"
                                    width={32}
                                    height={32}
                                    className='object-cover object-center w-8 h-8'
                                />
                                <p className='truncate w-[90%] text-sm'>
                                    0x8ad129ykba801298t1wopskgdfiyaasdas7gdas532vgd8b6123
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <p className="text-sm text-secondary-400">Token Info</p>
                            <div className='p-2 w-full gap-2 flex items-center text-white rounded-xl bg-secondary-300'>
                                <Image
                                    src="/icons/Polygon_token.png"
                                    alt="Polygon Token"
                                    width={32}
                                    height={32}
                                    className='object-cover object-center w-8 h-8'
                                />
                                <div className='flex flex-col font-normal'>
                                    <div className='text-sm'>
                                        CRC Token - Sol
                                    </div>
                                    <div className='text-xs text-secondary-900'>
                                        <span>
                                            Amount: 9
                                        </span>
                                        &nbsp;&nbsp;&nbsp;
                                        <span>
                                            Token to Mint: 1000
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='text-secondary-400 text-sm font-normal'>
                                You will receive
                            </div>
                            <div className='text-white font-semibold text-sm'>
                                0.283201 Sol
                            </div>
                        </div>
                        <Link 
                            href='/my-token'
                            className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                        >
                            Burn It
                        </Link>
                    </div>
                )
            }
        </div>
    );
}
