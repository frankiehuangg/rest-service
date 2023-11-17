import SoapServiceCaller from "../utils/SoapServiceCaller";

export default class FollowSoapClient {
    private SOAPServiceCaller: SoapServiceCaller;

    constructor() {
        const url = process.env.SOAP_URL + '/follows?wsdl';
        this.SOAPServiceCaller = new SoapServiceCaller(url);
    }

    public async createFollow(followingUserId: number, followerUserId: number) {
        const args = {
            arg0: followingUserId,
            arg1: followerUserId
        };

        return await this.SOAPServiceCaller.call('createFollow', args);
    }

    public async deleteFollow(followingUserId: number, followerUserId: number) {
        const args = {
            arg0: followingUserId,
            arg1: followerUserId
        };

        return await this.SOAPServiceCaller.call('deleteFollow', args);
    }    

    public async getFollowFromFollowedUserId(followerUserId: number) {
        const args = {
            arg0: followerUserId
        };

        return await this.SOAPServiceCaller.call('getFollowFromFollowedUserId', args);
    }

    public async getFollowFromFollowingUserId(followingUserId: number) {
        const args = {
            arg0: followingUserId
        };

        return await this.SOAPServiceCaller.call('getFollowFromFollowingUserId', args);
    }

    public async checkUserFollowing(followingUserId: number, followerUserId: number) {
        const args = {
            arg0: followingUserId,
            arg1: followerUserId
        };

        return await this.SOAPServiceCaller.call('checkUserFollowing', args);
    }
}