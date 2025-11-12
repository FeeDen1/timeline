import { useState } from 'react';
import cls from './TimelineMobile.module.scss';
import { Header } from '../Header/Header';
import { EventsSliderMobile } from '../EventsSliderMobile/EventsSliderMobile';
import {TimelineStepper} from "../../../../../features/Timeline-stepper/ui/TimelineStepper";
import {TimelineInterval} from "../../../model/types";

interface TimelineMobileProps {
    title: string;
    intervals: TimelineInterval[];
}

export const TimelineMobile = ({ title, intervals }: TimelineMobileProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeInterval = intervals[activeIndex];
    console.log('Active interval:', activeInterval);

    return (
        <section className={cls.wrapper}>
            <h2 className={cls.title}>{title}</h2>
            <div className={cls.headerYears}>
                <Header interval={activeInterval}/>

            </div>

            <div className={cls.stepper}>
                <TimelineStepper
                    total={intervals.length}
                    current={activeIndex}
                    onChange={setActiveIndex}
                />
            </div>
            <div className={cls.category}>{activeInterval.label}</div>
            <div className={cls.divider}/>
            <div className={cls.sliderSection}>
                <EventsSliderMobile events={activeInterval.events}/>
            </div>
        </section>
    );
};
