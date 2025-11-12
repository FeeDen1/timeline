export interface TimelineEvent {
    id: string;
    year: number;
    title: string;
    description: string;
}

export interface TimelineInterval {
    id: string;
    label: string;       // подпись ("Наука" и т.п.)
    startYear: number;
    endYear: number;
    events: TimelineEvent[];
}
