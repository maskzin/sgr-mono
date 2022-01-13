package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DetailReception;
import com.mycompany.myapp.repository.DetailReceptionRepository;
import com.mycompany.myapp.service.DetailReceptionService;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DetailReception}.
 */
@RestController
@RequestMapping("/api")
public class DetailReceptionResource {

    private final Logger log = LoggerFactory.getLogger(DetailReceptionResource.class);

    private static final String ENTITY_NAME = "detailReception";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetailReceptionService detailReceptionService;

    private final DetailReceptionRepository detailReceptionRepository;

    public DetailReceptionResource(DetailReceptionService detailReceptionService, DetailReceptionRepository detailReceptionRepository) {
        this.detailReceptionService = detailReceptionService;
        this.detailReceptionRepository = detailReceptionRepository;
    }

    /**
     * {@code POST  /detail-receptions} : Create a new detailReception.
     *
     * @param detailReception the detailReception to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detailReception, or with status {@code 400 (Bad Request)} if the detailReception has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detail-receptions")
    public ResponseEntity<DetailReception> createDetailReception(@RequestBody DetailReception detailReception) throws URISyntaxException {
        log.debug("REST request to save DetailReception : {}", detailReception);
        if (detailReception.getId() != null) {
            throw new BadRequestAlertException("A new detailReception cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetailReception result = detailReceptionService.save(detailReception);
        return ResponseEntity
            .created(new URI("/api/detail-receptions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detail-receptions/:id} : Updates an existing detailReception.
     *
     * @param id the id of the detailReception to save.
     * @param detailReception the detailReception to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detailReception,
     * or with status {@code 400 (Bad Request)} if the detailReception is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detailReception couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detail-receptions/{id}")
    public ResponseEntity<DetailReception> updateDetailReception(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DetailReception detailReception
    ) throws URISyntaxException {
        log.debug("REST request to update DetailReception : {}, {}", id, detailReception);
        if (detailReception.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detailReception.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detailReceptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        DetailReception result = detailReceptionService.save(detailReception);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, detailReception.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /detail-receptions/:id} : Partial updates given fields of an existing detailReception, field will ignore if it is null
     *
     * @param id the id of the detailReception to save.
     * @param detailReception the detailReception to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detailReception,
     * or with status {@code 400 (Bad Request)} if the detailReception is not valid,
     * or with status {@code 404 (Not Found)} if the detailReception is not found,
     * or with status {@code 500 (Internal Server Error)} if the detailReception couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/detail-receptions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<DetailReception> partialUpdateDetailReception(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody DetailReception detailReception
    ) throws URISyntaxException {
        log.debug("REST request to partial update DetailReception partially : {}, {}", id, detailReception);
        if (detailReception.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, detailReception.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!detailReceptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<DetailReception> result = detailReceptionService.partialUpdate(detailReception);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, detailReception.getId().toString())
        );
    }

    /**
     * {@code GET  /detail-receptions} : get all the detailReceptions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detailReceptions in body.
     */
    @GetMapping("/detail-receptions")
    public List<DetailReception> getAllDetailReceptions() {
        log.debug("REST request to get all DetailReceptions");
        return detailReceptionService.findAll();
    }

    /**
     * {@code GET  /detail-receptions/:id} : get the "id" detailReception.
     *
     * @param id the id of the detailReception to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detailReception, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detail-receptions/{id}")
    public ResponseEntity<DetailReception> getDetailReception(@PathVariable Long id) {
        log.debug("REST request to get DetailReception : {}", id);
        Optional<DetailReception> detailReception = detailReceptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(detailReception);
    }

    /**
     * {@code DELETE  /detail-receptions/:id} : delete the "id" detailReception.
     *
     * @param id the id of the detailReception to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detail-receptions/{id}")
    public ResponseEntity<Void> deleteDetailReception(@PathVariable Long id) {
        log.debug("REST request to delete DetailReception : {}", id);
        detailReceptionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
