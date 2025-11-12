import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import cls from './Header.module.scss';
import type { TimelineInterval } from '../../model/types';

interface HeaderProps {
    interval: TimelineInterval; // { start: number; end: number }
}

export const Header = ({ interval }: HeaderProps) => {
    const leftRef = useRef<HTMLSpanElement>(null);
    const rightRef = useRef<HTMLSpanElement>(null);

    // запоминаем предыдущие значения (именно они будут "from")
    const prev = useRef({ start: interval.startYear, end: interval.endYear });

    useEffect(() => {
        const fromStart = prev.current.start;
        const toStart = interval.startYear;
        const fromEnd = prev.current.end;
        const toEnd = interval.endYear;

        // прокси-объекты, которые будет твинить GSAP
        const left = { value: fromStart };
        const right = { value: fromEnd };

        const startIncreasing = toStart > fromStart;
        const endIncreasing = toEnd > fromEnd;

        const format = (v: number, inc: boolean) =>
            (inc ? Math.floor(v) : Math.ceil(v)).toString();

        // сразу установить видимые начальные числа (без мигания)
        if (leftRef.current) leftRef.current.textContent = format(fromStart, startIncreasing);
        if (rightRef.current) rightRef.current.textContent = format(fromEnd, endIncreasing);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // левая часть: из prev → в текущий interval
            tl.fromTo(
                left,
                { value: fromStart },
                {
                    value: toStart,
                    duration: 1.2,
                    ease: 'none',
                    onUpdate: () => {
                        if (leftRef.current) {
                            leftRef.current.textContent = format(left.value, startIncreasing);
                        }
                    },
                }
            );

            // правая часть — параллельно
            tl.fromTo(
                right,
                { value: fromEnd },
                {
                    value: toEnd,
                    duration: 1.2,
                    ease: 'none',
                    onUpdate: () => {
                        if (rightRef.current) {
                            rightRef.current.textContent = format(right.value, endIncreasing);
                        }
                    },
                },
                0
            );
        });

        // важно: обновляем prev ТОЛЬКО после запуска анимаций
        prev.current = { start: toStart, end: toEnd };

        return () => ctx.revert();
    }, [interval.startYear, interval.endYear]);

    return (
        <div className={cls.years}>
            <span ref={leftRef} className={cls.left}>{interval.startYear}</span>
            <span ref={rightRef} className={cls.right}>{interval.endYear}</span>
        </div>
    );
};
