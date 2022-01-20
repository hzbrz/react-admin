import { Button, TextField } from "@material-ui/core";
import Layout from "../../components/Layout";
import { SyntheticEvent, useEffect, useState } from 'react';
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";


// the ProductForm component will be used both for creating and updating a product
const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // if the id is passed in props that means we are in the update form and we want to prefill the form
    if (id) {
    (
      async () => {
          const { data } = await axios.get(`products/${id}`)
          setTitle(data.title);
          setDescription(data.description);
          setImage(data.image);
          setPrice(data.price);
        }
      )();
    }
  }, [])

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      title,
      description,
      image,
      price
    };

    // on submit if there is id then we are updating else creating
    if (id)
      await axios.put(`products/${id}`, data)
    else
      await axios.post('products', data)

    setRedirect(true);
  }

  if (redirect)
    return <Navigate to='/products' />

  return (
    <Layout>
      <form onSubmit={submit}>
        <div className="mb-3">
          <TextField label="Title"
            value={title} onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField label="Description" rows={4} multiline
            value={description} onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField label="Image"
            value={image} onChange={e => setImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <TextField label="Price" type="number"
            value={price} onChange={e => setPrice(e.target.value)}
          />
        </div>
        <Button variant="contained" color="primary" type="submit">Submit</Button>
      </form>
    </Layout>
  );
}

export default ProductForm;