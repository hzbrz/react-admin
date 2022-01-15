import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../models/user';
import Menu from './Menu';
import Nav from './Nav';

// this is a component that will wrap a lot of other components and the 
// useEffect will check if the user is authenticated
const Layout = (props: any) => {

  const [redirect, setRediredct] = useState(false);
  // turning this into a generic as per typesrcipt
  const [user, setUser] = useState<User | null>(null);

  // this is the same as componenetDidMount() and componentDidUpdate() in a class component
    //Effect Hook lets you perform side effects in function components 
      // Data fetching, setting up a subscription, and manually changing the DOM in React components
      // are all examples of side effects. 
  useEffect(() => {
    (
      // this is how to do an async function call inside useEffect hook
      async () => {
        try {
          // we are getting the authenticated user
          const response = await axios.get('user')  // 'http://localhost:8000/api/admin/user'

          setUser(response.data);
          // console.log(response.data);
        } catch (error) {
          // if the user is not authenticated redirect to login
          setRediredct(true);
        }
      }
    )();
  },
    // passing an empty array wont call useEffect everytime the component re-renders
    [])

  if (redirect)
    return <Navigate to='/login' />

  return (
    <div>
      <Nav user={user}/>
      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="table-responsive">
              {props.children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;