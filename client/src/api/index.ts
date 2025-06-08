import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getOpportunities = () => apiClient.get('/opportunities');
export const createApplication = (data: any) => apiClient.post('/applications', data);
export const getApplications = () => apiClient.get('/applications');