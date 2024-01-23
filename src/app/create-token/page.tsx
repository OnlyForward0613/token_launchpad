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
import { MarketV2, DEVNET_PROGRAM_ID } from '@raydium-io/raydium-sdk';
import { createMarket } from '@/contexts/createMarket';
import { PublicKey } from '@solana/web3.js';
import { revokeMintAuthority } from '@/contexts/revokeMintAuthority';
import { revokeFreezeAuthority } from '@/contexts/revokeFreezeAuthority';
import { createLiquidity } from '@/contexts/createLiquidity';
import { burnToken } from '@/contexts/burnToken';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, Token } from '@solana/spl-token';

let mintAddress: PublicKey | undefined = undefined;
let marketId: PublicKey | null = null;
let lpMint: PublicKey | null | undefined = null;

export default function Home() {

    const wallet = useWallet()
    const { connection } = useConnection()
    const router = useRouter();
    const [tokenName, setTokenName] = useState("")
    const [tokenSymbol, setTokenSymbol] = useState("")
    const [tokenLogo, setTokenLogo] = useState<File | null>()
    const [tokenDecimal, setTokenDecimal] = useState(9)
    const [tokenBalance, setTokenBalance] = useState(0)
    const [solBalance, setSolBalance] = useState('0')

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

        if (
            tokenName != "" &&
            tokenSymbol != "" &&
            tokenLogo != null &&
            tokenBalance != 0
        ) {
            if (!wallet.publicKey) return;
            alert("123");
            const _file = await toMetaplexFileFromBrowser(tokenLogo);
            console.log("file ====>", _file);
            console.log("wallet publicKey ===>", wallet.publicKey, wallet);
            console.log("connection ===>", connection);
            console.log("tokenBalance ===>", tokenBalance);
            console.log("tokenName ===>", tokenName);
            console.log("tokenSymbol ===>", tokenSymbol);
            mintAddress = await createSPLToken(wallet.publicKey, wallet, connection, tokenBalance, tokenDecimal, true, tokenName, tokenSymbol, "", "", _file, "string")

        } else {
            alert("Invalid params")
        }
        setStep(2);
    }

    const handleCreateMarket = async () => {
        const baseMint = mintAddress != undefined ? mintAddress : new PublicKey("AXVANX9Exmoghok94dQkdLbQddpe9NjQkQ9heEcauDiF");
        const baseDecimal = tokenDecimal;
        const quoteMint = new PublicKey("So11111111111111111111111111111111111111112");
        const quoteDecimal = 9;
        const orderSize = 1;
        const tickSize = 0.01;
        alert("123");
        marketId = await createMarket(connection, wallet, baseMint, baseDecimal, quoteMint, quoteDecimal, orderSize, tickSize);
        console.log("creating market id ====>", marketId);
        setStep(5);
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
    const handleSolBalanceChange = (value: string) => {
        setSolBalance(value);

        // alert(value);
    }

    const clickRevokeMint = async () => {
        if (mintAddress == undefined) {
            alert("mint address is not set");
            return;
        }
        if (wallet.publicKey == null) {
            alert("wallet is not configured");
            return;
        }
        const mint = mintAddress;
        console.log("revoke mint :mint ===>", mint.toBase58())
        await revokeMintAuthority(connection, wallet, mint);
        setStep(3);
    }

    const clickRevokeFreeze = async () => {
        if (mintAddress == undefined) {
            alert("mint address is not set");
            return;
        }
        const mint = mintAddress;
        console.log("revoke freeze: mint ==>", mint.toBase58());
        await revokeFreezeAuthority(connection, wallet, mint);
        setStep(4);
    }
    // LP Mint : GozTnFTuSphKc8V2rGnaUm56WGBFnWS3W99iPzhRFv6n
    // AMM Id : CVtUnBf87fD3W3v1hcZ9kzXKSHDXjdXpDS6stFTYEPyp


    // marketId : krnKbe4BiwN7rDDhto1kmnxJttXPnM5u8JDYbMSUL93
    // AMM Id : DeaKJBnzRZEEGwfx9TLUSd6YHZuFqtLV9zCUj5PY8Aw8
    const clickAddLiquidity = async () => {
        if (marketId == undefined) {
            alert("marketId is not set");
            return;
        }
        if (mintAddress == undefined) {
            alert("mint address is not set");
            return;
        }

        console.log("Liquidity marketId ====>", marketId);
        const baseMint = mintAddress;
        // const baseMint = new PublicKey("24rsNkc3Xg5mMhPKLi5LvxkY7eS2R9d3CiaqGKUCEa4J");
        const baseDecimal = tokenDecimal;
        const quoteMint = new PublicKey("So11111111111111111111111111111111111111112");
        const quoteDecimal = 9;
        const orderSize = 1;
        const tickSize = 0.01;
        // const marketId1 = new PublicKey("krnKbe4BiwN7rDDhto1kmnxJttXPnM5u8JDYbMSUL93");
        // const balanceElement = document.getElementById("sol-balance");
        // if (balanceElement == null) return;
        console.log("mintaddress ==>", baseMint.toBase58());
        console.log("solbalance ===>", parseFloat(solBalance));
        lpMint = await createLiquidity(connection, wallet, baseMint, baseDecimal, quoteMint, quoteDecimal, orderSize, tickSize, marketId, tokenBalance, parseFloat(solBalance));
        setStep(6);
    }

    const clickBurnToken = async () => {
        if (wallet.publicKey == null) {
            alert("wallet is not configured yet");
            return;
        }
        if (lpMint == undefined || null) {
            alert("no LP token exist");
            return;
        }
        const mint = lpMint;
        console.log('lpMint ===>', lpMint);
        const tokenAccountAddress = await Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, mint, wallet.publicKey);
        console.log('tokenAccountAddress ===>', tokenAccountAddress.toBase58());
        await burnToken(connection, wallet, mint, tokenAccountAddress);
        router.push('my-token');
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
                                <p className="text-sm text-secondary-400">Decimal</p>
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
                                    {wallet.publicKey?.toBase58()}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <button
                                className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                                onClick={clickRevokeMint}
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
                                    {wallet.publicKey?.toBase58()}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4'>
                            <button
                                className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                                onClick={clickRevokeFreeze}
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
                step == 5 && (
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
                                onClick={
                                    () => sendLanding()
                                }
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
                                    {wallet.publicKey?.toBase58()}
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
                                    id="sol-balance"
                                    className="w-full rounded-xl text-sm bg-secondary-500 py-3 px-4 placeholder:text-secondary-700 text-white focus:ring-0 focus:border-0 focus:outline-none"
                                    onChange={(e) => handleSolBalanceChange(e.target.value)}
                                    value={solBalance}
                                />
                                <p className='absolute right-4 top-[10px] text-secondary-700'>$sol</p>
                            </div>
                        </div>
                        <button
                            className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                            onClick={clickAddLiquidity}
                        >
                            Add Liquidity
                        </button>
                    </div>
                )
            }
            {
                step == 4 && (
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
                                    {wallet.publicKey?.toBase58()}
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
                            onClick={handleCreateMarket}
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
                                    {wallet.publicKey?.toBase58()}
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
                                            Decimal: 9
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
                        <div
                            className="w-full py-3 px-6 text-[white] text-sm font-semibold text-center rounded-xl bg-primary-200"
                            onClick={clickBurnToken}
                        >
                            Burn It
                        </div>
                    </div>
                )
            }
        </div>
    );
}
