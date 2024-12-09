import { useState } from "react"
import {Link,NavLink,useNavigate} from 'react-router-dom'
function SmallComm({cname="Community Name"}) {

  
  return (
    <>
     <Link to={`/Community/${cname}`}><div className="bg-black w-fit p-1 rounded-full cursor-pointer pl-2 transition-all ease-in-out delay-100 hover:bg-purple-600 min-w-[249px] ">
        <div className="bg-white text-black font-bold rounded-full p-4 w-fit inline-block">
            C/
        </div>
        <div className="h-full inline-block w-fit p-4">
            <div className="text-white font-bold tracking-wider">
                {cname}
            </div>
        </div>
     </div></Link>
    </>
  )
}

export default SmallComm
