package tutmirleid.api.model;

import tutmirleid.api.entity.ScenarioContextOptionEntity;
import tutmirleid.api.entity.StepContextOptionEntity;

public class StepContextOption {
    private Long id;
    private String title;
    private String alias;

    public static StepContextOption toModel(StepContextOptionEntity entity) {
        StepContextOption model = new StepContextOption();

        model.setId(entity.getId());
        model.setTitle(entity.getTitle());
        model.setAlias(entity.getAlias());

        return model;
    }

    public StepContextOption() {}

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

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }
}
