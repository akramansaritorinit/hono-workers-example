import { html } from "hono/html";
import { HtmlEscapedString } from "hono/utils/html";

export const Layout = (props: { children: HtmlEscapedString | HtmlEscapedString[] }) => html`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://unpkg.com/htmx.org@1.9.3"></script>
            <script src="https://unpkg.com/hyperscript.org@0.9.9"></script>
            <script src="https://cdn.tailwindcss.com"></script>
            <title>Hono App</title>
        </head>
        <body>
            <div class="p-5 flex justify-center items-center flex-col">
                <h1 class="text-4xl font-bold mb-4"><a href="/">Todo App</a></h1>
                ${props.children}
            </div>
        </body>
    </html>
`;
