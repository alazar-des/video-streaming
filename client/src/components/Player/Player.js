import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import VideoCard from '../VidoCard/VidoCard';

export default function Player() {
    const { id } = useParams();
    const [video, setVideo] = useState({
        videoId: id,
        videoData: {}
    });

    const [state, setState] = useState({
            videos: []
    });

    useEffect(() => {
      axios.get('http://localhost:4000/videos')
        .then(resp => {
          if (resp.data.success) {
            setState({ videos: [...resp.data.videos] })
          } else {
            alert('Failed to get videos');
          }
        });
    }, [])


    return (
            <Container>
              <Row>
                <Col sm={8}>
                  <video controls autoPlay width="100%" height="calc(100vh-100px)">
                    <source src={`http://localhost:4000/video/${video.videoId}`} type="video/mp4"></source>
                  </video>
                  <h3>{ video.videoData.description }</h3>
                  <div className="video-metadata">
                    <span>12K views</span>
                      •
                    <span>1 week ago</span>
                  </div>
                </Col>
                <Col sm={2}>
                  <div className="videos">
                     <section className="video-section">
                       {state.videos.map(video =>
                         <article className="video-container" key={video._id}>
                           <a href={`/video/${video._id}`}>
                             <VideoCard
                               id={video._id}
                               title={video.title}
                               duration={video.duration}
                               thumbnail={video.thumbnail}
                             />
                           </a>
                        </article>
                      )}
                    </section>
                  </div>
                </Col>
              </Row>
            </Container>
    )
}
