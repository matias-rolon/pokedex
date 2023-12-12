import { useState, useCallback } from 'react';
import { getPokemonDetails } from '../services/api';

export const usePokemonList = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const limit = 10;
  const [disableInfiniteScroll, setDisableInfiniteScroll] = useState(false);

  const getRandomPokemonId = () => Math.floor(Math.random() * 912) + 1;

  const loadPokemon = async () => {
    for (let index = 0; index < limit; index++) {
      const data = [ await getPokemonDetails(await getRandomPokemonId())]
      setPokemonList((prevList) => [...prevList, ...data]);      
    }
  };

  const loadMorePokemon = useCallback(
    async (event: any) => {
      if (disableInfiniteScroll) {
        event.target.complete();
        return;
      }


      await loadPokemon();

      setTimeout(() => {
        event.target.complete();
        if (pokemonList.length >= 150) {
          setDisableInfiniteScroll(true);
        }
      }, 500);
    },
    [disableInfiniteScroll, loadPokemon, pokemonList.length]
  );

  return { pokemonList, loadMorePokemon, loadPokemon, disableInfiniteScroll };
};
