package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Reception;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Reception}.
 */
public interface ReceptionService {
    /**
     * Save a reception.
     *
     * @param reception the entity to save.
     * @return the persisted entity.
     */
    Reception save(Reception reception);

    /**
     * Partially updates a reception.
     *
     * @param reception the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Reception> partialUpdate(Reception reception);

    /**
     * Get all the receptions.
     *
     * @return the list of entities.
     */
    List<Reception> findAll();

    /**
     * Get all the receptions with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Reception> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" reception.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Reception> findOne(Long id);

    /**
     * Delete the "id" reception.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
