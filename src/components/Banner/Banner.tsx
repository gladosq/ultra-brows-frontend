'use client';

import s from './Banner.module.scss';
import Image from 'next/image';
import brows2 from './../../../public/images/brows-2.webp';
import brows1 from './../../../public/images/brows-1.jpg';
import React from 'react';
import {useParallax} from 'react-scroll-parallax';

export default function Banner() {
	const parallaxSecond = useParallax({speed: 30});
	const parallaxThird = useParallax({speed: -40});

	return (
		<div className={s.outerWrapper}>
			<div className={s.wrapper}>
				<div className={s.textWrapper}>
					<h1 ref={parallaxThird.ref as React.RefObject<HTMLDivElement>}>Ultra brows</h1>
					<h2>Будь шикарной круглосуточно</h2>
				</div>
				<div className={s.imagesContainer} >
					<div className={s.imageWrapper} ref={parallaxThird.ref as React.RefObject<HTMLDivElement>}>
						<Image className={s.image} src={brows1} alt={''}/>
					</div>
					<div className={s.imageWrapper} ref={parallaxSecond.ref as React.RefObject<HTMLDivElement>}>
						<Image className={s.image} src={brows2} alt={''}/>
					</div>
				</div>
				banner
			</div>
		</div>
	)
}
