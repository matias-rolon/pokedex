import React, { useState, useEffect } from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { getPokemonDetails } from '../services/api';

interface PokemonItemProps {
  id: number;
}

const PokemonItem: React.FC<PokemonItemProps> = ({ id }) => {
  const [pokemonDetails, setPokemonDetails] = useState<any | null>(null);

  useEffect(() => {
    loadPokemonDetails();
  }, []);

  const loadPokemonDetails = async () => {
    const data = await getPokemonDetails(id);
    setPokemonDetails(data);
  };

  return (
    <IonItem>
      {pokemonDetails && (
        <IonCard>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} alt={`Pokemon ${id}`} />
          <IonCardHeader>
            <IonCardTitle>{pokemonDetails.name}</IonCardTitle>
            <IonCardSubtitle>#{id}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <IonLabel>Experiencia: {pokemonDetails.base_experience}</IonLabel>
            <IonLabel>Altura: {pokemonDetails.height}</IonLabel>
            <IonLabel>Peso: {pokemonDetails.weight}</IonLabel>
            <IonLabel>
              Abilidades: {pokemonDetails.abilities.map((ability: any) => ability.ability.name).join(', ')}
            </IonLabel>
          </IonCardContent>
        </IonCard>
      )}
    </IonItem>
  );
};

export default PokemonItem;
