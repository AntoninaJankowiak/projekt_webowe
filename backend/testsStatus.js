import { describe, it, before, after } from 'mocha'
import app from './index.js'
import chai from 'chai'
import chaiHttp from 'chai-http'

const { expect } = chai
chai.use(chaiHttp)
describe('GET /status', () => {
    it('home page should return status 200', (done) => {
        chai.request(app)
            .get('/api')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
    })
    const urls=['nidoran-f','mime-jr','iron-treads','type-null','mr-rime','porygon-z','dudunsparce','farfetchd']
    urls.forEach((value, index)=>{
        it(urls[index]+' page should return status 200', (done) => {
            const url="/pokemon/"+value
            chai.request(app)
                .get(url)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
})