const express = require('express')
const router = express.Router()
const wrtc = require('wrtc')

let broadcasterStream;

const config = {
    iceServers: [
	{
	    urls: "stun:stun.l.google.com:19302"
	}
    ]
}

router.post('/broadcast', async (req, res) => {
    const peer = new wrtc.RTCPeerConnection(config);
    peer.ontrack = e => broadcasterStream = e.streams[0];
    const desc = new wrtc.RTCSessionDescription(req.body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    res.json({ sdp: peer.localDescription });
});

router.post('/watch', async (req, res) => {
    const peer = new wrtc.RTCPeerConnection(config);
    broadcasterStream.getTracks().forEach(track => peer.addTrack(track, broadcasterStream));
    const desc = new wrtc.RTCSessionDescription(req.body.sdp);
    await peer.setRemoteDescription(desc);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    res.json({ sdp: peer.localDescription });
});

module.exports = router;
