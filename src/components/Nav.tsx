// tsx is the typescript extension for jsx files
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../models/user';

// accepts user from Layout as props as User (or null) 
const Nav = (props: { user: User | null }) => {

  const logout = async () => {
    await axios.post('logout')
  }

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>
      <ul className="my-2 my-md-0 mr-md-3">
        <Link to={'/profile'}
          // since the user can be null thus the '?'
          className="p-2 text-white text-decoration-none">{props.user?.first_name} {props.user?.last_name}</Link>
        <Link to={'/login'} className="p-2 text-white text-decoration-none"
          onClick={async () => await axios.post('logout')}
        >Sign out</Link>
      </ul>
    </header>
  );
}

const mapStateToProps = (state: { user: User }) => ({
  user: state.user
})

// getting the user state from redux using connect
export default connect(mapStateToProps)(Nav);