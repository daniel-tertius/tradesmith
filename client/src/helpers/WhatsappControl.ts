import axios, { AxiosRequestConfig } from 'axios';

const url = "https://graph.facebook.com/v17.0/113854231813667/messages";

export default class WhatsappControl {
    private headers: any

    constructor(apiKey: string) {
        this.headers = {
            'Authorization': `Bearer EAADw0lZCsDxEBO7UUjBfacDEW81LxcEY2NVbslrqNy9KpLhQttTZAy48jRKqZA8KBv47NGkYg7GGwBUCPSfEgswmkDawNC0wWWJFF0erMct6ZCbzxNmyxH5bcD0pTV1LM1TMdu5JZC8IN8UyxEBUYyuw5XufGEKsSIUNZCfgb5GVngUnIl3bOkV3hyM6jccrZCdYbJQIPZAsJ7pOEOZCDRV1qMVhnIQZDZD`,
            "Content-Type": "application/json",
            "Business-ID": "130074153511740"
        }
    }

    async sendMessage(message: string) {
        const data = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: "27618348527",
            type: "text",
            text: {
                body: message
            }
        };
        const config = {
            method: 'post', url, data, headers: this.headers,
        };

        try {
            const response = await axios(config);
            console.log('Response:', response.data);
        } catch (error: any) {
            if (error.response) {
                console.error('Error Response:', error.response.data);
            } else {
                console.error('Error:', error.message);
            }
        }
    }
}