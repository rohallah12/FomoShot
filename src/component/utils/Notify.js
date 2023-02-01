import React from 'react'

export default function Notify(props) {
  return (
    <div className="bg-[#008000] text-[#FFF] h-[30px] fixed right-[0] top-[74%] p-7 w-[100%] rounded-[5px]">
        <div className=" w-full h-full flex justify-center items-center font-fomofont">
          {props.notifyMessage}
        </div>
    </div>
  )
}
