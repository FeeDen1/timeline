export interface TimelineEvent {
    id: string;
    year: number;
    title: string;
    description: string;
}

export interface TimelineInterval {
    id: string;
    label: string;
    startYear: number;
    endYear: number;
    events: TimelineEvent[];
}
