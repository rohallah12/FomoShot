import React, {useEffect, useState} from 'react';


export default function Congratulate(props) {

  const [message, setMessage] = useState('');

  const handleShare = () => {
    return;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(twitterUrl, '_blank');
  };

  useEffect(() => {
    handleShare();
  }, [message]);

  return (
    <div className="bg-[#008000] text-[#FFF] h-[100px] fixed left-[22%] right-[0] top-[35%] p-7 w-[60%] rounded-[5px]" >
        <div className=" w-[100%] h-full flex flex-col justify-center items-center font-fomofont">
        <button onClick={() => props.setCongrats(false)} type="button" className="inline-flex items-center px-3 py-0 ml-auto text-sm bg-transparent rounded-lg text-neutral cursor-pointer" data-modal-toggle="add-modal"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
          </button>
          <div className="flex relative">
            <div className="">Congratulation you won Last Round</div>

            <div className="absolute">
              <img src="/images/confetti.png" alt="congrats" className='' />
            </div>
            </div> 
          <div className="">
            Show off your winnning on Twitter
            <input type="text" className='text-black' value={message} onChange={e => setMessage(e.target.value)} />
          </div>
        </div>
    </div>
  )
}
