'use client';

import s from './Blog.module.scss';
import {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PrevButtonIcon from '../UI/Icons/PrevButtonIcon';
import NextButtonIcon from '../UI/Icons/NextButtonIcon';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

interface BlogProps {
	mainTitle?: boolean;
	news: []
}

export default function Blog({mainTitle = true, news}: BlogProps) {
	const blogContent = () => {
		return news.slice().reverse().map(({id, title, subtitle, date, image}) => (
			<SwiperSlide key={id}>
				<div className={s.slideWrapper}>
					<div className={s.topContainer}>
						<h2>{title}</h2>
						<p><span>{subtitle}</span></p>
					</div>
					<div className={s.imageWrapper}>
						<Image className={s.image} src={image} alt={'Изображение курса'} fill/>
						<div className={s.dateWrapper}>{dayjs(date).format('DD.MM.YYYY')}</div>
					</div>
				</div>
			</SwiperSlide>
		));
	};

	return (
		<div className={s.wrapper}>
			{mainTitle && <h2>Блог</h2>}
			<div className={s.swiperOuterWrapper}>
				<Swiper
					slidesPerView={2.2}
					spaceBetween={40}
					pagination={{
						type: 'bullets',
						clickable: true
					}}
					// navigation={true}
					navigation={{
						disabledClass: `${s.disabledButton}`,
						prevEl: `.${s.prevButton}`,
						nextEl: `.${s.nextButton}`
					}}

					modules={[Navigation, Pagination]}
					className={s.swiperWrapper}
				>
					{blogContent()}
				</Swiper>
				{news.length > 3 && (
					<div className={s.navigation}>
						<div className={`${s.prevButton}`}>
							<PrevButtonIcon/>
						</div>
						<div className={`${s.nextButton}`}>
							<NextButtonIcon/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
