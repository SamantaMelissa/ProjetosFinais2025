import React, { useState, useRef } from "react";
import './GravadorAudio.css'



export default function GravadorAudio({ onAudioReady }) {
    const [gravando, setGravando] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioBlobsRef = useRef([]);

    async function iniciarGravacao() {
        audioBlobsRef.current = [];

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        const mediaRecorder = new MediaRecorder(stream, {
            mimeType: "audio/webm"
        });

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                audioBlobsRef.current.push(e.data);
            }
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioBlobsRef.current, { type: "audio/webm" });

            const wavBlob = await converterWebmParaWav(audioBlob);

            onAudioReady(wavBlob);
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setGravando(true);
    }

    function pararGravacao() {
        mediaRecorderRef.current.stop();
        setGravando(false);
    }

    return (
        <div style={{ marginBottom: "10px" }}>
            {!gravando ? (
                <button type="button" onClick={iniciarGravacao}>
                    🎙️ Iniciar Gravação
                </button>
            ) : (
                <button type="button" onClick={pararGravacao}>
                    ⏹️ Parar Gravação
                </button>
            )}
        </div>
    );
}

// ------------------ CONVERSOR PARA WAV ------------------

async function converterWebmParaWav(blob) {
    const arrayBuffer = await blob.arrayBuffer();

    const audioCtx = new AudioContext({ sampleRate: 16000 });
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

    const offlineCtx = new OfflineAudioContext(
        1,
        audioBuffer.duration * 16000,
        16000
    );

    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineCtx.destination);
    source.start(0);

    const rendered = await offlineCtx.startRendering();

    return bufferToWave(rendered, rendered.length);
}

function bufferToWave(abuffer, len) {
    const numOfChan = abuffer.numberOfChannels;
    const length = len * 2 + 44;
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    const sampleRate = abuffer.sampleRate;
    let pos = 0;

    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }
    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }

    setUint32(0x46464952);
    setUint32(length - 8);
    setUint32(0x45564157);

    setUint32(0x20746d66);
    setUint32(16);
    setUint16(1);
    setUint16(1);
    setUint32(sampleRate);
    setUint32(sampleRate * 2);
    setUint16(2);
    setUint16(16);

    setUint32(0x61746164);
    setUint32(length - pos - 4);

    const channelData = abuffer.getChannelData(0);

    for (let i = 0; i < channelData.length; i++, pos += 2) {
        let s = Math.max(-1, Math.min(1, channelData[i]));
        s = s < 0 ? s * 0x8000 : s * 0x7fff;
        view.setInt16(pos, s, true);
    }

    return new Blob([buffer], { type: "audio/wav" });
}
