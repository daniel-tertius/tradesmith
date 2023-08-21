// TODO: This will be depricated soon

import axios from 'axios';

const url = 'https://mm6hbsote0.execute-api.eu-west-2.amazonaws.com/development/config';

export default class PostService {
    // Get Posts
    static async getPosts() {
        try {
            const res = await axios.get(url);

            const data = res.data;

            return data.map((post: any) => ({
                created_at: new Date(post.created_at),
                ...post
            }));
        } catch (error: unknown) {
            return console.error(`Error in getPosts: ${error instanceof Error ? error.message : error}`);
        }
    }

    static async getFirstPost() {
        try {

            // axios({
            //     method: 'OPTIONS',
            //     url: 'https://mm6hbsote0.execute-api.eu-west-2.amazonaws.com/development/config',
            //     headers: {
            //         "Access-Control-Allow-Headers": "Access-Control-Allow-Origin",
            //         "Access-Control-Allow-Methods": "GET",
            //         "Access-Control-Allow-Origin": "*"
            //     }
            // });
            const res = await axios.get(url, {
                headers: {
                    'Access-Control-Allow-Origin': "*",
                }
            });

            const data = res.data.configs[0];
            console.log("Data", data);

            return data;
        } catch (error: unknown) {
            console.error(`Error in getFirstPost: ${JSON.stringify(error, null, 2)}`);
            return null;
        }
    }

    static async savePost(updated_data: { _id?: string | null, bot_name: string, target_profit: string, base_order_size: string }) {
        if (!updated_data) return;
        if (updated_data._id == null) delete updated_data._id;
        
        return axios.post(url, updated_data);
    }

    // Create Posts
    static insertPost(new_config: config_type) {
        return axios.post(url, new_config);
    }

    // Delete Posts.
    static deletePost(id: string) {
        return axios.delete(`${url}${id}`);
    }
}

type config_type = {
    minutes_interval_loop: number,
    buying_levels: number,
    buy_at: number,
    sell_at: number,
    max_buys: number,
    zar_bid_amount: number,
    sell_percentage: number,
    buy_percentage: number,
}