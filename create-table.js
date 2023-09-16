import { sql } from './db.js'


/*
sql ` 
    DROP TABLE IF EXISTS video;`.then (() => {
        console.log('Table excluded')
    })
*/


//Função para criar tabela no banco de dados
sql ` 
    CREATE TABLE videos (
    id          TEXT PRIMARY KEY, 
    title       TEXT,
    description TEXT,
    duration    INTEGER

);
`.then (() => {
    console.log('Table created!')
})