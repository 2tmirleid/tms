package tutmirleid.api.service;

import org.springframework.stereotype.Service;
import tutmirleid.api.entity.ScenarioEntity;
import tutmirleid.api.entity.ScenarioStepEntity;
import tutmirleid.api.model.Scenario;
import tutmirleid.api.repository.ScenarioRepository;
import tutmirleid.api.utils.exception.ScenarioNotFoundException;

import java.util.Optional;

@Service
public class ScenarioService {
    private final ScenarioRepository scenarioRepository;

    public ScenarioService(ScenarioRepository scenarioRepository) {
        this.scenarioRepository = scenarioRepository;
    }

    protected void ifSteps(ScenarioEntity scenarioEntity) {
        if (scenarioEntity.getSteps() != null) {
            for (ScenarioStepEntity step : scenarioEntity.getSteps()) {
                step.setScenario(scenarioEntity);
            }
        }
    }

    public void createScenario(ScenarioEntity scenarioEntity) {
        ifSteps(scenarioEntity);

        scenarioRepository.save(scenarioEntity);
    }

    public Scenario getScenarioWithSteps(Long id) throws ScenarioNotFoundException {
        Optional<ScenarioEntity> scenario = scenarioRepository.findById(id);

        if (scenario.isEmpty()) {
            throw new ScenarioNotFoundException("Scenario with id " + id + " not found");
        }

        return Scenario.toModel(scenario.get());
    }

    public Scenario updateScenario(Long id, ScenarioEntity updatedScenario) throws ScenarioNotFoundException {
        Optional<ScenarioEntity> scenario = scenarioRepository.findById(id);

        if (scenario.isEmpty()) {
            throw new ScenarioNotFoundException("Scenario with id " + id + " not found");
        }

        ifSteps(updatedScenario);

        updatedScenario.setId(id);

        ScenarioEntity savedEntity = scenarioRepository.save(updatedScenario);

        return Scenario.toModel(savedEntity);
    }

    public void deleteScenario(Long id) throws ScenarioNotFoundException {
        Optional<ScenarioEntity> scenario = scenarioRepository.findById(id);

        if (scenario.isEmpty()) {
            throw new ScenarioNotFoundException("Scenario with id " + id + " not found");
        }

        scenarioRepository.deleteById(id);
    }
}
