import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell scope="col">#</TableCell>
            <TableCell scope="col">Name</TableCell>
            <TableCell scope="col">Email</TableCell>
            <TableCell scope="col">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* mapping users array and showing each user */}
          {users.map(user => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.first_name} {user.last_name}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Layout>
  );
}

export default Users;