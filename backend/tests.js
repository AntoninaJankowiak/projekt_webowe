import assert from 'assert'
import sqlite3 from 'sqlite3'
import { query_getTypeAttacks, query_getTypeDefenses } from './queries.js'
import { describe, it, before, after } from 'mocha'
import {fixNamesUrlToDb, fixNamesFromDbToUrl} from '../helpers/functions.js'

describe('type effectiveness', function() {
    let db

    before(function(done) {
        db = new sqlite3.Database('../database/pokemon', sqlite3.OPEN_READWRITE, (err) => {
            if (err)
                return done(err)
            done()
        })
    })

    const poke1Type=[4,100,110,90,420]
    poke1Type.forEach(id=>{
        it('returns 18 rows for poke with 1 type', function(done) {
            const query = query_getTypeAttacks(id, 1)

            db.all(query, function(err, rows) {
                assert.strictEqual(err, null)
                assert.strictEqual(rows.length, 18)
                done()
            })
        })
    })
    const poke2types=[6,21,47,80]
    poke2types.forEach(id=>{
        it('returns 18 rows for poke with 2 types', function(done) {
            const query = query_getTypeAttacks(id, 2)

            db.all(query, function(err, rows) {
                console.log(rows)
                assert.strictEqual(err, null)
                assert.strictEqual(rows.length, 18)
                done()
            })
        })
    })

    after(function() {
        db.close()
    })
})













//kto nazwał pokemona type:null co to jest za bobby tables biedna wersja
describe('basic functions', function (){
    const dbPokeNames=['Nidoran♀','Mime Jr.','Iron Treads','Type: Null','Mr. Rime','Porygon-Z','Dudunsparce','Farfetch\'d']
    const urlPokeNames=['nidoran-f','mime-jr','iron-treads','type-null','mr-rime','porygon-z','dudunsparce','farfetchd']

    dbPokeNames.forEach((value,index)=>{
        it('changes db name '+dbPokeNames[index]+' to url name '+urlPokeNames[index]+' correctly', () => {
            const result=fixNamesFromDbToUrl(value)
            assert.strictEqual(result,urlPokeNames[index])
        })
    })
    urlPokeNames.forEach((value, index)=>{
        it('changes url name '+urlPokeNames[index]+' to db name '+dbPokeNames[index]+' correctly',()=>{
            const result=fixNamesUrlToDb(value)
            assert.strictEqual(result,dbPokeNames[index])
        })
    })
})
