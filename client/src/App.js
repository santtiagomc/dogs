import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateDog from './components/CreateDog'

function App(){
    return (
        <BrowserRouter>
            <div className='App'>
                <Switch>
                    <Route exact path = '/' component= {LandingPage}/>
                    <Route exact path = '/dogs' component= {Home}/>
                    <Route exact path = '/dogs/create' component={CreateDog}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;