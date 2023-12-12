import React, { useState, useEffect } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonLabel,
} from '@ionic/react';
import { getPokemonDetails } from '../services/api';

import './styles/pokemonItem.css'

interface PokemonItemProps {
  id: number;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ id }) => {
  const [pokemonDetails, setPokemonDetails] = useState<any | null>(null);

  useEffect(() => {
    loadPokemonDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadPokemonDetails = async () => {
    const data = await getPokemonDetails(id);
    setPokemonDetails(data);
  };

  return (
    <>
      {pokemonDetails && (
        <IonCard className='card-pokemon'>
          <div className='contain-img-pokemon'>

            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={`Pokemon ${id}`} />
          </div>
          <IonCardHeader>
            <IonCardSubtitle>#{id}</IonCardSubtitle>
            <IonCardTitle className='name'>{pokemonDetails.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>Experiencia: {pokemonDetails.base_experience}</p>
            <p>Altura: {pokemonDetails.height}</p>
            <p>Peso: {pokemonDetails.weight}</p>
            <IonLabel>
              Abilidades: {pokemonDetails.abilities.map((ability: any) => ability.ability.name).join(', ')}
            </IonLabel>
            {pokemonDetails.category}
          </IonCardContent>
        </IonCard>
      )}
    </>

  );
};

export default PokemonItem;
