package tutmirleid.api.model;

import tutmirleid.api.entity.ScenarioStepEntity;

public class ScenarioStep {
    private Long id;
    private String step;
    private String expectedResult;

    public static ScenarioStep toModel(ScenarioStepEntity entity) {
        ScenarioStep model = new ScenarioStep();

        model.setId(entity.getId());
        model.setStep(entity.getStep());
        model.setExpectedResult(entity.getExpectedResult());

        return model;
    }

    public ScenarioStep() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
