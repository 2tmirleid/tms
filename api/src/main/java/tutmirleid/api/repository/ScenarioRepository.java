package tutmirleid.api.repository;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tutmirleid.api.dto.ScenarioWithStepsDTO;
import tutmirleid.api.entity.ScenarioEntity;

import java.util.List;

public interface ScenarioRepository extends CrudRepository<ScenarioEntity, Long> {
    @Query(value = """
                SELECT
                            s.id AS scenarioId,
                            s.title AS scenarioTitle,
                            s.description AS scenarioDescription,
                            s.precondition AS scenarioPrecondition,
                            ss.id AS stepId,
                            ss.step AS stepText,
                            ss.expected_result AS expectedResult
                        FROM scenario s
                        JOIN scenario_step ss ON s.id = ss.scenario_id
                        ORDER BY s.id, ss.id
            """, nativeQuery = true)
    List<ScenarioWithStepsDTO> getScenarioWithSteps();

    @Override
    List<ScenarioEntity> findAll();
}
