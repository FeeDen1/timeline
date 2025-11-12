import { Stepper } from '../../../shared/ui/Stepper/Stepper';

interface TimelineStepperProps {
    total: number;
    current: number;
    onChange: (index: number) => void;
    className?: string;
}

export const TimelineStepper = (props: TimelineStepperProps) => {
    const { total, current, onChange, className } = props;
    const handlePrev = () => {
        onChange(current === 0 ? total - 1 : current - 1);
    };

    const handleNext = () => {
        onChange(current === total - 1 ? 0 : current + 1);
    };

    return (
        <Stepper
            total={total}
            current={current}
            onPrev={handlePrev}
            onNext={handleNext}
            className={className}
        />
    );
};
