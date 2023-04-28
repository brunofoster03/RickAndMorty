const app = require('../src/app');
const session = require('supertest');
const agent = session(app);
const users = require('../src/utils/users')

describe('Test de RUTAS', () => {
    describe('GET /rickandmorty/character/:id', () => {
        it('Responde con status: 200', async () => {
            await agent.get('/rickandmorty/character/1').expect(200)
        })
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image', async () => {
            const character = await agent.get('/rickandmorty/character/1')
            expect(character.body).toHaveProperty('id')
            expect(character.body).toHaveProperty('name')
            expect(character.body).toHaveProperty('species')
            expect(character.body).toHaveProperty('gender')
            expect(character.body).toHaveProperty('status')
            expect(character.body).toHaveProperty('origin')
            expect(character.body).toHaveProperty('image')
        })
        it('Si hay un error responde con status: 500', async () => {
            await agent.get('/rickandmorty/character/error').expect(500)
        })
    })
    describe('GET /rickandmorty/login', () => {
        it('Responde con acceso correcto', async () => {
            const access = await agent.get(`/rickandmorty/login?email=${users[0].email}&password=${users[0].password}`)
            expect(access.body.access).toBe(true)
        })
        it('Responde con acceso denegado', async () => {
            const access = await agent.get(`/rickandmorty/login?email=${'mail@fallo.com'}&password=${'incorrecta'}`)
            expect(access.body.access).toBe(false)
        })
    })
    describe('POST /rickandmorty/fav', () => {
        it('Debe devolver un arreglo', async () => {
            const newFavorite = {
                id: 1,
                name: 'Rick Sanchez',
                species: 'Human',
                gender: 'Male',
                status: 'Alive',
                origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
            }
            const post = await agent.post('/rickandmorty/fav').send(newFavorite)
            expect(post.body).toContainEqual(newFavorite)
        })
        it('Debe devolver un arreglo con todos los datos', async () => {
            const newFavorite2 = {
                id: 2,
                name: 'Morty Smith',
                species: 'Human',
                gender: 'Male',
                status: 'Alive',
                origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
                image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg'
            }
            const post = await agent.post('/rickandmorty/fav').send(newFavorite2)
            expect(post.body.length).toBe(2)
        })
    })
    describe('DELETE /rickandmorty/fav/:id', () => {
        it('Debe devolver los favoritos sin modificar', async () => {
            const favorites = await agent.get('/rickandmorty/fav')
            const deleteFav = await agent.delete('/rickandmorty/fav/999')
            const newFavorites = await agent.get('/rickandmorty/fav')
            expect(favorites.body).toEqual(newFavorites.body)
        })
        it('Debe eliminar el favorito', async () => {
            const deleteReq = await agent.delete(`/rickandmorty/fav/${'1'}`)
            expect(deleteReq.body.length).toBe(1)
        })
    })
})