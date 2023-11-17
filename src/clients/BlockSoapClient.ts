import SoapServiceCaller from "../utils/SoapServiceCaller";

export default class BlockSoapClient {
    private SOAPServiceCaller: SoapServiceCaller;

    constructor() {
        const url = process.env.SOAP_URL + '/blocks?wsdl';
        this.SOAPServiceCaller = new SoapServiceCaller(url);
    }

    public async createBlock(blockingUserId: number, blockerUserId: number) {
        const args = {
            arg0: blockingUserId,
            arg1: blockerUserId
        };

        return await this.SOAPServiceCaller.call('createBlock', args);
    }

    public async deleteBlock(blockingUserId: number, blockerUserId: number) {
        const args = {
            arg0: blockingUserId,
            arg1: blockerUserId
        };

        return await this.SOAPServiceCaller.call('deleteBlock', args);
    }

    public async getBlockFromBlockedUserId(blockerUserId: number) {
        const args = {
            arg0: blockerUserId
        };

        return await this.SOAPServiceCaller.call('getBlockFromBlockedUserId', args);
    }

    public async getBlockFromBlockingUserId(blockingUserId: number) {
        const args = {
            arg0: blockingUserId
        };

        return await this.SOAPServiceCaller.call('getBlockFromBlockingUserId', args);
    }

    public async checkUserBlocking(blockingUserId: number, blockerUserId: number) {
        const args = {
            arg0: blockingUserId,
            arg1: blockerUserId
        };

        return await this.SOAPServiceCaller.call('checkUserBlocking', args);
    }
}