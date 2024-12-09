import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import QueryContext from './Components/Context/QueryContext';
import SmallComm from './SmallComm'

function SearchPage() {
  const { query } = useContext(QueryContext);
  const [results, setResults] = useState([]);
  const [resultsTag, setResultsTag] = useState([]);
  const [loadingResults, setLoadingResults] = useState(false);
  const [loadingResultsTag, setLoadingResultsTag] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setResultsTag([]);
      return;
    }

    const fetchData = async () => {
      setLoadingResults(true);
      setLoadingResultsTag(true);
      try {
        const response = await fetch(`http://127.0.0.1:8080/SearchComm?query=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoadingResults(false);

      try {
        const response2 = await fetch(`http://127.0.0.1:8080/SearchTags?query=${query}`);
        const data2 = await response2.json();
        setResultsTag(data2);
      } catch (error) {
        console.error('Error fetching tag data:', error);
      }
      setLoadingResultsTag(false);
    };

    fetchData();
  }, [query]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className='h-screen flex items-start w-[40%]'>
      <div className='bg-slate-50 bg-opacity-0 backdrop-blur-3xl rounded-xl mt-20 w-full'>
        {(loadingResults || loadingResultsTag) ? (
          <div className='text-white'>Loading...</div>
        ) : (
          <>
            {results.length > 0 && (
              <>
                <div className='w-full p-6 text-left tracking-widest text-3xl m-4 pl-2 pt-10 cursor-default text-white'>Results with similar Name</div>

                {results.map((result, index) => (
                  <div className='w-full p-2 text-left ml-10 mb-6' key={index}><SmallComm cname={result.communityname} /></div>
                ))}

              </>
            )}

            {resultsTag.length > 0 && (
              <>
                <div className='w-full p-6 text-left tracking-widest text-3xl m-4 pl-2 cursor-default text-white'>Results with similar Tag</div>

                {resultsTag.map((result, index) => (
                  <div className='w-full p-2 text-left ml-10 mb-6 '><SmallComm cname={result.communityname} /></div>
                ))}

              </>
            )}
            {resultsTag.length === 0 && results.length === 0 && query.length > 0 && (
              <>
                <div className='w-full p-6 text-center tracking-widest text-3xl text-white'>No Results</div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;