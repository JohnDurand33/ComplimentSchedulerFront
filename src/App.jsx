import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import RecipientView from './components/RecipientView';
import CreateRecipient from './components/CreateRecipient';
import Navbar from './components/Navbar';
import NewEvent from './components/NewEvent';
import Calendar from './components/Calendar';
import CustomMessage from './components/CustomMessage';
import { getUserSession, removeUserSession, setUserSession } from './utils/session';

const AuthContext = createContext();

const App = () => {
    const [session, setSessionState] = useState(getUserSession());

    const setSession = (userSession) => {
        setUserSession(userSession);
        setSessionState(userSession);
    };

    const clearSession = () => {
        removeUserSession();
        setSessionState(null);
    };

    return (
        <AuthContext.Provider value={{ session, setSession, clearSession }}>
            <Router>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/recipient/:id" component={RecipientView} />
                    <Route path="/create-recipient" component={CreateRecipient} />
                    <Route path="/new-event" component={NewEvent} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/custom-message" component={CustomMessage} />
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default App;