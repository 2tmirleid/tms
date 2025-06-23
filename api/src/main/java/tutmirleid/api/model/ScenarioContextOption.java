package tutmirleid.api.model;

import tutmirleid.api.entity.ScenarioContextOptionEntity;

public class ScenarioContextOption {
    private Long id;
    private String title;
    private String alias;

    public static ScenarioContextOption toModel(ScenarioContextOptionEntity entity) {
        ScenarioContextOption model = new ScenarioContextOption();

        model.setId(entity.getId());
        model.setTitle(entity.getTitle());
        model.setAlias(entity.getAlias());

        return model;
    }

    public ScenarioContextOption() {}

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
