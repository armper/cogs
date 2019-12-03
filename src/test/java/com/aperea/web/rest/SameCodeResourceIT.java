package com.aperea.web.rest;

import com.aperea.CogsApp;
import com.aperea.domain.SameCode;
import com.aperea.repository.SameCodeRepository;
import com.aperea.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.aperea.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SameCodeResource} REST controller.
 */
@SpringBootTest(classes = CogsApp.class)
public class SameCodeResourceIT {

    private static final String DEFAULT_SAME_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SAME_CODE = "BBBBBBBBBB";

    @Autowired
    private SameCodeRepository sameCodeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restSameCodeMockMvc;

    private SameCode sameCode;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SameCodeResource sameCodeResource = new SameCodeResource(sameCodeRepository);
        this.restSameCodeMockMvc = MockMvcBuilders.standaloneSetup(sameCodeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SameCode createEntity(EntityManager em) {
        SameCode sameCode = new SameCode()
            .sameCode(DEFAULT_SAME_CODE);
        return sameCode;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SameCode createUpdatedEntity(EntityManager em) {
        SameCode sameCode = new SameCode()
            .sameCode(UPDATED_SAME_CODE);
        return sameCode;
    }

    @BeforeEach
    public void initTest() {
        sameCode = createEntity(em);
    }

    @Test
    @Transactional
    public void createSameCode() throws Exception {
        int databaseSizeBeforeCreate = sameCodeRepository.findAll().size();

        // Create the SameCode
        restSameCodeMockMvc.perform(post("/api/same-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sameCode)))
            .andExpect(status().isCreated());

        // Validate the SameCode in the database
        List<SameCode> sameCodeList = sameCodeRepository.findAll();
        assertThat(sameCodeList).hasSize(databaseSizeBeforeCreate + 1);
        SameCode testSameCode = sameCodeList.get(sameCodeList.size() - 1);
        assertThat(testSameCode.getSameCode()).isEqualTo(DEFAULT_SAME_CODE);
    }

    @Test
    @Transactional
    public void createSameCodeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sameCodeRepository.findAll().size();

        // Create the SameCode with an existing ID
        sameCode.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSameCodeMockMvc.perform(post("/api/same-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sameCode)))
            .andExpect(status().isBadRequest());

        // Validate the SameCode in the database
        List<SameCode> sameCodeList = sameCodeRepository.findAll();
        assertThat(sameCodeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSameCodes() throws Exception {
        // Initialize the database
        sameCodeRepository.saveAndFlush(sameCode);

        // Get all the sameCodeList
        restSameCodeMockMvc.perform(get("/api/same-codes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sameCode.getId().intValue())))
            .andExpect(jsonPath("$.[*].sameCode").value(hasItem(DEFAULT_SAME_CODE)));
    }
    
    @Test
    @Transactional
    public void getSameCode() throws Exception {
        // Initialize the database
        sameCodeRepository.saveAndFlush(sameCode);

        // Get the sameCode
        restSameCodeMockMvc.perform(get("/api/same-codes/{id}", sameCode.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sameCode.getId().intValue()))
            .andExpect(jsonPath("$.sameCode").value(DEFAULT_SAME_CODE));
    }

    @Test
    @Transactional
    public void getNonExistingSameCode() throws Exception {
        // Get the sameCode
        restSameCodeMockMvc.perform(get("/api/same-codes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSameCode() throws Exception {
        // Initialize the database
        sameCodeRepository.saveAndFlush(sameCode);

        int databaseSizeBeforeUpdate = sameCodeRepository.findAll().size();

        // Update the sameCode
        SameCode updatedSameCode = sameCodeRepository.findById(sameCode.getId()).get();
        // Disconnect from session so that the updates on updatedSameCode are not directly saved in db
        em.detach(updatedSameCode);
        updatedSameCode
            .sameCode(UPDATED_SAME_CODE);

        restSameCodeMockMvc.perform(put("/api/same-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSameCode)))
            .andExpect(status().isOk());

        // Validate the SameCode in the database
        List<SameCode> sameCodeList = sameCodeRepository.findAll();
        assertThat(sameCodeList).hasSize(databaseSizeBeforeUpdate);
        SameCode testSameCode = sameCodeList.get(sameCodeList.size() - 1);
        assertThat(testSameCode.getSameCode()).isEqualTo(UPDATED_SAME_CODE);
    }

    @Test
    @Transactional
    public void updateNonExistingSameCode() throws Exception {
        int databaseSizeBeforeUpdate = sameCodeRepository.findAll().size();

        // Create the SameCode

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSameCodeMockMvc.perform(put("/api/same-codes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sameCode)))
            .andExpect(status().isBadRequest());

        // Validate the SameCode in the database
        List<SameCode> sameCodeList = sameCodeRepository.findAll();
        assertThat(sameCodeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSameCode() throws Exception {
        // Initialize the database
        sameCodeRepository.saveAndFlush(sameCode);

        int databaseSizeBeforeDelete = sameCodeRepository.findAll().size();

        // Delete the sameCode
        restSameCodeMockMvc.perform(delete("/api/same-codes/{id}", sameCode.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SameCode> sameCodeList = sameCodeRepository.findAll();
        assertThat(sameCodeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
