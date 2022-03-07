import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'
import './VidoCard.css';


export default function VidoCard({ duration, title, thumbnail, views, createdAt }) {
  let mins = Math.floor(duration / 60);
  let secs = Math.floor(duration - mins * 60);
  let durtion = `${mins}:${secs}`;

  return (
    <>
      <div className="thumbnail" data-duration={durtion}>
        <img className="thumbnail-img"
          src={`http://localhost:4000/${thumbnail}`} alt={title} />
      </div>
      <div className="video-bottom-section">
        <div className="video-details">
          <p className="video-title">{title}</p>
          <p className="video-channel-name">Name</p>
          <div className="video-metadata">
            <span>{views} views </span>
               •
            <span> {moment(createdAt).format("MMM Do YY")}</span>
          </div>
        </div>
      </div>
    </>
  )
}

VidoCard.propTypes = {
  duration: PropTypes.string,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  views: PropTypes.number,
  createdAt: PropTypes.string
};
