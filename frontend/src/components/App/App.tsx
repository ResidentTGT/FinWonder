import React from 'react';
import { BackendApiService } from '../../services/backend/backend-api.service';
import { UserService } from '../../services/user.service';
import Header from '../Header/Header';
import './App.scss';

const backendApiService = new BackendApiService(process.env.REACT_APP_API_URL as string);
const userService = new UserService(backendApiService);
export const BackendApiServiceContext = React.createContext<BackendApiService>(backendApiService);
export const UserServiceContext = React.createContext<UserService>(userService);

function App() {

    return (
        <UserServiceContext.Provider value={userService}>
            <Header />
        </UserServiceContext.Provider>
    );
}

export default App;
