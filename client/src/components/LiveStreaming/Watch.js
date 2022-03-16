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
	const peer = new RTCPeerConnection(config);
	peer.addTransceiver('video', { direction: 'recvonly' });
	peer.ontrack = e => streamVideo.current.srcObject = e.streams[0];
	peer.onnegotiationneeded = () => handleNegotiationNeeded(peer);
    }, []);

    async function handleNegotiationNeeded(peer) {
	const offer = await peer.createOffer();
	await peer.setLocalDescription(offer);
	const res = await axios.post('http://localhost:4000/watch', { sdp: peer.localDescription });
	const desc = new RTCSessionDescription(res.data.sdp);
	peer.setRemoteDescription(desc);
    }

    return (
	    <video autoPlay ref={streamVideo} />
    );
}
