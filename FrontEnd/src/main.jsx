import React from 'react'
import ReactDOM from 'react-dom/client'
import NewComm from './NewComm.jsx'
import Admin from './Admin.jsx'
import Premium from './Premium.jsx'
import App1 from './App1.jsx'
import Search from './Search.jsx'
import Login1 from './Login1.jsx'
import Register from './Register.jsx'
import Navs from './Navs.jsx'
import Profile from './Profile.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import Comms from './Comms.jsx'
import ContentUpload from './ContentUpload.jsx'
import BigContent from './BigContent.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout2 from './Layout2.jsx'
import AvatarCard from './AvatarCard.jsx'
import Community from './Community.jsx'
import MyPosts from './MyPosts.jsx'
import Saved from './Saved.jsx'
import BigMyComm from './BigMyComm.jsx'

const router=createBrowserRouter([
  
  { path:'/',
   element:<Layout2/>,
   children:[
    {path:'login',
     element:<Login1/>},
    {path:'register',
     element:<Register/>},
    {path:'ForgotPassword',
     element:<ForgotPassword/>},
    {path:'Search',
     element:<Search/>},
     {path:'App1',
     element:<App1/>},
     {path:'Profile',
     element:<Profile/>},
     {path:'Navs',
     element:<Navs/>},
     {path:'AvatarCard',
     element:<AvatarCard/>},
     {path:'',
     element:<AvatarCard/>},
     {path:'Premium',
     element:<Premium/>},
     {path:'NewComm',
      element:<NewComm/>},
     {path:'AdminReport',
      element:<Admin/>},
    {path:'Content/:id',
      element:<BigContent/>},
    {path:'Community/:cname',
      element:<Community/>},
    {path:'Upload/:cname',
      element:<ContentUpload/>},
    {path:'MyPosts',
      element:<MyPosts/>},
    {path:'Saved',
      element:<Saved/>},
    {path:'MyCommunities',
      element:<BigMyComm/>}
      
   ]
   
 }
 
 
])
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>
    
)
/*import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  App()
);*/


