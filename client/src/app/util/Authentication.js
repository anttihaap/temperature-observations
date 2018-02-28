import decoder from 'jwt-decode';

exports.isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    return !isTokenExpired();
};

exports.logOut = () => {
    localStorage.removeItem('token');
};

export function isTokenExpired() {
    const token = localStorage.getItem('token');
    const decodedToken = decoder(token);
    if (!decodedToken.exp) return null;

    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    
    //Token has expired if less than date now
    return expirationDate < new Date();
}

export function getToken() {
    return localStorage.getItem('token');
}
