export function parseScenarioTags(raw: string | undefined) {
    if (!raw) return '';

    return raw
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .map(tag => ({ title: tag }));
}