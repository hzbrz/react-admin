import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { User } from '../models/user';

const Users = () => {

  // have to define the type of the useState array
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (
      async () => {
        // getting all the ambassador users from the api
        const {data} = await axios.get('ambassadors');
        // setting the state of the array and populating with the ambassadors
        setUsers(data);
      }
    )()
  }, []);

  return (
    // everything inside Layout will get passed as child props
    <Layout> 
      <table className="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* mapping users array and showing each user */}
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name} {user.last_name}</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Layout>
  );
}

export default Users;