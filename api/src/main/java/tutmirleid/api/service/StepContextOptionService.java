package tutmirleid.api.service;

import org.springframework.stereotype.Service;
import tutmirleid.api.entity.ScenarioContextOptionEntity;
import tutmirleid.api.entity.StepContextOptionEntity;
import tutmirleid.api.repository.StepContextOptionRepository;

import java.util.List;

@Service
public class StepContextOptionService {
    private final StepContextOptionRepository stepContextOptionRepository;

    public StepContextOptionService(StepContextOptionRepository stepContextOptionRepository) {
        this.stepContextOptionRepository = stepContextOptionRepository;
    }

    public List<StepContextOptionEntity> getOptions() {
        return stepContextOptionRepository.findAll();
    }
}
