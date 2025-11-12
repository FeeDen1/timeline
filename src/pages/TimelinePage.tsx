import { useMediaQuery } from 'react-responsive';
import { timelineMockIntervals } from '../widgets/Timeline/model/mockData';
import {Timeline, TimelineMobile} from "../widgets/Timeline";

export const TimelinePage = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return isMobile ? (
        <TimelineMobile title="Исторические даты" intervals={timelineMockIntervals} />
    ) : (
        <Timeline title="Исторические даты" intervals={timelineMockIntervals} />
    );
};
