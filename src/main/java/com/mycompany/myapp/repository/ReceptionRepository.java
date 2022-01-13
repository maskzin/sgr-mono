package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Reception;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Reception entity.
 */
@Repository
public interface ReceptionRepository extends JpaRepository<Reception, Long> {
    @Query(
        value = "select distinct reception from Reception reception left join fetch reception.articles",
        countQuery = "select count(distinct reception) from Reception reception"
    )
    Page<Reception> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct reception from Reception reception left join fetch reception.articles")
    List<Reception> findAllWithEagerRelationships();

    @Query("select reception from Reception reception left join fetch reception.articles where reception.id =:id")
    Optional<Reception> findOneWithEagerRelationships(@Param("id") Long id);
}
