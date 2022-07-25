import { createContext } from 'react';
import IUser from '../lib/IUser';

const UserContext = createContext<IUser | null>(null);
export default UserContext;