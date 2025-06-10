package tutmirleid.api.service;

import org.springframework.stereotype.Service;
import tutmirleid.api.entity.ScenarioEntity;
import tutmirleid.api.entity.ScenarioStepEntity;
import tutmirleid.api.model.Scenario;
import tutmirleid.api.repository.ScenarioRepository;
import tutmirleid.api.utils.exception.ScenarioNotFoundException;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<Scenario> getScenarios() {
        return scenarioRepository.findAll()
                .stream()
                .map(Scenario::toModel)
                .sorted(Comparator.comparing(Scenario::getId))
                .collect(Collectors.toList());
    }

    public Scenario getScenarioWithSteps(Long id) throws ScenarioNotFoundException {
        Optional<ScenarioEntity> scenario = scenarioRepository.findById(id);

        if (scenario.isEmpty()) {
            throw new ScenarioNotFoundException("Scenario with id " + id + " not found");
        }

        return Scenario.toModel(scenario.get());
    }

    public Scenario updateScenario(Long id, ScenarioEntity updatedScenario) throws ScenarioNotFoundException {
        ScenarioEntity existingScenario = scenarioRepository.findById(id)
                .orElseThrow(() -> new ScenarioNotFoundException("Scenario with id " + id + " not found"));

        if (updatedScenario.getTitle() != null) {
            existingScenario.setTitle(updatedScenario.getTitle());
        }

        if (updatedScenario.getDescription() != null) {
            existingScenario.setDescription(updatedScenario.getDescription());
        }

        if (updatedScenario.getPrecondition() != null) {
            existingScenario.setPrecondition(updatedScenario.getPrecondition());
        }

        if (updatedScenario.getSteps() != null) {
            List<ScenarioStepEntity> existingSteps = existingScenario.getSteps();
            existingSteps.clear();
            existingSteps.addAll(updatedScenario.getSteps());

            for (ScenarioStepEntity step : existingSteps) {
                step.setScenario(existingScenario);
            }
        }

        ScenarioEntity savedEntity = scenarioRepository.save(existingScenario);
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
