import React from 'react'
import SubNavOne from './payment/SubNavOne'
import SubNavTwo from './round-and-team/SubNavTwo'

export default function Menu(props) {
    return (
        <div className="flex justify-between sm:flex-col font-fomofont px-8 sm:px-2 items-start">
         <SubNavOne 
            signerAddress={props.signerAddress}
            selectedTheme={props.selectedTheme}
            setSelectedTheme={props.setSelectedTheme}
            notifystate={props.notifystate}
            setNotifystate={props.setNotifystate}
            notifyMessage={props.notifyMessage}
            setNotifyMessage={props.setNotifyMessage}
            callAgain={props.callAgain}
            setCallAgain={props.setCallAgain}
            time={props.timeleft} 
            SetTimeleft={props.SetTimeleft}
            affcode={props.affcode}
            setAffcode={props.setAffcode}
            playerName={props.playerName}
            setPlayerName={props.setPlayerName}
            playerWinnings={props.playerWinnings}
            playerRoundEth={props.playerRoundEth}
            affearn={props.affearn}
            gen={props.gen}

            setWarnType={props.setWarnType}
            setWarnMessage={props.setWarnMessage}
            setWarnNotify={props.setWarnNotify}

            registered={props.registered}

            loading={props.loading}
            setLoading={props.setLoading}

            currentPot={props.currentPot}
         />   
         <SubNavTwo
           signerAddress={props.signerAddress}
           roundInfo={props.roundInfo}
           whales={props.whales}
           bears={props.bears}
           sneks={props.sneks}
           bulls={props.bulls}
           currentPot={props.currentPot}
           playerKeys={props.playerKeys}
           playerWinnings={props.playerWinnings}
           callAgain={props.callAgain}
           setCallAgain={props.setCallAgain}
           timeleft={props.timeleft} 
         />

        </div>
    )
}
