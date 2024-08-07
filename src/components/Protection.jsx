import { Navigate } from 'react-router-dom';

const Protection = ({ children }) => {
    const token = localStorage.getItem("TOKEN");
    return token ? children : <Navigate to="/" />;
};

export default Protection;