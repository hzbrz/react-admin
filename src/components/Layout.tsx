import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Menu from './Menu';
import Nav from './Nav';

// this is a component that will wrap a lot of other components and the 
// useEffect will check if the user is authenticated
const Layout = (props: any) => {

  const [redirect, setRediredct] = useState(false);

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

          console.log(response.data);
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
      <Nav />
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