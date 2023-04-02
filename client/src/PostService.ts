import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';

export default class PostService {
    // Get Posts
    static async getPosts() {
        try {
            const res = await axios.get(url);

            const data = res.data;

            return data.map((post: any) => ({
                ...post,
                created_at: new Date(post.created_at)
            }));
        } catch (error: unknown) {
            return console.error(`Error in getPosts: ${error instanceof Error ? error.message : error}`);
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