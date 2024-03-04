import React from 'react';
import * as S from "./stylesApp";

import AlarmeHe from './components/AlarmeManHe1';

function App() {
  return (
    <S.Container>
        
      <S.CADASTRO_ALARME>
        < AlarmeHe />
      </S.CADASTRO_ALARME>  
    </S.Container>
  );
}

export default App;
