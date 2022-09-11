export const pluralHandler = (duration: number, durationUnit: string) => {
    if (duration) {
        return ' ' + duration + ' ' + (duration > 1 ? durationUnit.toLowerCase() + 's' : durationUnit.toLowerCase())
    }
    return '';
}