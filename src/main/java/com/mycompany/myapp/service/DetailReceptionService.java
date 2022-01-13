package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.DetailReception;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link DetailReception}.
 */
public interface DetailReceptionService {
    /**
     * Save a detailReception.
     *
     * @param detailReception the entity to save.
     * @return the persisted entity.
     */
    DetailReception save(DetailReception detailReception);

    /**
     * Partially updates a detailReception.
     *
     * @param detailReception the entity to update partially.
     * @return the persisted entity.
     */
    Optional<DetailReception> partialUpdate(DetailReception detailReception);

    /**
     * Get all the detailReceptions.
     *
     * @return the list of entities.
     */
    List<DetailReception> findAll();

    /**
     * Get the "id" detailReception.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DetailReception> findOne(Long id);

    /**
     * Delete the "id" detailReception.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
