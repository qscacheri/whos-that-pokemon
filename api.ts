import axios from 'axios';

export const getRandomPokemon = async () => {
  const randomNum = Math.floor(Math.random() * 898);
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomNum}`);

  return res.data;
};
