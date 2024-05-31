import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import Home from './pages/Home/index'
import {expect} from "chai"
import {describe, it} from "mocha"
import AboutUs from "./pages/AboutUs/index.js"
import HardcodedArticle from "./pages/HardocedArticle/index.js"
import HardcodedPokemon from "./pages/HarcodedPokemon/index.js"
import Pokedex from "./pages/Pokedex/index.js"
import PokedexExample from "./pages/PokedexExample/index.js"

describe('Pages rendering', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Home />)
        expect(wrapper.exists()).to.be.true
    })
   it('renders without crashing', () => {
        const wrapper = shallow(<AboutUs />)
        expect(wrapper.exists()).to.be.true
    })
    it('renders without crashing', () => {
        const wrapper = shallow(<HardcodedArticle />)
        expect(wrapper.exists()).to.be.true
    })
    it('renders without crashing', () => {
        const wrapper = shallow(<HardcodedPokemon />)
        expect(wrapper.exists()).to.be.true
    })
    it('renders without crashing', () => {
        const wrapper = shallow(<Pokedex />)
        expect(wrapper.exists()).to.be.true
    })
    it('renders without crashing', () => {
        const wrapper = shallow(<PokedexExample />)
        expect(wrapper.exists()).to.be.true
    })
})