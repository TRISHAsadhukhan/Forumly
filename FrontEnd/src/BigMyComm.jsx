import { useState, useEffect, useContext } from "react";
import SmallComm from "./SmallComm";
import UserContext from "./Components/Context/UserContext";

function BigMyComm() {
    const [results, setResults] = useState([]);
    const { status, userName } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response2 = await fetch(`http://127.0.0.1:8080/MyCommAll?username=${userName}`);
                const data2 = await response2.json();
                setResults(data2);
                console.log("Fetched data:", data2);
            } catch (error) {
                console.error('Error fetching tag data:', error);
            }
        };

        if (userName) {
            fetchData();
        }
    }, [userName]);

    useEffect(() => {
        console.log("Results state updated:", results);
    }, [results]);

    if (status !== 'admin') {
        return (
            <div className="h-fit w-fit p-5 rounded-3xl min-h-[80%] min-w-[30%]  bg-slate-50 bg-opacity-0 backdrop-blur-3xl">
                <div className="text-center mb-12 text-2xl font-extrabold cursor-default text-white">
                    My Communities
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <div className="m-4" key={index}>
                                <SmallComm cname={result.communityname} />
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-white">No communities found.</div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}

export default BigMyComm;
