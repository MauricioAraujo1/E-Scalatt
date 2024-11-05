import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/optimize';

export const optimize = async (data: any) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error calling optimize API:', error);
        throw error; // Propaga o erro para o chamador
    }
};

