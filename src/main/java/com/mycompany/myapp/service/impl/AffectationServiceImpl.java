package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Affectation;
import com.mycompany.myapp.repository.AffectationRepository;
import com.mycompany.myapp.service.AffectationService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Affectation}.
 */
@Service
@Transactional
public class AffectationServiceImpl implements AffectationService {

    private final Logger log = LoggerFactory.getLogger(AffectationServiceImpl.class);

    private final AffectationRepository affectationRepository;

    public AffectationServiceImpl(AffectationRepository affectationRepository) {
        this.affectationRepository = affectationRepository;
    }

    @Override
    public Affectation save(Affectation affectation) {
        log.debug("Request to save Affectation : {}", affectation);
        return affectationRepository.save(affectation);
    }

    @Override
    public Optional<Affectation> partialUpdate(Affectation affectation) {
        log.debug("Request to partially update Affectation : {}", affectation);

        return affectationRepository
            .findById(affectation.getId())
            .map(existingAffectation -> {
                if (affectation.getDateAffectation() != null) {
                    existingAffectation.setDateAffectation(affectation.getDateAffectation());
                }
                if (affectation.getQuantite() != null) {
                    existingAffectation.setQuantite(affectation.getQuantite());
                }
                if (affectation.getNom() != null) {
                    existingAffectation.setNom(affectation.getNom());
                }
                if (affectation.getPrenom() != null) {
                    existingAffectation.setPrenom(affectation.getPrenom());
                }
                if (affectation.getCreatedAt() != null) {
                    existingAffectation.setCreatedAt(affectation.getCreatedAt());
                }
                if (affectation.getUpdateAt() != null) {
                    existingAffectation.setUpdateAt(affectation.getUpdateAt());
                }

                return existingAffectation;
            })
            .map(affectationRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Affectation> findAll() {
        log.debug("Request to get all Affectations");
        return affectationRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Affectation> findOne(Long id) {
        log.debug("Request to get Affectation : {}", id);
        return affectationRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Affectation : {}", id);
        affectationRepository.deleteById(id);
    }
}
