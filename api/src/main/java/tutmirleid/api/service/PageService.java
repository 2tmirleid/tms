package tutmirleid.api.service;

import org.springframework.stereotype.Service;
import tutmirleid.api.entity.PageEntity;
import tutmirleid.api.model.Page;
import tutmirleid.api.model.Scenario;
import tutmirleid.api.repository.PageRepository;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PageService {
    private final PageRepository pageRepository;

    public PageService(PageRepository pageRepository) {
        this.pageRepository = pageRepository;
    }

    public List<PageEntity> getPages() {
        return pageRepository.findAll();
    }
}
