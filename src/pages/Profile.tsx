import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { Dispatch, SyntheticEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../components/Layout";
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";

const Profile = (props: any) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');

  useEffect(() => {
      // prefilling data by getting the user
      setFirstName(props.user.first_name);
      setLastName(props.user.last_name);
      setEmail(props.user.email);
  }, 
  // this optional param is for 'dependancy' upon which value/state the component will update 
  // this is the same as componentDidUpdate(props.user)... so everytime props.user changes through infoSubmit
  // the useEffect gets called and we see the changes immediately
  [props.user]);

  const infoSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { data } = await axios.put('users/info', {
      first_name,
      last_name,
      email
    });

    // dispatch an event after we update the user and update the redux store state with the updated user
    props.setUser(data);
  }

  const passwordSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await axios.put('users/password', {
      password,
      password_confirm
    })
  }

  return (
    <Layout>
      <h3>Account Information</h3>
      <form onSubmit={infoSubmit}>
        <div className="mb-3">
          <TextField label="First Name"
            value={first_name} onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField label="Last Name"
            value={last_name} onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField label="Email"
            value={email} onChange={e => setEmail(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
      <br/>
      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={passwordSubmit}>
        <div className="mb-3">
          <TextField label="Password" type="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField label="Password Confirm" type="password"
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </Layout>
  );
}

// mapping the state from the redux store that we set in Layout using dispatch to props in this component
const mapStateToProps = (state: { user: User }) => ({
  user: state.user
})

// using this to dispatch the action and update the user / store updated state to redux store
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);