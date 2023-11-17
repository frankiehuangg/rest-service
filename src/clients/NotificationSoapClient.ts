import SoapServiceCaller from "../utils/SoapServiceCaller";

export default class NotificationSoapClient {
    private SOAPServiceCaller: SoapServiceCaller;

    constructor() {
        const url = process.env.SOAP_URL + '/notifications?wsdl';
        this.SOAPServiceCaller = new SoapServiceCaller(url);
    }

    public async createNotification(userId: number, content: string) {
        const args = {
            arg0: userId,
            arg1: content
        };

        return await this.SOAPServiceCaller.call('createNotification', args);
    }

    public async getNotificationFromUserId(userId: number) {
        const args = {
            arg0: userId
        };

        return await this.SOAPServiceCaller.call('getNotificationFromUserId', args);
    }

    public async getAllNotifications() {
        return await this.SOAPServiceCaller.call('getAllNotifications');
    }
}