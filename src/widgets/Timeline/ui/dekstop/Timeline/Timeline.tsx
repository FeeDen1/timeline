import { useState } from 'react';
import cls from './Timeline.module.scss'

import {Header} from "../Header/Header";
import {CircleNav} from "../CircleNav/CircleNav";
import {EventsSlider} from "../EventsSlider/EventsSlider";
import {TimelineInterval} from "../../../model/types";
import {TimelineStepper} from "../../../../../features/Timeline-stepper/ui/TimelineStepper";


export interface TimelineProps {
    title: string;
    intervals: TimelineInterval[];
}

export const Timeline = (props: TimelineProps) => {
    const {title, intervals} = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const activeInterval = intervals[activeIndex];
    return (
        <section className={cls.wrapper}>
            <h2 className={cls.title}>{title}</h2>
            <div className={cls.centerStage}>
                <div className={cls.circleLayer} aria-hidden="true">
                    <CircleNav
                        intervals={intervals}
                        activeIndex={activeIndex}
                        onChange={setActiveIndex}
                    />
                </div>

                <div className={cls.yearsLayer}>
                    <Header interval={activeInterval}/>
                </div>
                <span className={cls.gridV}/>
                <span className={cls.gridH}/>
                <div className={cls.bottom}>
                    <TimelineStepper
                        total={intervals.length}
                        current={activeIndex}
                        onChange={setActiveIndex}
                    />
                </div>
            </div>
            <EventsSlider events={activeInterval.events}/>
        </section>
    );
};
