package tutmirleid.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import tutmirleid.api.entity.PageEntity;

import java.util.List;

public interface PageRepository extends CrudRepository<PageEntity, Long> {
    @Override
    @Query(value = """
                SELECT * FROM page ORDER BY id ASC
            """, nativeQuery = true)
    List<PageEntity> findAll();
}
