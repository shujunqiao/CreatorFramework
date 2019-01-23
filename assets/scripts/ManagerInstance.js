import { NetManager } from './manager/NetManager'

export class ManagerInstance {
    constructor() {
        this._net = new NetManager()
    }

    getNet() {
        return this._net
    }
}