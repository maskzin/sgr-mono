package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.DetailReception;
import com.mycompany.myapp.repository.DetailReceptionRepository;
import com.mycompany.myapp.service.DetailReceptionService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link DetailReception}.
 */
@Service
@Transactional
public class DetailReceptionServiceImpl implements DetailReceptionService {

    private final Logger log = LoggerFactory.getLogger(DetailReceptionServiceImpl.class);

    private final DetailReceptionRepository detailReceptionRepository;

    public DetailReceptionServiceImpl(DetailReceptionRepository detailReceptionRepository) {
        this.detailReceptionRepository = detailReceptionRepository;
    }

    @Override
    public DetailReception save(DetailReception detailReception) {
        log.debug("Request to save DetailReception : {}", detailReception);
        return detailReceptionRepository.save(detailReception);
    }

    @Override
    public Optional<DetailReception> partialUpdate(DetailReception detailReception) {
        log.debug("Request to partially update DetailReception : {}", detailReception);

        return detailReceptionRepository
            .findById(detailReception.getId())
            .map(existingDetailReception -> {
                if (detailReception.getCaracteristique() != null) {
                    existingDetailReception.setCaracteristique(detailReception.getCaracteristique());
                }
                if (detailReception.getQuantiteArticle() != null) {
                    existingDetailReception.setQuantiteArticle(detailReception.getQuantiteArticle());
                }
                if (detailReception.getNumeroSerie() != null) {
                    existingDetailReception.setNumeroSerie(detailReception.getNumeroSerie());
                }
                if (detailReception.getStatus() != null) {
                    existingDetailReception.setStatus(detailReception.getStatus());
                }

                return existingDetailReception;
            })
            .map(detailReceptionRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DetailReception> findAll() {
        log.debug("Request to get all DetailReceptions");
        return detailReceptionRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<DetailReception> findOne(Long id) {
        log.debug("Request to get DetailReception : {}", id);
        return detailReceptionRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete DetailReception : {}", id);
        detailReceptionRepository.deleteById(id);
    }
}
