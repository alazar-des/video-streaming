import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card } from "react-bootstrap"
import Login from '../Login/Login';
import useToken from '../App/useToken';

export default function VideoUpload() {
  const [file, setFile] = useState('');
  const [message, setMessage] = useState('');
  //const [uploadPercentage, setUploadPercentage] = useState(0);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const { token, setToken } = useToken();

  const onChange = e => {
    setFile(e.target.files[0]);
  }

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const res = await axios({
                               method: 'post',
                               url: 'http://localhost:4000/user/upload',
                               data: formData,
                               header: {
                                 'Content-Type': 'mulipart/form-data'
                               },
                               params: { secret_token: token.token },
      });
        console.log(res);
        setMessage('File Uploaded');
      } catch(err) {
        if (err.response.status === 500) {
          setMessage('There was a problem with the serve');
         } else {
           setMessage(err.response.data.msg);
         }
      }
    }


    return (token ?
      (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Upload Video</h2>
                {message ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {message}
                </div> : null}
                <form onSubmit={onSubmit}>
                   <div className="input-group mb-3">
                     <input type="file" className="form-control" id="inputGroupFile02" onChange={onChange} />
                   </div>

                   <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input type="text" className="form-control"
                        id="title" placeholder="Title" onChange={e => setTitle(e.target.value)}/>
                   </div>
                   <div className="mb-3">
                     <label htmlFor="description" className="form-label">Description</label>
                     <textarea type="text" className="form-control"
                       id="discription" placeholder="Description" rows="3" onChange={e => setDescription(e.target.value)}/>
                   </div>
                   <input type='submit' value='Upload' className='btn btn-primary w-100' />
                </form>
             </Card.Body>
           </Card>
         </div>
       </Container>
     ) : (
       <Login setToken={setToken} />
     )
   )
}
