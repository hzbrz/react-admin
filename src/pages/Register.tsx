import { Component, SyntheticEvent } from 'react';
import '../Login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// most of the components in our app will be functional. This class component is to show that I can also do class
class Register extends Component {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  passwordConfirm = '';

  // this will be used to redirect login based on state
  state = {
    redirect: false
  }
  
  // this submit function will have an event inside of type SyntheticEvent from ts
  submit = async (e: SyntheticEvent) => {
    e.preventDefault(); // so our page does not refresh on submit and we can do api req
    
    // request to node-ambassador api to register the user
    await axios.post('register', {
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      password: this.password,
      password_confirm: this.passwordConfirm
    });

    // once registered redirect to login
    this.setState({
      redirect: true
    })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to='/login' />
    }

    return (
      <form className="form-signin" onSubmit={this.submit}>
        <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
        
        <label className="sr-only">First Name</label>
        <input className="form-control" placeholder="First Name" required autoFocus
          onChange={ e => this.firstName = e.target.value }/>

        <label className="sr-only">Last Name</label>
        <input className="form-control" placeholder="Last Name" required 
          onChange={ e => this.lastName = e.target.value }/>
        
        <label className="sr-only">Email address</label>
        <input type="email" className="form-control" placeholder="Email address" required 
          onChange={ e => this.email = e.target.value }/>
        
        <label className="sr-only">Password</label>
        <input type="password" className="form-control" placeholder="Password" required 
          onChange={ e => this.password = e.target.value }/>

        <label className="sr-only">Password</label>
        <input type="password" className="form-control" placeholder="Password Confirm" required 
          onChange={ e => this.passwordConfirm = e.target.value }/>
        
        <button className="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
      </form>
    );
  }
}

export default Register;