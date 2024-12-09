import React from "react";
import QueryContext from "./QueryContext";
const QueryContextProvider =({children})=>{
    const [query,setQuery]=React.useState("")
    
    return(
        <QueryContext.Provider value={{query,setQuery}}>
            {children}
        </QueryContext.Provider>
    )

}
export default QueryContextProvider