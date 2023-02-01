import React, { useEffect, useState } from 'react';
import { ethers } from "ethers";
import {chainID, gameABI, gameContract} from "../chainUtils/constants";


export default function Smallertime(props) {


  const [timerHourss, setTimerHourss] = useState();
  const [timerMinutess, setTimerMinutess] = useState();
  const [timerSecondss, setTimerSecondss] = useState();


  const getGameContract = async () => {
    //console.log("bad guy called");
    const temporalProvider = await new ethers.providers.Web3Provider(window.ethereum);
    const signertemp = temporalProvider.getSigner();
    return new ethers.Contract(gameContract, gameABI, signertemp);
}


  let interval;

    
  const startTimer = (date) => {
    //console.log(date * 1000);
    //const countDownDate = new Date(date).getTime();
    //console.log(countDownDate);

    interval = setInterval(() => {
      const now = new Date().getTime();


      const distance = date * 1000 - now;
      //console.log(distance);


      const hours = Math.floor(distance % (1000 * 60 * 60 * 24)/(1000 * 60 * 60));
      const minutes = Math.floor(distance % (60*60*1000)/(1000*60));
      const seconds = Math.floor(distance % (60*1000)/(1000));


      if(distance <= 0 ) {
        //clear timer
        //show message
        //props.setCallAgain(!props.callAgain);
        //call the auto endRound function
        //clearInterval(interval.current);
        //console.log("Bad guy called timer");
        //autoRound();
        
      } else {
        //update timer
        setTimerHourss(hours);
        setTimerMinutess(minutes);
        setTimerSecondss(seconds);
        //let arrreturn = [days, hours, minutes, seconds];
       // return [days, hours, minutes, seconds];

      }

    })
  }


  const autoRound = async () => {
    const Contract = await getGameContract();
    const roundend = await Contract.autoRound();
    await roundend.wait();
    //console.log(round ended new buy initiates new round)
   }


  useEffect(() => {

    //const nintyMinutesLater = new Date();
    //nintyMinutesLater.setMinutes(nintyMinutesLater.getMinutes() + 1);


   if(props.signerAddress) {
    if(props.time !== undefined) {
      startTimer(props.time);
    }

  }


  }, [props.time])





  return (

    <div className=" flex justify-center w-1/2">
    <div className="flex ml-2">
    <h6 className='text-[2.5rem] sm:text-[1.75rem]  font-[500]'>
        <span id="hours" />
        {timerHourss}
    </h6>
    <div className="text-[2.5rem] sm:text-[1.75rem]  font-[500]">:</div>
    <h6 className='text-[2.5rem] sm:text-[1.75rem]  font-[500]'>
        <span id="minutes" />
        {timerMinutess}
    </h6>
    <div className="text-[2.5rem] sm:text-[1.75rem]  font-[500]">:</div>
    <h6 className='text-[2.5rem] sm:text-[1.75rem]  font-[500]'>
        <span id="seconds" />
        {timerSecondss}
    </h6>
    </div>
    </div>
  )


}


Smallertime.defaultProps = {
  timerHourss:10,
  timerMinutess:10,
  timerSecondss:10
}
