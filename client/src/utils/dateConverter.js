export function convertDate(date) {
    const d = new Date(date);

    return d.toLocaleDateString('ru-RU', {
        timeZone: 'Europe/Moscow',
    }) + ' ' + d.toLocaleTimeString('ru-RU', {
        timeZone: 'Europe/Moscow',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}
