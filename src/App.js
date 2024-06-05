import './App.css';
import './css/grid.css';
import './css/color-fonts.css';
import { BrowserRouter} from 'react-router-dom';

import Footer from './components/footer';
import Header from './components/header';
import {AppRouter} from './router/approuter';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <AppRouter/>   
      <Footer/>
    </BrowserRouter>
    );
}

export default App;

/* Exercise
1. Add component <Musicalbums/> from 08-app-bs-async as a page component
2. Setup NavMenu and AppRouter so that a navigation alternative Music navigates to page Musicalbums
  - remember to also compy Services
3. Very that it works

4. Add <AnimalPage10a/> from M4L3/01-building-form-components as a page component
5. Setup NavMenu and AppRouter so that a navigation alternative Animals navigates to page <AnimalPage10a/>
   - remember copy move the Model and Services

6. Very that it works
*/