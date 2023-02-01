import React, { useState } from 'react'
import PurchaseComponet from './PurchaseComponet'
import VanityAndReferralsComponent from './VanityAndReferralsComponent'
import VaultComponet from './VaultComponent'

export default function SubNavOne(props) {
    const [items, setItems] = useState('Purchase')


    const ItemBox = () => {
        switch (items) {
            case 'Purchase':
                return <PurchaseComponet
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

                   setWarnType={props.setWarnType}
                   setWarnMessage={props.setWarnMessage}
                   setWarnNotify={props.setWarnNotify}

                   registered={props.registered}

                   loading={props.loading}
                   setLoading={props.setLoading}

                   playerWinnings={props.playerWinnings}
                  />;
            case 'Vault':
                return <VaultComponet
                        signerAddress={props.signerAddress}
                        playerWinnings={props.playerWinnings}
                        playerRoundEth={props.playerRoundEth}
                        affearn={props.affearn}
                        currentPot={props.currentPot}
                        gen={props.gen}

                        setWarnType={props.setWarnType}
                        setWarnMessage={props.setWarnMessage}
                        setWarnNotify={props.setWarnNotify}
                        />
            case 'Vanity':
                return <VanityAndReferralsComponent
                        affcode={props.affcode}
                        signerAddress={props.signerAddress}
                        playerName={props.playerName}
                        setPlayerName={props.setPlayerName}

                        setWarnType={props.setWarnType}
                        setWarnMessage={props.setWarnMessage}
                        setWarnNotify={props.setWarnNotify}
                    />
            default:
                break;
        }
    }

    return (
        <div className="text-white font-fomofont ">
            <ul className="flex items-center mt-6 font-fomofont  justify-between w-[55%] sm:w-[91%]">
                <li className={`rounded-t-md  px-4 py-3 text-lg sm:text-base font-light ${items ==="Purchase" ? "bg-[#212529]" : ""}`}><button onClick={() => setItems('Purchase')}>Purchase</button></li>
                <li className={`rounded-t-md  px-4 py-3 text-lg sm:text-base font-light ${items ==="Vault" ? "bg-[#212529]" : ""}`}><button onClick={() => setItems('Vault')}>Vault</button></li>
                <li className={`rounded-t-md  px-4 py-3 text-lg sm:text-base font-light ${items ==="Vanity" ? "bg-[#212529]" : ""}`}><button onClick={() => setItems('Vanity')}>Vanity & Referrals</button></li>
            </ul>

            {ItemBox()}
        </div>
    )
}
