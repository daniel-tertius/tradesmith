import axios from 'axios';

const url = 'https://mm6hbsote0.execute-api.eu-west-2.amazonaws.com/development';

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
            const res = await axios.get(url);
            console.log("res", !!res);

            const data = res.data.map((post: any) => ({
                created_at: new Date(post.created_at),
                ...post
            }));
            console.log("Data", data);

            return data.length ? data[0] : null;
        } catch (error: unknown) {
            return console.error(`Error in getFirstPost: ${error instanceof Error ? error.message : error}`);
        }
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