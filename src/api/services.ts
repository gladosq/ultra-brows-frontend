import {useQuery} from '@tanstack/react-query';

export const fetchServices = async () => {
    const res = await fetch(
        'http://localhost:3333/utilities',
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });

    return res.json();
};

export default function useServices() {
    return useQuery(['services'],
        () => fetchServices(),
        {staleTime: Infinity})
}

