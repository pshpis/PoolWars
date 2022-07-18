const needle = require('needle');

import {TwitterConfig} from "../../../config/TwitterConfig";

// this is the ID for @TwitterDev
const userId = 1513266211349577742;
const url = `https://api.twitter.com/2/users/${userId}/followers`;
const bearerToken = TwitterConfig.bearer_token;

export const isSubscriber = async ({username}) => {
    let users = [];
    let params = {
        "max_results": 1
    }

    const options = {
        headers: {
            "User-Agent": "v2FollowersJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }
w
    let hasNextPage = true;
    let nextToken = null;
    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            if (resp.data) {
                if (username == resp.data.username)
                    return true;
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }

    return false;
}

const getPage = async (params, options, nextToken) => {
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {

            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}