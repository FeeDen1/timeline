import React from 'react';
import { Timeline } from '../widgets/Timeline';
import { timelineMockIntervals } from '../widgets/Timeline/model/mockData';

const App: React.FC = () => {
    return (
        <main>
            <Timeline title="Исторические даты" intervals={timelineMockIntervals} />
        </main>
    );
};

export default App;
