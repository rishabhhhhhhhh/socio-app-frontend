// export const SERVER_URL = 'https://socio-app-backend.vercel.app';
// export const SERVER_URL = 'http://localhost:3001';
export const SERVER_URL = 'https://socio-app-backend.vercel.app';


export const getBase64 = async (file, callback) => {
    const reader = new FileReader();
    reader.onload = () => callback(null, reader.result);
    reader.onerror = (error) => callback(error);
    reader.readAsDataURL(file);
}