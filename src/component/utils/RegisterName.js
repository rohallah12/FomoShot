import React, {useState} from 'react';
import { ethers } from "ethers";
import { gameABI, gameContract, tokenContract, ercABI} from "../chainUtils/constants";



export default function RegisterName({ setModal, affcode, setWarnType, setWarnMessage, setWarnNotify}) {
   
    const[putName, setPutName] = useState();

    const getGameContract = async () => {
        console.log("bad guy called");
        const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
        const signertemp = temporalProvider.getSigner();
        return new ethers.Contract(gameContract, gameABI, signertemp);
    }

    const gettokenContract = async () => {
        const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
        const signertemp = temporalProvider.getSigner();
        return new ethers.Contract(tokenContract, ercABI, signertemp);
    }




        //setName
        const setName = async (e) => {
            e.preventDefault();
            if(!putName) {
                setWarnType('FFCC00');
                setWarnMessage("Name field is empty");
                setWarnNotify(true);
                return;
            }

            const tokenContractInstance = await gettokenContract();
            const Contract = await getGameContract();
            const fees = ethers.utils.parseEther(String(0.01));

            const approve = await tokenContractInstance.approve(gameContract, fees);
            await approve.wait();
    
            const paytoRegister = await Contract.transferSOS(fees);
            await paytoRegister.wait();


            if(affcode) {
                const register = await Contract.registerNameXID(putName, affcode, false, fees, 
                    { 
                        gasLimit: 1000000, 
                        nonce: 105 || undefined
                     });
                await register.wait();
            } else {
                const _affcode = "0x0000000000000000000000000000000000000000";
                const register = await Contract.registerNameXID(putName, 0, false, fees, 
                    {
                        gasLimit: 1000000, 
                        nonce: 105 || undefined
                    });
                await register.wait();
            }
          
           
            /*
            if(masternode.type.name && masternode.type.value) {
                _affcode = masternode.type.name;
                data = gameContract.registerNameXname.getData(name, _affcode, false);
            } else if(id && masternode.type.value) {
                _affcode = id;
                data = gameContract.registerNameXid.getData(name, _affcode, false);
            } else if(masternode.type.address && masternode.type.value) {
                _affcode = masternode.type.address;
                data = gameContract.registerNameXaddr.getData(name, _affcode, false);
            } else {
                _affcode = "0x0000000000000000000000000000000000000000";
                data = gameContract.registerNameXaddr.getData(name, _affcode, false);
            }
            */

            setWarnType('4BB543');
            setWarnMessage("Name Registered");
            setWarnNotify(true);
            
          }


    return (
        <div className="fixed top-0 left-0 bg-[#000000a6] duration-300 transition ease-in-out delay-300 right-0 h-screen z-50  px-4 w-full overflow-x-hidden overflow-y-auto md:inset-0 md:h-full justify-center items-center flex">
            <div className="relative w-2/3 font-fomofont h-full mt-24 sm: sm:mt-2 sm:w-full p-6 sm:p-3">
                <div className="relative bg-[#212529] p-6 rounded-lg shadow">
                    <div className="flex mb-10  justify-between">
                        <h1 className='text-white text-2xl'>Graffiti your name on the Blockchain</h1>
                        <button onClick={() => setModal(false)} type="button" className="inline-flex items-center px-3 py-0 ml-auto text-sm bg-transparent rounded-lg text-neutral cursor-pointer"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRrule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                        </svg>
                        </button>
                    </div>
                    <form>
                        <input type="text" className='w-full text-[#222] outline-none py-2 px-4 rounded-md' placeholder='Kokichi Mikimoto' onChange={(e) => setPutName(e.target.value)} />
                        <p className="text-base text-white my-1 mt-6 font-light  font-fomofont">Names must follow these rules:</p>
                        <p className="text-base text-white my-1 font-light  font-fomofont">-Must be unique</p>
                        <p className="text-base text-white my-1 font-light  font-fomofont">-32 Characters or less</p>
                        <p className="text-base text-white my-1 font-light  font-fomofont">-A-Z(upper and lowercase)</p>
                        <p className="text-base text-white my-1 font-light  font-fomofont">-No special characters</p>
                        <p className="text-base text-white my-1 font-light  font-fomofont">-No more than one space between characters</p>
                        <p className="text-base text-white my-6 font-light  font-fomofont">If the transaction fails, one of these criteria was not met properly.</p>
                        <p className="text-base text-white mb-6 font-light  font-fomofont">Names are yours permanently(for vanity URLS). But only your most recent name will show up on the leaderboard/game UI. You can own as many names as you'd like.</p>
                        <button className="w-full flex items-center justify-center border hover:text-white hover:bg-[#f000f0] rounded-md py-2 border-[#f000f0]" onClick={(e) => setName(e)}>Purchase for 0.01 ETH</button>
                        <p className="text-base text-white my-1 font-light  font-fomofont">The fee is distributed across community members who made this game possible.</p>

                    </form>
                </div>
            </div>
        </div>
    )
}
