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

