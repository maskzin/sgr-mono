package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.DetailReception;
import com.mycompany.myapp.repository.DetailReceptionRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link DetailReceptionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DetailReceptionResourceIT {

    private static final String DEFAULT_CARACTERISTIQUE = "AAAAAAAAAA";
    private static final String UPDATED_CARACTERISTIQUE = "BBBBBBBBBB";

    private static final Long DEFAULT_QUANTITE_ARTICLE = 1L;
    private static final Long UPDATED_QUANTITE_ARTICLE = 2L;

    private static final String DEFAULT_NUMERO_SERIE = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_SERIE = "BBBBBBBBBB";

    private static final Integer DEFAULT_STATUS = 1;
    private static final Integer UPDATED_STATUS = 2;

    private static final String ENTITY_API_URL = "/api/detail-receptions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DetailReceptionRepository detailReceptionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDetailReceptionMockMvc;

    private DetailReception detailReception;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetailReception createEntity(EntityManager em) {
        DetailReception detailReception = new DetailReception()
            .caracteristique(DEFAULT_CARACTERISTIQUE)
            .quantiteArticle(DEFAULT_QUANTITE_ARTICLE)
            .numeroSerie(DEFAULT_NUMERO_SERIE)
            .status(DEFAULT_STATUS);
        return detailReception;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetailReception createUpdatedEntity(EntityManager em) {
        DetailReception detailReception = new DetailReception()
            .caracteristique(UPDATED_CARACTERISTIQUE)
            .quantiteArticle(UPDATED_QUANTITE_ARTICLE)
            .numeroSerie(UPDATED_NUMERO_SERIE)
            .status(UPDATED_STATUS);
        return detailReception;
    }

    @BeforeEach
    public void initTest() {
        detailReception = createEntity(em);
    }

    @Test
    @Transactional
    void createDetailReception() throws Exception {
        int databaseSizeBeforeCreate = detailReceptionRepository.findAll().size();
        // Create the DetailReception
        restDetailReceptionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detailReception))
            )
            .andExpect(status().isCreated());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeCreate + 1);
        DetailReception testDetailReception = detailReceptionList.get(detailReceptionList.size() - 1);
        assertThat(testDetailReception.getCaracteristique()).isEqualTo(DEFAULT_CARACTERISTIQUE);
        assertThat(testDetailReception.getQuantiteArticle()).isEqualTo(DEFAULT_QUANTITE_ARTICLE);
        assertThat(testDetailReception.getNumeroSerie()).isEqualTo(DEFAULT_NUMERO_SERIE);
        assertThat(testDetailReception.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void createDetailReceptionWithExistingId() throws Exception {
        // Create the DetailReception with an existing ID
        detailReception.setId(1L);

        int databaseSizeBeforeCreate = detailReceptionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetailReceptionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detailReception))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDetailReceptions() throws Exception {
        // Initialize the database
        detailReceptionRepository.saveAndFlush(detailReception);

        // Get all the detailReceptionList
        restDetailReceptionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detailReception.getId().intValue())))
            .andExpect(jsonPath("$.[*].caracteristique").value(hasItem(DEFAULT_CARACTERISTIQUE)))
            .andExpect(jsonPath("$.[*].quantiteArticle").value(hasItem(DEFAULT_QUANTITE_ARTICLE.intValue())))
            .andExpect(jsonPath("$.[*].numeroSerie").value(hasItem(DEFAULT_NUMERO_SERIE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)));
    }

    @Test
    @Transactional
    void getDetailReception() throws Exception {
        // Initialize the database
        detailReceptionRepository.saveAndFlush(detailReception);

        // Get the detailReception
        restDetailReceptionMockMvc
            .perform(get(ENTITY_API_URL_ID, detailReception.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(detailReception.getId().intValue()))
            .andExpect(jsonPath("$.caracteristique").value(DEFAULT_CARACTERISTIQUE))
            .andExpect(jsonPath("$.quantiteArticle").value(DEFAULT_QUANTITE_ARTICLE.intValue()))
            .andExpect(jsonPath("$.numeroSerie").value(DEFAULT_NUMERO_SERIE))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS));
    }

    @Test
    @Transactional
    void getNonExistingDetailReception() throws Exception {
        // Get the detailReception
        restDetailReceptionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewDetailReception() throws Exception {
        // Initialize the database
        detailReceptionRepository.saveAndFlush(detailReception);

        int databaseSizeBeforeUpdate = detailReceptionRepository.findAll().size();

        // Update the detailReception
        DetailReception updatedDetailReception = detailReceptionRepository.findById(detailReception.getId()).get();
        // Disconnect from session so that the updates on updatedDetailReception are not directly saved in db
        em.detach(updatedDetailReception);
        updatedDetailReception
            .caracteristique(UPDATED_CARACTERISTIQUE)
            .quantiteArticle(UPDATED_QUANTITE_ARTICLE)
            .numeroSerie(UPDATED_NUMERO_SERIE)
            .status(UPDATED_STATUS);

        restDetailReceptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDetailReception.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDetailReception))
            )
            .andExpect(status().isOk());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeUpdate);
        DetailReception testDetailReception = detailReceptionList.get(detailReceptionList.size() - 1);
        assertThat(testDetailReception.getCaracteristique()).isEqualTo(UPDATED_CARACTERISTIQUE);
        assertThat(testDetailReception.getQuantiteArticle()).isEqualTo(UPDATED_QUANTITE_ARTICLE);
        assertThat(testDetailReception.getNumeroSerie()).isEqualTo(UPDATED_NUMERO_SERIE);
        assertThat(testDetailReception.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void putNonExistingDetailReception() throws Exception {
        int databaseSizeBeforeUpdate = detailReceptionRepository.findAll().size();
        detailReception.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetailReceptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, detailReception.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detailReception))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDetailReception() throws Exception {
        int databaseSizeBeforeUpdate = detailReceptionRepository.findAll().size();
        detailReception.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetailReceptionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(detailReception))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDetailReception() throws Exception {
        int databaseSizeBeforeUpdate = detailReceptionRepository.findAll().size();
        detailReception.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetailReceptionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(detailReception))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDetailReceptionWithPatch() throws Exception {
        // Initialize the database
        detailReceptionRepository.saveAndFlush(detailReception);

        int databaseSizeBeforeUpdate = detailReceptionRepository.findAll().size();

        // Update the detailReception using partial update
        DetailReception partialUpdatedDetailReception = new DetailReception();
        partialUpdatedDetailReception.setId(detailReception.getId());

        partialUpdatedDetailReception.caracteristique(UPDATED_CARACTERISTIQUE).quantiteArticle(UPDATED_QUANTITE_ARTICLE);

        restDetailReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetailReception.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetailReception))
            )
            .andExpect(status().isOk());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeUpdate);
        DetailReception testDetailReception = detailReceptionList.get(detailReceptionList.size() - 1);
        assertThat(testDetailReception.getCaracteristique()).isEqualTo(UPDATED_CARACTERISTIQUE);
        assertThat(testDetailReception.getQuantiteArticle()).isEqualTo(UPDATED_QUANTITE_ARTICLE);
        assertThat(testDetailReception.getNumeroSerie()).isEqualTo(DEFAULT_NUMERO_SERIE);
        assertThat(testDetailReception.getStatus()).isEqualTo(DEFAULT_STATUS);
    }

    @Test
    @Transactional
    void fullUpdateDetailReceptionWithPatch() throws Exception {
        // Initialize the database
        detailReceptionRepository.saveAndFlush(detailReception);

        int databaseSizeBeforeUpdate = detailReceptionRepository.findAll().size();

        // Update the detailReception using partial update
        DetailReception partialUpdatedDetailReception = new DetailReception();
        partialUpdatedDetailReception.setId(detailReception.getId());

        partialUpdatedDetailReception
            .caracteristique(UPDATED_CARACTERISTIQUE)
            .quantiteArticle(UPDATED_QUANTITE_ARTICLE)
            .numeroSerie(UPDATED_NUMERO_SERIE)
            .status(UPDATED_STATUS);

        restDetailReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDetailReception.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDetailReception))
            )
            .andExpect(status().isOk());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeUpdate);
        DetailReception testDetailReception = detailReceptionList.get(detailReceptionList.size() - 1);
        assertThat(testDetailReception.getCaracteristique()).isEqualTo(UPDATED_CARACTERISTIQUE);
        assertThat(testDetailReception.getQuantiteArticle()).isEqualTo(UPDATED_QUANTITE_ARTICLE);
        assertThat(testDetailReception.getNumeroSerie()).isEqualTo(UPDATED_NUMERO_SERIE);
        assertThat(testDetailReception.getStatus()).isEqualTo(UPDATED_STATUS);
    }

    @Test
    @Transactional
    void patchNonExistingDetailReception() throws Exception {
        int databaseSizeBeforeUpdate = detailReceptionRepository.findAll().size();
        detailReception.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetailReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, detailReception.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detailReception))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDetailReception() throws Exception {
        int databaseSizeBeforeUpdate = detailReceptionRepository.findAll().size();
        detailReception.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetailReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detailReception))
            )
            .andExpect(status().isBadRequest());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDetailReception() throws Exception {
        int databaseSizeBeforeUpdate = detailReceptionRepository.findAll().size();
        detailReception.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDetailReceptionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(detailReception))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the DetailReception in the database
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDetailReception() throws Exception {
        // Initialize the database
        detailReceptionRepository.saveAndFlush(detailReception);

        int databaseSizeBeforeDelete = detailReceptionRepository.findAll().size();

        // Delete the detailReception
        restDetailReceptionMockMvc
            .perform(delete(ENTITY_API_URL_ID, detailReception.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetailReception> detailReceptionList = detailReceptionRepository.findAll();
        assertThat(detailReceptionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
