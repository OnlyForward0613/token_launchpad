import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ConnectButton from './ConnectButton'
import { useData } from "@/contexts/showSideBarContext";
import Sidebar from './Sidebar';

export default function LandingHeader() {
    const { showSideBar, setShowSideBar } = useData();

    return (
        <div className='w-full fixed top-0 z-20'>
            <div className='px-5 md:px-[100px] py-4 md:py-6 bg-secondary-200 flex flex-col items-center justify-center w-full '>
                <div className='max-w-[1440px] w-full flex justify-between items-center'>
                    <Image
                        src='/header_logo.svg'
                        alt='Logo Icon'
                        width={147}
                        height={32}
                    />
                    <div className='hidden md:flex text-xs lg:text-sm xl:text-base items-center text-[white] font-semibold'>
                        <Link href='/create-token' className='py-2 px-2 xl:px-4'>
                            Create Token
                        </Link>
                        <Link href='' className='py-2 px-2 xl:px-4'>
                            Hot Tokens
                        </Link>
                        <Link href='' className='py-2 px-2 xl:px-4'>
                            FAQ
                        </Link>
                        <Link href='' className='py-2 px-2 xl:px-4'>
                            Contact
                        </Link>
                    </div>
                    {
                        showSideBar ? (
                            <Image
                                src='/icons/x.svg'
                                alt='cross'
                                width={20}
                                height={20}
                                onClick={() => setShowSideBar(false)}
                            />
                        ) : (
                            <div className='flex items-center gap-2 lg:gap-4'>
                                <div className='hidden lg:flex items-center gap-2 lg:gap-4'>
                                    <Link href=''>
                                        <Image
                                            src='/icons/twitter.svg'
                                            alt='twitter'
                                            width={22}
                                            height={22}
                                        />
                                    </Link>
                                    <Link href=''>
                                        <Image
                                            src='/icons/Telegram.svg'
                                            alt='telegram'
                                            width={24}
                                            height={24}
                                        />
                                    </Link>
                                    <Link href=''>
                                        <Image
                                            src='/icons/discord.svg'
                                            alt='discord'
                                            width={24}
                                            height={24}
                                        />
                                    </Link>
                                </div>
                                <Image
                                    src='/icons/UK.svg'
                                    alt='uk'
                                    width={24}
                                    height={24}
                                    className='rounded-full'
                                    onClick={() => setShowSideBar(!showSideBar)}
                                />
                                <ConnectButton />
                            </div >
                        )
                    }
                </div >
            </div >
            <div className='md:hidden w-full'>
                {
                    showSideBar && (<Sidebar />)
                }
            </div>
        </div>
    )
}
