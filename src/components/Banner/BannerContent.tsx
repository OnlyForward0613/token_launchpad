import Image from 'next/image'
import React from 'react'

export default function BannerContent() {
    return (
        <div className='flex flex-col items-center gap-8'>
            <div className='flex flex-col items-center gap-3'>
                <div className='text-[40px]'>
                    Looking for updates or support?
                </div>
                <div className='text-sm sm:text-lg'>
                    Get in touch or follow us on social media
                </div>
            </div>
            <div className='flex items-center gap-4 justify-center '>
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
