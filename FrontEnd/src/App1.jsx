import React, { useState } from 'react';
import image from './alanwake.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'

function App1({ id, heading, type, content, uploader, upvotes, downvotes, name, community }) {
  const limitTextToFiveLines = (text) => {
    const lines = text.split('\n');
    if (lines.length > 5) {
      lines.splice(4, 0, "...")
    }
    return lines.slice(0, 5);
  };
  if (type == "image") {
    return (
      <>
        <Link to={`/Content/${id}`}><div className="bg-purple-800 shadow-2xl hover:bg-purple-600 transition-all ease-in-out delay-50 w-[680px] rounded-lg p-4 cursor-pointer min-h-80">
          <div className="flex rounded-l-full rounded-r-full w-full pr-6 mb-5">
            <div className='flex justify-start items-center w-full'>
              <div className="mt-2 text-white text-2xl ml-2 font-bold tracking-wider">
                {heading}
              </div>
            </div>
            <div className='flex'>

            </div>
          </div>
          <div className='h-80 flex justify-center bg-purple-900 rounded-md'>
            <img src={`http://localhost:8080/images/${name}`} className='h-full rounded-md ' />
          </div>

          <div className='flex items-center justify-between h-fit w-full'>
            <div className="p-4 text-white  text-center flex mr-3 justify-start h-10 w-32 mt-5 items-center">
              <div className='mr-2 rounded-full text-purple-600 bg-white h-8 w-8 p-2 flex items-center justify-center border border-purple-200'>
                {upvotes - downvotes}
              </div>
              <div>
                VOTES
              </div>
            </div>
            <div className='flex items-center h-full'>
              <div className='rounded-full mr-2 mt-5 text-purple-600 bg-white h-8 w-8 p-2 flex items-center justify-center border border-purple-200'>
                c/
              </div>
              <div className='text-white mt-5 mr-3'>{community}</div>
            </div>
          </div>

        </div>
        </Link>
      </>
    );

  }
  else if (type == "text") {
    return (
      <>
        <Link to={`/Content/${id}`}><div className="bg-purple-800 shadow-2xl hover:bg-purple-600 transition-all ease-in-out delay-50 w-[680px] rounded-lg p-4 pl-6 cursor-pointer min-h-80">
          <div className="flex rounded-l-full rounded-r-full w-full pr-6 mb-3">
            <div className='flex justify-start items-center w-full'>
              <div className="mt-2 text-white text-2xl ml-2 font-bold tracking-wider">
                {heading}
              </div>
            </div>
            <div className='flex'>

            </div>
          </div>
          <div className='flex h-80 bg-white pl-2 rounded-xl'>
            <div children='w-fit h-fit whitespace-pre-line align-bottom text-wrap break-all'>
              {limitTextToFiveLines(content).map((line, index) => (
                <div className='text-purple-900 w-full text-xl p-2 text-wrap break-all' key={index}>{line}</div>
              ))}
            </div>
          </div>

          <div className='flex items-center justify-between h-fit w-full'>
            <div className="p-4 text-white  text-center flex mr-3 justify-start h-10 w-32 mt-5 items-center">
              <div className='mr-2 rounded-full text-purple-600 bg-white h-8 w-8 p-2 flex items-center justify-center border border-purple-200'>
                {upvotes - downvotes}
              </div>
              <div>
                VOTES
              </div>
            </div>
            <div className='flex items-center h-full'>
              <div className='rounded-full mr-2 mt-5 text-purple-600 bg-white h-8 w-8 p-2 flex items-center justify-center border border-purple-200'>
                c/
              </div>
              <div className='text-white mt-5 mr-3'>{community}</div>
            </div>

          </div>


        </div>
        </Link>
      </>
    );
  }
}
export default App1;

