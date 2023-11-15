import SoapServiceCaller from "../utils/SoapServiceCaller";

class SoapClient {
    private SOAPServiceCaller: SoapServiceCaller;

    constructor(url: string) {
        this.SOAPServiceCaller = new SoapServiceCaller(url);
    }

    
}