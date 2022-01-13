package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Affectation;
import com.mycompany.myapp.repository.AffectationRepository;
import com.mycompany.myapp.service.AffectationService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Affectation}.
 */
@RestController
@RequestMapping("/api")
public class AffectationResource {

    private final Logger log = LoggerFactory.getLogger(AffectationResource.class);

    private static final String ENTITY_NAME = "affectation";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AffectationService affectationService;

    private final AffectationRepository affectationRepository;

    public AffectationResource(AffectationService affectationService, AffectationRepository affectationRepository) {
        this.affectationService = affectationService;
        this.affectationRepository = affectationRepository;
    }

    /**
     * {@code POST  /affectations} : Create a new affectation.
     *
     * @param affectation the affectation to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new affectation, or with status {@code 400 (Bad Request)} if the affectation has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/affectations")
    public ResponseEntity<Affectation> createAffectation(@RequestBody Affectation affectation) throws URISyntaxException {
        log.debug("REST request to save Affectation : {}", affectation);
        if (affectation.getId() != null) {
            throw new BadRequestAlertException("A new affectation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Affectation result = affectationService.save(affectation);
        return ResponseEntity
            .created(new URI("/api/affectations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /affectations/:id} : Updates an existing affectation.
     *
     * @param id the id of the affectation to save.
     * @param affectation the affectation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated affectation,
     * or with status {@code 400 (Bad Request)} if the affectation is not valid,
     * or with status {@code 500 (Internal Server Error)} if the affectation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/affectations/{id}")
    public ResponseEntity<Affectation> updateAffectation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Affectation affectation
    ) throws URISyntaxException {
        log.debug("REST request to update Affectation : {}, {}", id, affectation);
        if (affectation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, affectation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!affectationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Affectation result = affectationService.save(affectation);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, affectation.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /affectations/:id} : Partial updates given fields of an existing affectation, field will ignore if it is null
     *
     * @param id the id of the affectation to save.
     * @param affectation the affectation to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated affectation,
     * or with status {@code 400 (Bad Request)} if the affectation is not valid,
     * or with status {@code 404 (Not Found)} if the affectation is not found,
     * or with status {@code 500 (Internal Server Error)} if the affectation couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/affectations/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Affectation> partialUpdateAffectation(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Affectation affectation
    ) throws URISyntaxException {
        log.debug("REST request to partial update Affectation partially : {}, {}", id, affectation);
        if (affectation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, affectation.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!affectationRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Affectation> result = affectationService.partialUpdate(affectation);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, affectation.getId().toString())
        );
    }

    /**
     * {@code GET  /affectations} : get all the affectations.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of affectations in body.
     */
    @GetMapping("/affectations")
    public List<Affectation> getAllAffectations() {
        log.debug("REST request to get all Affectations");
        return affectationService.findAll();
    }

    /**
     * {@code GET  /affectations/:id} : get the "id" affectation.
     *
     * @param id the id of the affectation to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the affectation, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/affectations/{id}")
    public ResponseEntity<Affectation> getAffectation(@PathVariable Long id) {
        log.debug("REST request to get Affectation : {}", id);
        Optional<Affectation> affectation = affectationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(affectation);
    }

    /**
     * {@code DELETE  /affectations/:id} : delete the "id" affectation.
     *
     * @param id the id of the affectation to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/affectations/{id}")
    public ResponseEntity<Void> deleteAffectation(@PathVariable Long id) {
        log.debug("REST request to delete Affectation : {}", id);
        affectationService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
