import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

// 전체 족보 정보 조회
export const totalJockBoFetchApi = async () => {
  const response = await axios({
    url: `${baseUrl}/all`,
    method: 'GET',
  });
  return response.data;
};

export const jockBoListFetchApi = async () => {
  const response = await axios({
    url: `${baseUrl}/list`,
    method: 'GET',
  });
  return response.data;
};

export const jockBoSearchFetchApi = async (query: string) => {
  const response = await axios({
    url: `${baseUrl}/search${query}`,
    method: 'GET',
  });
  return response.data;
};
