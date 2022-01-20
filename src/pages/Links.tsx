import { Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Link } from '../models/link';

const Links = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState(0);
  const perPage = 10;
  const { id } = useParams();

  useEffect(() => {
    (
      async () => {
        const { data } = await axios.get(`users/${id}/links`);
        setLinks(data);
        // console.log(`localhost:8000/api/admin/users/${id}/links`);
        // console.log(data);
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
            <TableCell scope="col">Code</TableCell>
            <TableCell scope="col">Total Orders</TableCell>
            <TableCell scope="col">Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* mapping sliced users array (10 users) and showing each user */}
          {links.slice(page*perPage, (page+1)*perPage).map(link => {
            return (
              <TableRow key={link.id}>
                <TableCell>{link.id}</TableCell>
                <TableCell>{link.code}</TableCell>
                <TableCell>{link.orders.length}</TableCell>
                <TableCell>{link.orders.reduce((s, o) => s + o.total, 0)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={links.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={perPage}
              rowsPerPageOptions={[]}   // so we do not see the dropdown to change rows per page
            />            
          </TableRow>
        </TableFooter>
      </Table>
    </Layout>
  );
}

export default Links;