import { useEffect } from 'react';
import {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
} from '@ionic/react';
import PokemonItem from './PokemonItem';
import { usePokemonList } from "../hooks/usePokemonList";

import './styles/pokemonList.css'

export const PokemonList = () => {

    const { loadMorePokemon, pokemonList, loadPokemon, disableInfiniteScroll } = usePokemonList()

    useEffect(() => {
        const fetchData = async () => {
            await loadPokemon();
        };
        fetchData();
    }, []);

    return (
        <IonPage>
            <IonContent>
                <div className='contain-img-header'>
                    <img className='img-header' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
                </div>
                <IonGrid className='content-pokemons'>
                    <IonRow> 
                        {pokemonList.map((poke) => (
                            <IonCol size="6" sizeXs='12' size-md="4" sizeLg='3' key={poke.id}>
                                <PokemonItem id={poke.id} />
                            </IonCol>
                        ))}
                    </IonRow>
                </IonGrid>
                <IonInfiniteScroll
                    threshold="100px"
                    disabled={disableInfiniteScroll}
                    onIonInfinite={(e: CustomEvent<void>) => loadMorePokemon(e)}>
                    <IonInfiniteScrollContent loadingText="Cargando más Pokémon..." />
                </IonInfiniteScroll>
            </IonContent>
        </IonPage>
    );
};

