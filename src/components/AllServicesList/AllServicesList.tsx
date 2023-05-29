'use client';

import s from './AllServicesList.module.scss';
import Image from 'next/image';
import Search from 'antd/es/input/Search';
import {useEffect, useState} from 'react';
import useServices from '../../api/services';

export default function AllServicesList() {
    const [services, setServices] = useState<any>([]);
    const {data, isSuccess, isLoading} = useServices();

    useEffect(() => {
        if (isSuccess) setServices([...data]);
    }, [isSuccess]);

    const onSearch = (e: string) => {
        if (e) {
            const filteredServices = services.slice().filter((item: any) => {
                return item.title.toLowerCase().indexOf(e.toLowerCase()) >= 0
                    || item.subtitle.toLowerCase().indexOf(e.toLowerCase()) >= 0;
            });
            setServices([...filteredServices]);
        } else {
            setServices([...data]);
        }
    };

    return (
        <div className={s.wrapper}>
            <h1>Список всех услуг</h1>
            <Search
                placeholder='Введите значение для поиска'
                allowClear
                enterButton='Поиск'
                size='large'
                onSearch={onSearch}
            />
            <ul className={s.list}>
                {isSuccess && services.map(({title, id, price, subtitle, image}: any) => (
                    <li className={s.item} key={id}>
                        <div className={s.imageWrapper}>
                            <Image className={s.image} src={image} alt={''} fill/>
                        </div>
                        <div className={s.infoWrapper}>
                            <h2>{title}</h2>
                            <p>{subtitle}</p>
                            <span>{price} ₽</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
