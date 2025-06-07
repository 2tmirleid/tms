package tutmirleid.api.dto;

public class ScenarioWithStepsDTO {
    private Long scenarioId;
    private String scenarioTitle;
    private String scenarioDescription;
    private String scenarioPrecondition;
    private Long stepId;
    private String step;
    private String expectedResult;

    public ScenarioWithStepsDTO(
            Long scenarioId,
            String scenarioTitle,
            String scenarioDescription,
            String scenarioPrecondition,
            Long stepId,
            String step,
            String expectedResult
    ) {
        this.scenarioId = scenarioId;
        this.scenarioTitle = scenarioTitle;
        this.scenarioDescription = scenarioDescription;
        this.scenarioPrecondition = scenarioPrecondition;
        this.stepId = stepId;
        this.step = step;
        this.expectedResult = expectedResult;
    }

    public Long getScenarioId() {
        return scenarioId;
    }

    public void setScenarioId(Long scenarioId) {
        this.scenarioId = scenarioId;
    }

    public String getScenarioTitle() {
        return scenarioTitle;
    }

    public void setScenarioTitle(String scenarioTitle) {
        this.scenarioTitle = scenarioTitle;
    }

    public String getScenarioDescription() {
        return scenarioDescription;
    }

    public void setScenarioDescription(String scenarioDescription) {
        this.scenarioDescription = scenarioDescription;
    }

    public String getScenarioPrecondition() {
        return scenarioPrecondition;
    }

    public void setScenarioPrecondition(String scenarioPrecondition) {
        this.scenarioPrecondition = scenarioPrecondition;
    }

    public Long getStepId() {
        return stepId;
    }

    public void setStepId(Long stepId) {
        this.stepId = stepId;
    }

    public String getStep() {
        return step;
    }

    public void setStep(String step) {
        this.step = step;
    }

    public String getExpectedResult() {
        return expectedResult;
    }

    public void setExpectedResult(String expectedResult) {
        this.expectedResult = expectedResult;
    }
}
