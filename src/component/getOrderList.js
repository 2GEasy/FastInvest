const request = require('request')
import {uuid as uuidv4} from 'uuid';
const crypto = require('crypto')
const sign = require('jsonwebtoken').sign
const queryEncode = require("querystring").encode
const access_key = 'lX0ZwGsXvXg74b2RcFt94dCdyW6zmbI5HBz3y0za';
const secret_key = '8Hr8Pzn8OXIjHWx5E27A6GR7eKb3uxi6LCHOTbou';
const server_url = 'https://api.upbit.com';

const state = 'done'
const uuids = [
    '9ca023a5-851b-4fec-9f0a-48cd83c2eaae',
    //...
]

const non_array_body = {
    state: state,
}
const array_body = {
    uuids: uuids,
}
const body = {
    ...non_array_body,
    ...array_body
}

const uuid_query = uuids.map(uuid => `uuids[]=${uuid}`).join('&')
const query = queryEncode(non_array_body) + '&' + uuid_query

const hash = crypto.createHash('sha512')
const queryHash = hash.update(query, 'utf-8').digest('hex')

const payload = {
    access_key: access_key,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: 'SHA512',
}

const token = sign(payload, secret_key)

const options = {
    method: "GET",
    url: server_url + "/v1/orders?" + query,
    headers: {Authorization: `Bearer ${token}`},
    json: body
}

request(options, (error, response, body) => {
    if (error) throw new Error(error)
    console.log(body)
})