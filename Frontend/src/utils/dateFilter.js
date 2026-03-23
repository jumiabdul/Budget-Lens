export const getCurrentMonthYear = () => {
    const now = new Date();
    return {
        month: now.toLocaleString("default", { month: "long" }),
        year: now.getFullYear()
    };
};

export const isCurrentMonth = (date) => {
    const { month, year } = getCurrentMonthYear();
    const d = new Date(date);
    const itemMonth = d.toLocaleString("default", { month: "long" });
    const itemYear = d.getFullYear();

    return itemMonth === month && itemYear === year;
};
