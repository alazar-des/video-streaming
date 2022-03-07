const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const ffmpeg = require('fluent-ffmpeg')
const Video = require('../models/video')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', '/uploads/video'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
  fileFilter: function (req, res, file, cb) {
    const ext = path.extname(file.originalname)
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only mp4 is allowed'), false)
    }
    cb(null, true)
  }
})

const upload = multer({ storage: storage }).single('file')

const generateThumbnail = videoPath => {
  return new Promise(resolve => {
    let thumbnail = ''
    let duration = ''
    let success = false
    ffmpeg.ffprobe(videoPath, function (err, metadata) {
      if (err) {
        success = false
        console.log(err)
      } else {
        duration = metadata.format.duration
      }
    })

    ffmpeg(videoPath)
      .on('filenames', function (filenames) {
        thumbnail = 'uploads/thumbnail/' + filenames[0]
      })
      .on('end', function () {
        success = true
        resolve({
          success: success,
          thumbnailPath: thumbnail,
          duration: duration
        })
      })
      .screenshots({
        count: 1,
        folder: path.join(__dirname, '..', '..', '/uploads/thumbnail'),
        size: '320x240',
        filename: '%b.png'
      })
  })
}

router.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.log(err)
      return res.json({ success: false, err })
    }
    generateThumbnail(res.req.file.path)
      .then(resp => {
        const video = new Video({
          title: res.req.body.title,
          description: res.req.body.description,
          filePath: res.req.file.path,
          thumbnail: resp.thumbnailPath,
          duration: resp.duration
        })

        video.save((err, video) => {
          if (err) return res.status(400).json({ success: false, err })
          return res.json({ success: true })
        })
      })
  })
})

module.exports = router
