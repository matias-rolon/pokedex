import React, { useState, useEffect,  } from 'react';
import { IonContent, IonPage, IonRow, IonCol, IonGrid, } from '@ionic/react';
import { getPokemonList } from '../services/api';
import PokemonItem from './PokemonItem';

const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);

  const loadPokemon = async () => {
    const data = await getPokemonList(0, 10);
    setPokemonList((prevList) => [...prevList, ...data.results]);
  };
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
                <PokemonItem id={1} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default PokemonList;
