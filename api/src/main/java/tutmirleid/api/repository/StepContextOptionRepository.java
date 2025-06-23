package tutmirleid.api.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tutmirleid.api.entity.StepContextOptionEntity;

import java.util.List;

public interface StepContextOptionRepository extends CrudRepository<StepContextOptionEntity, Long> {
    @Override
    @Query(value = """
                SELECT * FROM step_context_option ORDER BY id ASC
            """, nativeQuery = true)
    List<StepContextOptionEntity> findAll();
}
