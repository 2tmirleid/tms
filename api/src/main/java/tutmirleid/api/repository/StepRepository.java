package tutmirleid.api.repository;

import org.springframework.data.repository.CrudRepository;
import tutmirleid.api.entity.ScenarioStepEntity;

public interface StepRepository extends CrudRepository<ScenarioStepEntity, Long> {}
