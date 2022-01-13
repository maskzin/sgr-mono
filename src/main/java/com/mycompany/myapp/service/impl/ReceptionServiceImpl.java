package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Reception;
import com.mycompany.myapp.repository.ReceptionRepository;
import com.mycompany.myapp.service.ReceptionService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Reception}.
 */
@Service
@Transactional
public class ReceptionServiceImpl implements ReceptionService {

    private final Logger log = LoggerFactory.getLogger(ReceptionServiceImpl.class);

    private final ReceptionRepository receptionRepository;

    public ReceptionServiceImpl(ReceptionRepository receptionRepository) {
        this.receptionRepository = receptionRepository;
    }

    @Override
    public Reception save(Reception reception) {
        log.debug("Request to save Reception : {}", reception);
        return receptionRepository.save(reception);
    }

    @Override
    public Optional<Reception> partialUpdate(Reception reception) {
        log.debug("Request to partially update Reception : {}", reception);

        return receptionRepository
            .findById(reception.getId())
            .map(existingReception -> {
                if (reception.getNumContrat() != null) {
                    existingReception.setNumContrat(reception.getNumContrat());
                }
                if (reception.getCaracteristique() != null) {
                    existingReception.setCaracteristique(reception.getCaracteristique());
                }
                if (reception.getQuantiteArticle() != null) {
                    existingReception.setQuantiteArticle(reception.getQuantiteArticle());
                }
                if (reception.getNumeroSerie() != null) {
                    existingReception.setNumeroSerie(reception.getNumeroSerie());
                }
                if (reception.getStatus() != null) {
                    existingReception.setStatus(reception.getStatus());
                }
                if (reception.getDateContrat() != null) {
                    existingReception.setDateContrat(reception.getDateContrat());
                }
                if (reception.getDateReception() != null) {
                    existingReception.setDateReception(reception.getDateReception());
                }
                if (reception.getCreatedAt() != null) {
                    existingReception.setCreatedAt(reception.getCreatedAt());
                }
                if (reception.getUpdateAt() != null) {
                    existingReception.setUpdateAt(reception.getUpdateAt());
                }

                return existingReception;
            })
            .map(receptionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Reception> findAll() {
        log.debug("Request to get all Receptions");
        return receptionRepository.findAllWithEagerRelationships();
    }

    public Page<Reception> findAllWithEagerRelationships(Pageable pageable) {
        return receptionRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Reception> findOne(Long id) {
        log.debug("Request to get Reception : {}", id);
        return receptionRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reception : {}", id);
        receptionRepository.deleteById(id);
    }
}
