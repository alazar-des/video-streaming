import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import VideoCard from '../VidoCard/VidoCard'
import axios from 'axios'

export default function Home () {
  const [state, setState] = useState({
    videos: []
  })

  useEffect(() => {
    axios.get('http://localhost:4000/videos')
      .then(resp => {
        if (resp.data.success) {
          setState({ videos: [...resp.data.videos] })
        }
      })
  }, [])

  return (
    <div className='videos'>
      <section className='video-section'>
        {state.videos.map(video =>
          <article className='video-container' key={video._id}>
            <Link to={`/video/${video._id}`}>
              <VideoCard
                id={video._id}
                title={video.title}
                duration={video.duration}
                thumbnail={video.thumbnail}
                views={video.views}
                createdAt={video.createdAt}
              />
            </Link>
          </article>
        )}
      </section>
    </div>
  )
}
