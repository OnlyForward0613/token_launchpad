import Image from 'next/image'
import React from 'react'

export default function BannerContent() {
    return (
        <div className='flex flex-col items-center gap-8'>
            <div className='flex flex-col items-center gap-3 px-2'>
                <div className='text-[24px] md:text-[40px] text-center'>
                    Looking for updates or support?
                </div>
                <div className='text-sm lg:text-lg text-center'>
                    Get in touch or follow us on social media
                </div>
            </div>
            <div className='flex flex-col sm:flex-row items-center gap-4 justify-center '>
                <button className='bg-secondary-200 rounded-xl px-6 py-2 flex items-center justify-center gap-2'>
                    <Image 
                        src='/icons/white_twitter.svg'
                        alt='twitter_icon'
                        width={20}
                        height={20}
                        className='object-cover object-center '
                    />
                    <div className=''>
                        Twitter
                    </div>
                </button>
                <button className='bg-secondary-200 rounded-xl px-6 py-2 flex items-center justify-center gap-2'>
                    <Image 
                        src='/icons/white_discord.svg'
                        alt='discord_icon'
                        width={20}
                        height={20}
                        className='object-cover object-center '
                    />
                    <div className=''>
                        Discord
                    </div>
                </button>
            </div>
        </div>
    )
}
