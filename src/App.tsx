import './App.css'
import { IonApp } from '@ionic/react';

import { PokemonList } from './components/PokemonList';
import '@ionic/react/css/core.css';
import { setupIonicReact } from '@ionic/react';

setupIonicReact();
function App() {

  return (
    <IonApp>
      <PokemonList />
    </IonApp>
  )
}

export default App
