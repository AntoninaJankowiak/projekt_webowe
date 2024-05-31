const sqlite3 = require('sqlite3').verbose()
const { app } = require('./index.js')
const test = require("node:test")
const {describe} = require("node:test")
const {request} = require("http")
const {query_getTypeAttacks} = require("./queries.js")
const { beforeAll, afterAll, jest} = require('jest');

const db = new sqlite3.Database(':memory:')

const mockRow = { pokeId: 1 }

jest.mock('sqlite3', () => ({
    verbose: () => ({
        Database: jest.fn().mockImplementation(() => ({
            get: jest.fn().mockImplementation((query, callback) => callback(null, mockRow))
        }))
    })
}))

describe('GET /pokemon/:name', () => {
    let server

    beforeAll(() => {
        server = app.listen(3000)
    })

    afterAll((done) => {
        server.close(() => {
            db.close(done)
        })
    })

    test('responds with json containing the requested pokemon name and id', (done) => {
        request(server)
            .get('/pokemon/bulbasaur')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toEqual({ name: 'bulbasaur', pokemonId: 1 })
                done()
            })
    })
})


describe('query_getTypeAttacks', () => {
    let db

    beforeAll(() => {
        db = new sqlite3.Database(':memory:');
    })

    test('returns 18 rows when called with id and 1 type', (done) => {
        const id = 4
        const types = 1
        const query = query_getTypeAttacks(id, types)

        db.all(query, (err, rows) => {
            expect(err).toBeNull()
            expect(rows).toHaveLength(18)
            done()
        })
    })

    test('returns 18 rows when called with id and 2 types', (done) => {
        const id = 1
        const types = 2
        const query = query_getTypeAttacks(id, types)

        db.all(query, (err, rows) => {
            expect(err).toBeNull()
            expect(rows).toHaveLength(18)
            done()
        })
    })
})