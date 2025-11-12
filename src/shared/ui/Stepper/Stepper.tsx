import { FC } from 'react';
import cls from './Stepper.module.scss';

interface StepperProps {
    total: number;
    current: number;
    onPrev?: () => void;
    onNext?: () => void;
    hideInactiveButtons?: boolean;
    className?: string;
}

export const Stepper= (props: StepperProps) => {
    const { total, current, onPrev, onNext, className } = props;
    const formattedCurrent = String(current + 1).padStart(2, '0');
    const formattedTotal = String(total).padStart(2, '0');

    return (
        <div className={`${cls.stepper} ${className || ''}`}>
            <div className={cls.counter}>
                {formattedCurrent}/{formattedTotal}
            </div>

            <div className={cls.controls}>
                <button
                    className={cls.btn}
                    onClick={onPrev}
                    disabled={current === 0}
                    aria-label="Previous"
                >
                    ‹
                </button>

                <button
                    className={cls.btn}
                    onClick={onNext}
                    disabled={current === total - 1}
                    aria-label="Next"
                >
                    ›
                </button>
            </div>
        </div>
    );
};
