import { useCallback, useState } from 'react'
import { getPokemonList } from '../services/api';

export const usePokemonList = () => {
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const [disableInfiniteScroll, setDisableInfiniteScroll] = useState(false);
  
    const loadPokemon = async () => {
      const data = await getPokemonList(offset, limit);
      setPokemonList((prevList) => [...prevList, ...data.results]);
      setOffset((prevOffset) => prevOffset + limit);
    };
  
    const loadMorePokemon = useCallback(
      async (event:any) => {
        if (disableInfiniteScroll) {
          event.target.complete();
          return;
        }
  
        await loadPokemon();
        setTimeout(() => {
          event.target.complete();
  
          // Check if there are more items to load
          if (pokemonList.length >= 150) {
            setDisableInfiniteScroll(true);
          }
        }, 500);
      },
      [disableInfiniteScroll, loadPokemon, pokemonList.length]
    );
  return { loadMorePokemon, loadPokemon, offset, pokemonList, disableInfiniteScroll}
}
