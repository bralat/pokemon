import axios from 'axios';

const HTTP = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

export default HTTP;
