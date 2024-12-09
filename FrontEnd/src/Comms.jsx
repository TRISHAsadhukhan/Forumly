import { useState } from "react"
import {Link,NavLink,useNavigate} from 'react-router-dom'
import MyComm from "./MyComm"
import TopComm from "./TopComm"
function Comms() {
  return (
    <>
     <div className="h-fit px-2 w-fit flex items-top">
        <div>
            <div className="mb-3"><MyComm/></div>
            <div><TopComm/></div>
        </div>
     </div>
    </>
  )
}

export default Comms
