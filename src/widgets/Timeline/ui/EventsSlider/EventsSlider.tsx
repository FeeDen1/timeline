import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import gsap from 'gsap';
import cls from './EventsSlider.module.scss';
import type { TimelineEvent } from '../../model/types';

interface EventsSliderProps {
    events: TimelineEvent[];
}

export const EventsSlider = ({ events }: EventsSliderProps) => {
    const swiperRef = useRef<any>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // 🔸 Рендерим не props.events, а зафиксированную локально версию
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

    // 🧭 когда пришёл новый props.events — сначала прячем старые карточки
    useEffect(() => {
        // если список фактически не изменился, ничего не делаем
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
                // 👉 только после полного исчезновения меняем данные
                setRenderedEvents(events);
                setSwiperKey((k) => k + 1);        // пересоздаём swiper, чтобы встать в начало
                setCanPrev(false);
                setCanNext(events.length > 3);
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events]);

    // ✨ анимация появления новых карточек (срабатывает после смены renderedEvents)
    useEffect(() => {
        const slides = wrapperRef.current?.querySelectorAll(`.${cls.slide}`);
        if (!slides || slides.length === 0) return;

        // сразу ставим стартовые значения, чтобы не было «моргания»
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
                key={swiperKey}                            // сбрасываем позицию и внутреннее состояние
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
