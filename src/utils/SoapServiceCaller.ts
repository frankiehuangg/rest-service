import axios from "axios";
import converter from 'xml-js';

type Header = {
    [key : string] : string | undefined
};

class SoapServiceCaller {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    public async call(method: string, params?: Object) {
        const headers : Header = {
            'Content-Type' : 'text/xml;charset=UTF-8',
            SOAPAction: '#POST',
            'api-key' : process.env.SOAP_API_KEY
        };

        console.log(headers);

        const xml = this.buildXMLRequest(method, params);
        const response = await axios.post(this.url, xml, {headers});
        const data = response.data;

        return this.parseXML(data, method);
    }

    private parseXML(xml: string, method: string) {
        const json = JSON.parse(converter.xml2json(xml, { compact: true, spaces: 4}));
        const returnVal = json['S:Envelope']['S:Body']['ns2:' + method + 'Response']['return'];

        if (!returnVal) {
            return null;
        }

        return this.buildResponseJSON(returnVal);
    }

    private buildResponseJSON(json: JSON) {
        if (Array.isArray(json)) {
            return json.map((item) => this.flatten(item));
        }

        return [this.flatten(json)];
    }

    private flatten(json: JSON): JSON {
        const response: any = {};

        Object.keys(json).forEach((key) => {
            const value = json[key as keyof typeof json];
            response[key] = value;
        });

        return response;
    }

    private buildXMLRequest(method: string, params?: Object) {
        const strParams = this.buildXMLParams(params);

        const xml = `
        <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
            <Body>
                <${method} xmlns="http://ws/">
                ${strParams}
                </${method}>
            </Body>
        </Envelope>
        `;

        return xml;
    }

    private buildXMLParams(params?: Object) {
        if (!params) {
            return '';
        }

        const keyValue = Object.keys(params).map((key) => {
            return `<${key} xmlns="">${params[key as keyof typeof params]}</${key}>`;
        });

        return keyValue.join('');
    }
}

export default SoapServiceCaller;