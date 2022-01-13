package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Article;
import com.mycompany.myapp.repository.ArticleRepository;
import com.mycompany.myapp.service.ArticleService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Article}.
 */
@Service
@Transactional
public class ArticleServiceImpl implements ArticleService {

    private final Logger log = LoggerFactory.getLogger(ArticleServiceImpl.class);

    private final ArticleRepository articleRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public Article save(Article article) {
        log.debug("Request to save Article : {}", article);
        return articleRepository.save(article);
    }

    @Override
    public Optional<Article> partialUpdate(Article article) {
        log.debug("Request to partially update Article : {}", article);

        return articleRepository
            .findById(article.getId())
            .map(existingArticle -> {
                if (article.getLibelleArticle() != null) {
                    existingArticle.setLibelleArticle(article.getLibelleArticle());
                }
                if (article.getStock() != null) {
                    existingArticle.setStock(article.getStock());
                }
                if (article.getCreatedAt() != null) {
                    existingArticle.setCreatedAt(article.getCreatedAt());
                }
                if (article.getUpdateAt() != null) {
                    existingArticle.setUpdateAt(article.getUpdateAt());
                }

                return existingArticle;
            })
            .map(articleRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Article> findAll() {
        log.debug("Request to get all Articles");
        return articleRepository.findAll();
    }

    /**
     *  Get all the articles where Affectation is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Article> findAllWhereAffectationIsNull() {
        log.debug("Request to get all articles where Affectation is null");
        return StreamSupport
            .stream(articleRepository.findAll().spliterator(), false)
            .filter(article -> article.getAffectation() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Article> findOne(Long id) {
        log.debug("Request to get Article : {}", id);
        return articleRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Article : {}", id);
        articleRepository.deleteById(id);
    }
}
