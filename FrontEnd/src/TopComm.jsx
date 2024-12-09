import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import SmallComm from "./SmallComm";
import UserContext from "./Components/Context/UserContext";

function TopComm() {
  const { newCom } = useContext(UserContext);
  const [results, setResults] = useState([]);
  const { status } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response2 = await fetch('http://127.0.0.1:8080/SearchTopComm');
        const data2 = await response2.json();
        setResults(data2);
      } catch (error) {
        console.error('Error fetching tag data:', error);
      }
    };

    fetchData();
  }, [newCom]);

  if (status !== 'admin') {
    return (
      <div className="h-fit w-fit p-5 rounded-3xl min-h-[428px] min-w-[300px]" style={{ background: 'rgba(25, 25, 25, 0.65)', borderRadius: '16px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', WebkitBackdropFilter: 'blur(8px)', backdropFilter: 'blur(8px)', border: '1px solid rgba(18, 18, 18, 1)' }}>
        <div className="text-center mb-7 text-2xl font-extrabold cursor-default text-white">
          Top Communities
        </div>
        {results.map((result, index) => (
          <div className="m-4" key={index}>
            <Link to={`/Community/${result.communityname}`}>
              <SmallComm cname={result.communityname} />
            </Link>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default TopComm;
