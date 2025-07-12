export function parseScenarioSteps(raw: string): { step: string; expectedResult: string }[] {
    const lines = raw.split('\n');

    const steps: { step: string; expectedResult: string }[] = [];
    let currentStepIndex = -1;

    for (let line of lines) {
        line = line.trim();

        const stepMatch = line.match(/\[step\s[\d.]+]\s*(.+)/i);
        if (stepMatch) {
            steps.push({
                step: stepMatch[1].trim(),
                expectedResult: ''
            });
            currentStepIndex = steps.length - 1;
            continue;
        }

        const expectedMatch = line.match(/\[expected\s[\d.]+]\s*(.+)/i);
        if (expectedMatch && currentStepIndex !== -1) {
            steps[currentStepIndex].expectedResult = expectedMatch[1].replace(/^Expected Result\s*/i, '').trim();
            continue;
        }

        const expectedStepMatch = line.match(/\[expected\.step\s[\d.]+]\s*(.+)/i);
        if (expectedStepMatch && currentStepIndex !== -1) {
            const additionalText = expectedStepMatch[1].trim();
            if (steps[currentStepIndex].expectedResult) {
                steps[currentStepIndex].expectedResult += ' ' + additionalText;
            } else {
                steps[currentStepIndex].expectedResult = additionalText;
            }
            continue;
        }


    }

    return steps;
}

