package tutmirleid.api.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tutmirleid.api.entity.ScenarioContextOptionEntity;

import java.util.List;

public interface ScenarioContextOptionRepository extends CrudRepository<ScenarioContextOptionEntity, Long> {
    @Override
    @Query(value = """
                SELECT * FROM scenario_context_option ORDER BY id ASC
            """, nativeQuery = true)
    List<ScenarioContextOptionEntity> findAll();
}
