package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Fournisseur;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Fournisseur}.
 */
public interface FournisseurService {
    /**
     * Save a fournisseur.
     *
     * @param fournisseur the entity to save.
     * @return the persisted entity.
     */
    Fournisseur save(Fournisseur fournisseur);

    /**
     * Partially updates a fournisseur.
     *
     * @param fournisseur the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Fournisseur> partialUpdate(Fournisseur fournisseur);

    /**
     * Get all the fournisseurs.
     *
     * @return the list of entities.
     */
    List<Fournisseur> findAll();

    /**
     * Get the "id" fournisseur.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Fournisseur> findOne(Long id);

    /**
     * Delete the "id" fournisseur.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
