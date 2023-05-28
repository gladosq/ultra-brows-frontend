import {useQuery} from '@tanstack/react-query';

export const fetchNews = async () => {
    const res = await fetch(
        `http://localhost:3333/news`,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            }
        });

    return res.json();
};

export const fetchCreateNew = async ({formData}: {formData: FormData}) => {
	const res = await fetch(
		`http://localhost:3333/news/create`,
		{
			method: 'POST',
			body: formData,
		});

	return res.json();
};

export default function useNews() {
    return useQuery(['news'],
        () => fetchNews(),
        {staleTime: Infinity})
}
