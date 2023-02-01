import React from 'react'

export default function TutorialModal({setModal}) {
    return (
        <div className="fixed top-0 left-0 bg-[#000000a6] duration-300 transition ease-in-out delay-300 right-0 h-screen z-50  px-4 sm:px-2 w-full overflow-x-hidden overflow-y-auto md:inset-0 md:h-full justify-center items-center flex">
            <div className="relative w-2/3 font-fomofont h-full mt-24 sm: sm:mt-2 sm:w-full p-6 sm:p-2">
                <div className="relative bg-[#212529] p-6 rounded-lg shadow">
                    <div className="flex mb-5  justify-between">
                        <h1 className='text-white text-2xl' style={{ textShadow: "0 0 2px #690069, 0 0 25px #c0c, 0 0 5px #f0f" }}>How to play SOS3D</h1>
                        <button onClick={() => setModal(false)} type="button" className="inline-flex items-center px-3 py-0 ml-auto text-sm bg-transparent rounded-lg text-neutral cursor-pointer"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRrule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        </button>
                    </div>
                    <p className="text-base text-white my-4 font-light  font-fomofont">Buy a key by choosing the amount of keys you want, choosing the team and then clicking on the <b className='font-bold'>SEND SOS</b> button.</p>
                    <p className="text-base text-white my-1 font-light mb-5 font-fomofont">Congratulations, you are now holding the key to the pot! You will win the pot as long as nobody else buys another key.</p>
                    <h1 className='text-white mt-2 mb-1 text-2xl' style={{ textShadow: "0 0 2px #690069, 0 0 25px #c0c, 0 0 5px #f0f" }}>Want to spread your joy and earn 10% affiliate fees?</h1>
                    <p className="text-base text-white font-light  font-fomofont">Just register a name for <b className='font-bold' style={{ textShadow: ' gold 0px 0px 10px, gold 0px 0px 10px' }}>0.01 SOS </b>in the <b className='font-bold'>Vanity & Referrals</b> tab.</p>
                    <p className="text-base text-white my-1 font-light font-fomofont">Whenever someone purchases keys through your link, <b className='font-bold' style={{ textShadow: "0 0 2px #690069, 0 0 25px #c0c, 0 0 5px #f0f" }}>10%</b> of their purchase will go directly to you!</p>
                    <p className="text-base text-white my-1 font-light mb-5 font-fomofont">Once your name is registered, a <b className='font-bold'>Vanity Referral </b> link will be made for you. For example <a className='font-bold text-[#0d6efd]' href="/">SOS3D.net/inventor</a>.</p>
                    <p className="text-base text-white my-1 font-light mb-5 font-fomofont">Btw, if you have a name registered and you are the most recent key buyer, then your name will show up at the top! For example, <b className='font-bold'>satoshi is EXIT SCAMMING</b>.</p>
                </div>
            </div>
        </div>
    )
}
