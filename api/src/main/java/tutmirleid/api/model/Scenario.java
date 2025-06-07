package tutmirleid.api.model;

import tutmirleid.api.entity.ScenarioEntity;

import java.util.List;
import java.util.stream.Collectors;

public class Scenario {
    private Long id;
    private String title;
    private String description;
    private String precondition;
    private List<ScenarioStep> steps;

    public static Scenario toModel(ScenarioEntity entity) {
        Scenario model = new Scenario();

        model.setId(entity.getId());
        model.setTitle(entity.getTitle());
        model.setDescription(entity.getDescription());
        model.setPrecondition(entity.getPrecondition());
        model.setSteps(entity.getSteps().stream().map(ScenarioStep::toModel).collect(Collectors.toList()));

        return model;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPrecondition() {
        return precondition;
    }

    public void setPrecondition(String precondition) {
        this.precondition = precondition;
    }

    public List<ScenarioStep> getSteps() {
        return steps;
    }

    public void setSteps(List<ScenarioStep> steps) {
        this.steps = steps;
    }
}
