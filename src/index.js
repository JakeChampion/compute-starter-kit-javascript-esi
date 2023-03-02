/// <reference types="@fastly/js-compute" />

import esi from "cloudflare-esi"

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

const customFetcher = async function (request) {
    return fetch(request, {
        backend: 'esi-backend'
    });
}

async function handleRequest(event) {
    const parser = new esi({allowSurrogateDelegation:true}, undefined, customFetcher)
    return parser.parse(new Request('https://esi-backend.edgecompute.app'))
};