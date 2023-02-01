import React, { useEffect, useRef, useState } from 'react'
import { FaCheck, FaCopy } from 'react-icons/fa'
import RegisterName from '../../utils/RegisterName';
import {shortenAddress} from "../../chainUtils/trauncate";

export default function VanityAndReferralsComponent(props) {
    const [modal, setModal] = useState(false);
    const [copy, setCopy] = useState('Copy');
    const paramtext = "name"
    const textToShow = `https://fomosos.netlify.app/${props.signerAddress ? shortenAddress(props.signerAddress) :  undefined}`;
    const textToCopy = `https://fomosos.netlify.app/${props.signerAddress}`;
    const copyButtonRef = useRef(null);

    const copyToClipboard = (value) => {
        setCopy("copied");
        navigator.clipboard.writeText(textToCopy);
    };

    useEffect(() => {
        setTimeout(() => {
            setCopy("Copy");
        }, 500)
    }, [copy])


    return (
        <>
            <div className="bg-[#212529] w-[46vw] sm:w-full font-fomofont p-4 rounded-b-2xl rounded-r-2xl">
                <p className="text-base my-1 font-light text-center font-fomofont">Advise others to invest in this exit scam and we'll reward you 10% of everything they lose. In SOS</p>

                <div className="flex flex-col justify-center items-center my-3 text-base font-light font-fomofont">
                    <h4 className=' text-xl font-normal font-fomofont'>Wallet Referral</h4>
                    <p>{textToShow}</p>
                    <button ref={copyButtonRef} onClick={() => copyToClipboard(props.signerAddress) } className='px-3 my-1 font-fomopink font-normal text-base flex items-center justify-center border hover:text-white hover:bg-[#f000f0] rounded-md py-1.5 border-[#f000f0]'><FaCopy className='mr-1' />{copy}</button>
                </div>
                {/* 
                <div className="flex flex-col justify-center items-center my-3 text-base font-light font-fomofont">
                    <h4 className=' text-xl font-normal font-fomofont'>Anonymous Referral</h4>
                    <p>{textToCopy}</p>
                    <button ref={copyButtonRef} onClick={() => copyToClipboard(0)} className='px-3 my-1 font-fomopink font-normal text-base flex items-center justify-center border hover:text-white hover:bg-[#f000f0] rounded-md py-1.5 border-[#f000f0]'><FaCopy className='mr-1' />{copy}</button>
                </div>
                <div className="flex flex-col justify-center items-center my-3 text-base font-light font-fomofont">
                    <h4 className=' text-xl font-normal font-fomofont'>Vanity Referral</h4>
                    <p>{textToCopy}</p>
                    <button ref={copyButtonRef} onClick={() => copyToClipboard(props.playerName)} className='px-3 my-1 font-fomopink font-normal text-base flex items-center justify-center border hover:text-white hover:bg-[#f000f0] rounded-md py-1.5 border-[#f000f0]'><FaCopy className='mr-1' />{copy}</button>
                </div>
                <button onClick={() => setModal(true)} className="w-full flex items-center justify-center border hover:text-white hover:bg-[#f000f0] rounded-md py-2 border-[#f000f0] "><FaCheck className='mr-2' />Register a new name</button>
                */}
            </div>
            {
                modal &&  <RegisterName 
                    affcode={props.affcode} 
                    setModal={setModal}
                    setWarnType={props.setWarnType}
                    setWarnMessage={props.setWarnMessage}
                    setWarnNotify={props.setWarnNotify}
                    />
            }
           
        </>


    )
}
