const express = require('express')
const fs = require('fs')
const Video = require('../models/video')

const router = express.Router()

router.get('/videos', (req, res) => {
  Video.find()
    .populate('writer')
    .exec((err, videos) => {
      if (err) return res.status(400).send(err)
      res.status(200).json({ success: true, videos })
    })
})

const streamVideo = (req, res, path) => {
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, '').split('-')
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize - 1
    const chunksize = (end - start) + 1
    const file = fs.createReadStream(path, { start, end })
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4'
    }
    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4'
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
}

router.get('/video/:id', (req, res) => {
  Video.findById({ _id: req.params.id })
    .populate('writer')
    .exec((err, video) => {
      if (err) {
        console.log(err)
        return res.status(400).send(err)
      }
      streamVideo(req, res, video.filePath)
    })
})

router.get('video/data/:id', (req, res) => {
  Video.findById({ _id: req.params.id })
    .populate('writer')
    .exec((err, video) => {
      if (err) {
        console.log(err)
        return res.status(400).send(err)
      }
      video.update({ $inc: { views: 1 } }, { new: true }, (err, res) => {
        if (err) {
          console.log(err)
        }
      })
      res.status(200).json({ success: true, video })
    })
})

module.exports = router
