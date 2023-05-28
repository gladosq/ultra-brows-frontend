interface IRegisterPayload {
	email: string;
	password: string;
	name: string;
}

export const fetchRegister = async ({email, name, password}: IRegisterPayload) => {
	const res = await fetch(
		`http://localhost:3333/user/create`,
		{
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				name
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});

	if (!res.ok) {
		throw new Error('Ошибка авторизации');
	}

	return res.json();
};
