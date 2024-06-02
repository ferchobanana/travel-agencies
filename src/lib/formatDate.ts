export function formatDBDate(date: Date | null) {

    if (date === null) return ""

    const newDate = new Date(date);

    const day = String(newDate.getUTCDate()).padStart(2, '0');
    const month = String(newDate.getUTCMonth() + 1).padStart(2, '0');
    const year = newDate.getUTCFullYear();

    return `${day}/${month}/${year}`;
}