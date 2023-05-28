interface ILoginPayload {
    email: string;
    password: string;
}

export const fetchLogin = async ({email, password}: ILoginPayload) => {
    const res = await fetch(
        `http://localhost:3333/user/login`,
        {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
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
