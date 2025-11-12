import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import gsap from 'gsap';
import cls from './EventsSliderMobile.module.scss';
import { TimelineEvent } from '../../../model/types';

interface EventsSliderMobileProps {
    events: TimelineEvent[];
}

export const EventsSliderMobile = ({ events }: EventsSliderMobileProps) => {
    const swiperRef = useRef<any>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [renderedEvents, setRenderedEvents] = useState(events);
    const [swiperKey, setSwiperKey] = useState(0);

    useEffect(() => {
        const oldIds = renderedEvents.map((e) => e.id).join(',');
        const newIds = events.map((e) => e.id).join(',');
        if (oldIds === newIds) return;

        const slides = wrapperRef.current?.querySelectorAll(`.${cls.slide}`);
        if (!slides?.length) {
            setRenderedEvents(events);
            setSwiperKey((k) => k + 1);
            return;
        }

        gsap.to(slides, {
            opacity: 0,
            y: 20,
            duration: 0.25,
            stagger: 0.05,
            ease: 'power1.out',
            onComplete: () => {
                setRenderedEvents(events);
                setSwiperKey((k) => k + 1);
            },
        });
    }, [events]);

    useEffect(() => {
        const slides = wrapperRef.current?.querySelectorAll(`.${cls.slide}`);
        if (!slides?.length) return;
        gsap.set(slides, { opacity: 0, y: 20 });
        gsap.to(slides, {
            opacity: 1,
            y: 0,
            duration: 0.35,
            stagger: 0.05,
            ease: 'power1.inOut',
        });
    }, [renderedEvents]);

    return (
        <div className={cls.mobileWrapper} ref={wrapperRef}>
            <Swiper
                key={swiperKey}
                modules={[Pagination]}
                slidesPerView={1}
                spaceBetween={0}
                pagination={{
                    clickable: true,
                    el: `.${cls.dots}`,
                    bulletClass: cls.dot,
                    bulletActiveClass: cls.dotActive,
                }}
                className={cls.swiper}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
                {renderedEvents.map((event) => (
                    <SwiperSlide key={event.id} className={cls.swiperSlide}>
                        <article className={cls.slide}>
                            <h3 className={cls.slideYear}>{event.year}</h3>
                            <p className={cls.slideText}>{event.description}</p>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className={cls.dotsWrapper}>
                <div className={cls.dots}></div>
            </div>
        </div>
    );
};
