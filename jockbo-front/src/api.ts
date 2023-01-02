import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const totalJockBoFetchApi = async () => {
  const response = await axios({
    url: `${baseUrl}/all`,
    method: 'GET',
  });
  return response.data;
};
