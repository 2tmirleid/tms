package tutmirleid.api.service;

import org.springframework.stereotype.Service;
import tutmirleid.api.repository.StepRepository;

@Service
public class StepService {
    private final StepRepository stepRepository;

    public StepService(StepRepository stepRepository) {
        this.stepRepository = stepRepository;
    }

    public void deleteStep(Long id) {
//        Optional<ScenarioStepEntity> step = stepRepository.findById(id);

        stepRepository.deleteById(id);
    }
}
