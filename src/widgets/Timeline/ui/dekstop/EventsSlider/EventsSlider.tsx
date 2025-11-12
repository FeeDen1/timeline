import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import gsap from 'gsap';
import cls from './EventsSlider.module.scss';
import {TimelineEvent} from "../../../model/types";

interface EventsSliderProps {
    events: TimelineEvent[];
}

export const EventsSlider = ({ events }: EventsSliderProps) => {
    const swiperRef = useRef<any>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [renderedEvents, setRenderedEvents] = useState(events);
    const [swiperKey, setSwiperKey] = useState(0);

    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(events.length > 3);

    const handleSlideChange = (swiper: any) => {
        setCanPrev(!swiper.isBeginning);
        setCanNext(!swiper.isEnd);
    };

    const handlePrev = () => swiperRef.current?.slidePrev();
    const handleNext = () => swiperRef.current?.slideNext();

    useEffect(() => {
        const oldIds = renderedEvents.map((e) => e.id).join(',');
        const newIds = events.map((e) => e.id).join(',');
        if (oldIds === newIds) return;

        const slides = wrapperRef.current?.querySelectorAll(`.${cls.slide}`);
        if (!slides || slides.length === 0) {
            // нечего скрывать — просто подменим данные
            setRenderedEvents(events);
            setSwiperKey((k) => k + 1);
            setCanPrev(false);
            setCanNext(events.length > 3);
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
                setCanPrev(false);
                setCanNext(events.length > 3);
            },
        });
    }, [events]);


    useEffect(() => {
        const slides = wrapperRef.current?.querySelectorAll(`.${cls.slide}`);
        if (!slides || slides.length === 0) return;
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
        <div className={cls.sliderWrapper} ref={wrapperRef}>
            {canPrev && (
                <button
                    className={`${cls.navBtn} ${cls.prevBtn}`}
                    onClick={handlePrev}
                    aria-label="Previous slide"
                >
                    ‹
                </button>
            )}

            <Swiper
                key={swiperKey}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={3}
                spaceBetween={64}
                onSlideChange={handleSlideChange}
            >
                {renderedEvents.map((event) => (
                    <SwiperSlide key={event.id}>
                        <article className={cls.slide}>
                            <h3 className={cls.slideYear}>{event.year}</h3>
                            <p className={cls.slideText}>{event.description}</p>
                        </article>
                    </SwiperSlide>
                ))}
            </Swiper>
            {canNext && (
                <button
                    className={`${cls.navBtn} ${cls.nextBtn}`}
                    onClick={handleNext}
                    aria-label="Next slide"
                >
                    ›
                </button>
            )}
        </div>
    );
};
