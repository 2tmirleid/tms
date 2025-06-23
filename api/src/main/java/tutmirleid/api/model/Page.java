package tutmirleid.api.model;

import tutmirleid.api.entity.PageEntity;

public class Page {
    private Long id;
    private String link;
    private String title;
    private String alias;

    public static Page toModel(PageEntity entity) {
        Page model = new Page();

        model.setId(entity.getId());
        model.setLink(entity.getLink());
        model.setTitle(entity.getTitle());
        model.setAlias(entity.getAlias());

        return model;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
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
