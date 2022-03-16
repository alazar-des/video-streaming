import React, { useEffect, useRef } from 'react';
import axios from 'axios';

export default function Broadcast() {
    const streamVideo = useRef();

    const config = {
	iceServers: [
	    {
		urls: "stun:stun.l.google.com:19302"
	    }
	]
    }

    useEffect(() => {
	navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
	    streamVideo.current.srcObject = stream;
	    const peer = new RTCPeerConnection(config);
	    peer.onnegotiationneeded = () => handleNegotiationNeeded(peer);
	    stream.getTracks().forEach(track => peer.addTrack(track, stream));
	})
    }, []);

    async function handleNegotiationNeeded(peer) {
	const offer = await peer.createOffer();
	await peer.setLocalDescription(offer);
	const res = await axios.post('http://localhost:4000/broadcast', { sdp: peer.localDescription });
	const desc = new RTCSessionDescription(res.data.sdp);
	peer.setRemoteDescription(desc);
    }

    return (
	    <video autoPlay ref={streamVideo} />
    );
}
