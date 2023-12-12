import React, { useState, useEffect, useCallback } from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/react';
import { getPokemonList } from '../services/api';
import PokemonItem from './PokemonItem';

const PokemonList: React.FC = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      await loadPokemon();
    };
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow>
            {pokemonList.map((_: any, index) => (
              <IonCol size="12" size-md="6" size-lg="4" key={index}>
                <PokemonItem id={index + offset + 1} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonInfiniteScroll
          threshold="100px"
          disabled={disableInfiniteScroll}
          onIonInfinite={(e: CustomEvent<void>) => loadMorePokemon(e)}
        >
          <IonInfiniteScrollContent loadingText="Cargando más Pokémon..."></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default PokemonList;
