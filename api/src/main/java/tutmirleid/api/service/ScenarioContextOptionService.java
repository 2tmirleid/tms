package tutmirleid.api.service;

import org.springframework.stereotype.Service;
import tutmirleid.api.entity.ScenarioContextOptionEntity;
import tutmirleid.api.repository.ScenarioContextOptionRepository;

import java.util.List;

@Service
public class ScenarioContextOptionService {
    private final ScenarioContextOptionRepository scenarioContextOptionRepository;

    public ScenarioContextOptionService(ScenarioContextOptionRepository scenarioContextOptionRepository) {
        this.scenarioContextOptionRepository = scenarioContextOptionRepository;
    }

    public List<ScenarioContextOptionEntity> getOptions() {
        return scenarioContextOptionRepository.findAll();
    }
}
