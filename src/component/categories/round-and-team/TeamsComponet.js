import React from 'react'

export default function TeamsComponet(props) {
    return (
        <div className="bg-[#212529] f grid grid-cols-2 font-fomofont w-[48vw] sm:w-[95vw] gap-6 p-5 rounded-b-2xl rounded-r-2xl">
            <div className="flex flex-col bg-[#181c1d] p-5 items-center justify-center rounded-md">
                <span className='font-light'>Whales</span>
                <img src="/images/whalet.png" alt="whale" />
                <b className='font-normal' style={{ textShadow: ' gold 0px 0px 10px, gold 0px 0px 10px' }}>
                    {props.signerAddress ?
                     <>
                     {props.whales}
                     </>
                     :
                     "0 ETH"
                    }

                </b>
            </div>
            <div className="flex flex-col bg-[#181c1d] p-5 items-center justify-center rounded-md">
                <span className='font-light'>Bears</span>
                <img src="/images/beart.png" alt="whale" />
                <b className='font-normal' style={{ textShadow: ' gold 0px 0px 10px, gold 0px 0px 10px' }}>
                {props.signerAddress ?
                     <>
                     {props.bears}
                     </>
                     :
                     "0 ETH"
                    }
                </b>
            </div>
            <div className="flex flex-col bg-[#181c1d] p-5 items-center justify-center rounded-md">
                <span className='font-light'>Bulls</span>
                <img src="/images/cowt.png" alt="whale" />
                <b className='font-normal' style={{ textShadow: ' gold 0px 0px 10px, gold 0px 0px 10px' }}>
                {props.signerAddress ?
                     <>
                     {props.bulls}
                     </>
                     :
                     "0 ETH"
                    }
                </b>
            </div>
            <div className="flex flex-col bg-[#181c1d] p-5 items-center justify-center rounded-md">
                <span className='font-light'>Snakes</span>
                <img src="/images/snaket.png" alt="whale" />
                <b className='font-normal' style={{ textShadow: ' gold 0px 0px 10px, gold 0px 0px 10px' }}>
                  {props.signerAddress ?
                     <>
                     {props.sneks}
                     </>
                     :
                     "0 ETH"
                    }
                </b>
            </div>
        </div>
    )
}
