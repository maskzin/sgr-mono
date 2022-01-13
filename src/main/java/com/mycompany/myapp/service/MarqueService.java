package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Marque;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Marque}.
 */
public interface MarqueService {
    /**
     * Save a marque.
     *
     * @param marque the entity to save.
     * @return the persisted entity.
     */
    Marque save(Marque marque);

    /**
     * Partially updates a marque.
     *
     * @param marque the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Marque> partialUpdate(Marque marque);

    /**
     * Get all the marques.
     *
     * @return the list of entities.
     */
    List<Marque> findAll();

    /**
     * Get the "id" marque.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Marque> findOne(Long id);

    /**
     * Delete the "id" marque.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
