import axios from 'axios'
import Character from '../../entities/character.js'
const URL = ''
export default class RickAndMortyBRL {
  static async getCharactersFromJSON() {
    const { data: { results = [] } } = await axios.get(URL)
    return results.map(char => new Character(char))
  }
}