import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2';

export const getPokemonDetails = async (id: number) => {
  const response = await axios.get(`${baseUrl}/pokemon/${id}`);
  return response.data;
};
