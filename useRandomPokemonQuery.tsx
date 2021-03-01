import { useQuery, QueryStatus } from 'react-query';
import { getRandomPokemon } from './api';
import { Pokemon } from './pokemon';

export const useRandomPokemonQuery = () => {
  return useQuery<Pokemon>('random-pokemon', getRandomPokemon);
};
