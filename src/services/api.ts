import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (offset: number, limit: number) => {
    const response = await axios.get(`${baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
    return response.data;
};



export const getPokemonDetails = async (id: number) => {
    const response = await axios.get(`${baseUrl}/pokemon/${id}`);
    return response.data;
};
