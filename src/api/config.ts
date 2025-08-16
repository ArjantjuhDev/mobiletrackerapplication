// Configuratie voor backend API URL

const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return 'http://localhost:3001/api';
};

export const API_URL = getApiUrl();
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
