export const calcDotPosition = (index: number, total: number, radius: number) => {
    const angle = (2 * Math.PI * index) / total - Math.PI / 2; // старт сверху
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
};
