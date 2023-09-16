// Principais Métodos HTTP: GET, POST, PUT, DELETE

//import { dataBaseMemory } from './database-memory.js' importação da base de dados em memória
import { fastify } from 'fastify'
import { dataBasePostgress } from './database-postgres.js'
import { request } from 'http'

const server = fastify() //Criação do servidor

//const dataBase = new dataBaseMemory() instanciação da base de dados em memória

const dataBase = new dataBasePostgress()

//http://localhost:3333/videos

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await dataBase.create({
        title: title,
        description: description,
        duration: duration
    })

    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    console.log(search)

    const videos = await dataBase.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => { // id, neste contexto, serve como um route parameter, que é um identificador único do vídeo que se deseja alterar
    const videoID = request.params.id
    const { title, description, duration } = request.body
    
    await dataBase.update(videoID, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => { // id, neste contexto, serve como um route parameter, que é um identificador único do vídeo que se deseja deletar
    const videoID = request.params.id

    await dataBase.delete(videoID)

    return reply.status(204).send()
})

server.listen({ // Porta onde a aplicação está rodando
    port: process.env.PORT ?? 3333,    
})