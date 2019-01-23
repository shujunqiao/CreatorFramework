export class WSClient {
    constructor() {

    }

    setUrl(url) {
        this._url = url
        tryConnect()
    }

    tryConnect() {
        this._ws = new WebSocket(this._url)
        this._ws.binaryType = 'arraybuffer';
        this._ws.onopen = event => console.log(event);
        this._ws.onmessage = event => console.log(event);
        this._ws.onerror = event => console.log(event);
        this._ws.onclose = event => console.log(event);
    }

    send(data) {
        if (!this._ws) {
            return
        }
        this._ws.send(data)

        // WebSocket.CONNECTING
        // WebSocket.OPEN
    }

    encodeBinaryStream(msgID, buffer) {
        let streamBuffer = new ArrayBuffer(buffer.length + 6)
        let view = new DataView(streamBuffer)
        view.setUint32(0, 0, false)
        view.setUint16(4, msgID, false)
        for (let i = 0; i < buffer.length; i++) {
            view.setUint8(6 + i, buffer[i])
        }
        return streamBuffer
    }

    decodeBinaryStream(streamBuffer) {
        let view = new DataView(streamBuffer)
        let msgID = view.getUint16(4, false)
        let buffer = new Uint8Array(buffer, 6, buffer.byteLength - 6)
        return { msgID, buffer }
    }
}