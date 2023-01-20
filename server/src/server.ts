import cors from '@fastify/cors'
import Fastify, { fastify } from "fastify";
import { appRoutes } from './routes';

const app = Fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
  port: 3333,
}).then(()=> {
  console.log("HTTP Server Running!⚡ on http://localhost:3333")
}) 