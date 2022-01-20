import axios from 'axios';
import { Dispatch, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../models/user';
import Menu from './Menu';
import Nav from './Nav';
import { connect } from 'react-redux';
import { setUser } from '../redux/actions/setUserAction';

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

          // props has access to the 2 mapState... funcs and here I am using the mapDispatchToProps' setUser
          // function to emit the user to other components 
          props.setUser(response.data);

        } catch (error) {
          // if the user is not authenticated redirect to login
          setRediredct(true);
        }
      }
    )();
  },
    // passing an empty array so the function inside will only be called once onComponentDidMount()
    [])

  if (redirect)
    return <Navigate to='/login' />

  return (
    <div>
      {/* will use redux to pass the state as props to Nav through mapStateToProps */}
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

// we are getting an user from other components as state and we will just return it as props
const mapStateToProps = (state: { user: User }) => ({
  user: state.user
})

// we dispatch a function called setUser which dispatches the setUser action in redux
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user))
})

// connecting this component with redux
  // connect() takes two callbacks. 
    // 1.mapStateToProps: wants to map the events from other components and handle within the function, this 
        // function will mainly modify or set the state in the redux store to be used by other components
    // 2.mapDispatchToProps: dispatch and event to other components
export default connect(mapStateToProps, mapDispatchToProps)(Layout);