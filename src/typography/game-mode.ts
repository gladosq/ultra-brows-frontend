export interface IModes {
    id: number;
    title: string;
    subtitle?: string;
    price: string;
}

export const servicesList = [
    {
        id: 1,
        title: 'Брови',
        subtitle: 'Ламинирование, моделирование, окрашивание',
        price: '370'
    },
    {
        id: 2,
        title: 'Макияж',
        subtitle: 'Накладные реснички, очищение лица от макияжа',
        price: '100'
    },
    {
        id: 3,
        title: 'Комплекс',
        subtitle: 'Моделирование бровей нитью, окрашивание ресниц краской',
        price: '1180'
    },
];
