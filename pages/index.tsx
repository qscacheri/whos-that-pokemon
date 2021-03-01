import {
  Box,
  Button,
  Image,
  VStack,
  Text,
  HStack,
  Center,
  Spinner,
  useMediaQuery,
  useBreakpointValue,
  Square,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getRandomPokemon } from '../api';
import { PokemonViewer } from '../components/PokemonViewer';
import { Pokemon } from '../pokemon';
import { useRandomPokemonQuery } from '../useRandomPokemonQuery';

export default function Home() {
  const { isLoading, error, data: pokemon, refetch } = useRandomPokemonQuery();

  const [hidden, setHidden] = useState(true);
  const [isMobile] = useMediaQuery('(max-width: 840px)');
  const width = useBreakpointValue({ sm: '100%', md: '75%' });
  return (
    <Box w="100vw" h="100vh" bg="red.500" boxSizing="border-box">
      <VStack alignItems="center" alignContent="center">
        <Image
          src="/whos_that_pokemon.png"
          p="4%"
          pb={['25%', '4%']}
          width={width}
          height="auto"
        />
        <VStack justifyContent={['space-between']} alignItems="center">
          <Button
            minW="300px"
            size="md"
            onClick={() => {
              setHidden(true);
              refetch();
            }}
          >
            New Pokemon
          </Button>
          <Button size="md" onClick={() => setHidden(false)} minW="300px">
            Reveal!
          </Button>
        </VStack>
        <Square size={['300px']} p="24px" boxSizing="border-box">
          {isLoading && <Spinner m="auto" />}
          {pokemon && (
            <PokemonViewer
              pokemonImgUrl={pokemon.sprites.front_default}
              hidden={hidden}
            />
          )}
        </Square>
        {!hidden && pokemon && (
          <Text
            color="yellow.400"
            fontSize="4xl"
          >{`It's ${pokemon.species.name}!`}</Text>
        )}
      </VStack>
    </Box>
  );
}
