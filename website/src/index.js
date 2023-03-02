/// <reference types="@fastly/js-compute" />
import { includeBytes } from "fastly:experimental";

const index = includeBytes('./src/index.html');
const sidebar = includeBytes('./src/sidebar.html');
const content = includeBytes('./src/content.html');
addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
    const path = new URL(event.request.url).pathname;
    const headers = {
        "Content-Type": "text/html",
        "Surrogate-Control": `content="ESI/1.0"`,
    }
    switch (path) {
        case "/": return new Response(index, {headers});
        case "/_fragments/sidebar": return new Response(sidebar, {headers});
        case "/_fragments/content": return new Response(content, {headers});
        case "/index.html": return new Response(index, {headers});
        case "/_fragments/sidebar.html": return new Response(sidebar, {headers});
        case "/_fragments/content.html": return new Response(content, {headers});
    }
    return new Response('Not Found', {status:404})
};