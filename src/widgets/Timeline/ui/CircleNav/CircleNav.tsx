import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import cls from './CircleNav.module.scss';
import type { TimelineInterval } from '../../model/types';
import { calcDotPosition } from '../../lib/calcDotPosition';

interface CircleNavProps {
    intervals: TimelineInterval[];
    activeIndex: number;
    onChange: (index: number) => void;
}

export const CircleNav = ({ intervals, activeIndex, onChange }: CircleNavProps) => {
    const circleRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const rotation = useRef(0);

    // вращение круга
    useEffect(() => {
        if (!circleRef.current) return;

        const total = intervals.length;
        const anglePerDot = 360 / total;
        const targetAngle = 30 - activeIndex * anglePerDot;

        gsap.to(circleRef.current, {
            rotation: targetAngle,
            duration: 1,
            ease: 'power2.inOut',
            transformOrigin: 'center center',
            onUpdate: () => {
                const currentRot = gsap.getProperty(circleRef.current!, 'rotation') as number;
                circleRef.current!.style.setProperty('--circle-rotation', `${currentRot}deg`);
                circleRef.current!.style.setProperty('--circle-text-rotation', `${-currentRot}deg`);
            },
        });

        rotation.current = targetAngle;
    }, [activeIndex, intervals.length]);

    // плавная смена label
    useEffect(() => {
        if (!labelRef.current) return;
        const tl = gsap.timeline();
        tl.to(labelRef.current, { opacity: 0, y: -10, duration: 0.2, ease: 'power1.out' })
            .call(() => {
                labelRef.current!.textContent = intervals[activeIndex].label;
            })
            .to(labelRef.current, { opacity: 1, y: 0, duration: 0.3, ease: 'power1.inOut' });
    }, [activeIndex, intervals]);

    return (
        <div className={cls.circleWrapper}>

            <div ref={circleRef} className={cls.circle}>
                {intervals.map((interval, index) => {
                    const {x, y} = calcDotPosition(index, intervals.length, 270);
                    const isActive = index === activeIndex;

                    return (
                        <button
                            key={interval.id}
                            type="button"
                            className={`${cls.dot} ${isActive ? cls.active : ''}`}
                            style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                            }}
                            onClick={() => !isActive && onChange(index)}
                        >
                            <span>{index + 1}</span>
                        </button>
                    );
                })}
            </div>

            {/* статичный label */}
            <div ref={labelRef} className={cls.label}>
                {intervals[activeIndex].label}
            </div>
        </div>
    );
};
