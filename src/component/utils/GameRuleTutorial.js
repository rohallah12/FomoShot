import React from 'react'

export default function GameRuleTutorial({ setModal }) {
    return (
        <div className="fixed top-0 left-0 bg-[#000000a6] duration-300  transition ease-in-out delay-300 right-0 h-screen sm:h-auto  z-50  px-4 sm:px-2 sm:p-3 w-full overflow-x-hidden overflow-y-auto md:inset-0 md:h-full justify-center items-center flex"  style={{  transition: 'all .5s'}}>
            <div className="relative w-2/3 font-fomofont h-full mt-24 sm: sm:mt-2 sm:w-full p-6 sm:p-3 ">
                <div className="relative bg-[#212529] p-6 rounded-lg shadow">
                    <div className="flex mb-5  justify-between">
                        <h1 className='text-white text-2xl' style={{ textShadow: "0 0 10px gold, 0 0 10px gold" }}>The Teams</h1>
                        <button onClick={() => setModal(false)} type="button" className="inline-flex items-center px-3 py-0 ml-auto text-sm bg-transparent rounded-lg text-neutral cursor-pointer" data-modal-toggle="add-modal"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        </button>
                    </div>
                    <p className="text-[16px] sm:text-base text-white my-1 font-light mb-5 font-fomofont">In SOS3D, there are four major teams that players can associate themselves with.</p>
                    <p className="text-[16px] sm:text-base text-white my-1 font-light mb-5 font-fomofont">Every time you purchase an additional key(s), you can select one of these four teams. The team you select represents both how you want your <b className="font-bold">key buy-in price split up</b> as well as the <b className="font-bold">pot distribution if you win the round</b> once the timer runs out. In particular, each team is explained below:</p>
                    <ul className='ml-4'>
                        <li className='list-disc text-[16px] sm:text-base text-white my-1 font-light mb-5 font-fomofont'><b className="font-bold ">Snake  <img className='inline mx-2'  src="/images/snake.png" alt="" /></b>-  "Trickle down Divinomics". Your key buy-in price will have a larger share distributed to SOS3D holders and somewhat less given to SOS players. After a round ends, a larger portion of the pot is distributed to SOS3D holders as dividends. <b className="font-bold"> snakes push for distributing more as dividends to other players and to SOS3D holders and less to the pot.</b></li>
                        <li className='list-disc text-[16px] sm:text-base text-white my-1 font-light mb-5 font-nfont'><b className="font-bold"> Whale <img className='inline mx-2 mb-1'  src="/images/whale.png" alt="" /></b>- 
                            "Feed on the greed of others". Your key buy-in price will have a much larger share distributed directly to the ETH pot and less split to SOS players or SOS3D holders. After a round ends, a larger portion of the pot is held for the next round and less given as dividends to players and holders.
                            <b className="font-bold">Whales push for keeping more of the ETH in the pot and for future rounds rather than distributed as dividends.</b>
                        </li>
                        <li className='list-disc text-[16px] sm:text-base text-white my-1 font-light mb-5 font-fomofont'><b className="font-bold">Bull  <img  className='inline mx-2' src="/images/bull.png" alt="" /></b>-  "Break upwards, never stagnate". After a round ends, a larger portion of the pot is distributed to SOS players as dividends.
                            <b className="font-bold"> Bulls push for distributing more of the pot as dividends to other players and a smaller amount to SOS3D holders than snakes.</b>
                        </li>
                        <li className='list-disc text-[16px] sm:text-base text-white my-1 font-light mb-5 font-fomofont'><b className="font-bold"> Bear <img  className='inline mx-2' src="/images/bear-icon.png" alt="" /></b>-  "Stand alone, fight alone". Choosing team bear is a veto against SOS3D holders. Your key buy-in price does not go to SOS3D and a larger share is distributed to SOS players. After a round ends, none of the pot will be distributed to SOS3D holders as dividends.
                            <b className="font-bold">Bears push for distributing dividends to other SOS players rather than sharing any with SOS3D holders.</b>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
