import { BaseManager } from './BaseManager'
import { WSClient } from '../lib/WSClient'

export class NetManager extends BaseManager {
    constructor() {
        super()
        this._client = new WSClient()
    }
}