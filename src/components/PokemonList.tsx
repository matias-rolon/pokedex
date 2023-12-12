import React, { useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/react';
import { usePokemonList } from '../hooks/usePokemonList';
import PokemonItem from './PokemonItem';

const PokemonList: React.FC = () => {

    const {loadMorePokemon, loadPokemon, offset, pokemonList, disableInfiniteScroll} = usePokemonList();

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
