import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { Layout } from "./components/Layout";
import { AddTodoForm, Item, TodosList } from "./components/Todos";

type Bindings = {
    DB: D1Database;
};

type Todo = {
    id: number;
    name: string;
    completed: boolean;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", async (c) => {
    const { results } = await c.env.DB.prepare(`SELECT * FROM todos;`).all<Todo>();
    const todos: Todo[] = results;
    return c.html(
        <Layout>
            <AddTodoForm />
            <TodosList todos={todos} />
            <div id="todo"></div>
        </Layout>
    );
});

app.post(
    "/todo",
    zValidator(
        "form",
        z.object({
            name: z.string().min(1),
        })
    ),
    async (c) => {
        const { name } = c.req.valid("form");
        const { meta } = await c.env.DB.prepare(`INSERT INTO todos(name) VALUES(?);`).bind(name).run();
        return c.html(<Item id={meta.last_row_id} name={name} completed={false} />);
    }
);

app.put("/todo/:id", async (c) => {
    const { id } = c.req.param();
    const { results } = await c.env.DB.prepare(`SELECT * FROM todos WHERE id = ?;`).bind(id).all<Todo>();
    console.log(results[0].completed);
    await c.env.DB.prepare(`UPDATE todos SET completed = ? WHERE id = ?;`)
        .bind(results[0].completed ? 0 : 1, id)
        .run();
    c.status(200);
    return c.body(null);
});

app.delete("/todo/:id", async (c) => {
    const id = c.req.param("id");
    await c.env.DB.prepare(`DELETE FROM todos WHERE id = ?;`).bind(id).run();
    c.status(200);
    return c.body(null);
});

export default app;
