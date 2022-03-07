const mongoose = require('mongoose')

const videoSchema = new mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  filePath: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  duration: {
    type: String
  },
  thumbnail: {
    type: String
  }
}, { timestamps: true })

const Video = mongoose.model('Video', videoSchema)

module.exports = Video
