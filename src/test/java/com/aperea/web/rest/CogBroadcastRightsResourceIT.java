package com.aperea.web.rest;

import com.aperea.CogsApp;
import com.aperea.domain.CogBroadcastRights;
import com.aperea.repository.CogBroadcastRightsRepository;
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
 * Integration tests for the {@link CogBroadcastRightsResource} REST controller.
 */
@SpringBootTest(classes = CogsApp.class)
public class CogBroadcastRightsResourceIT {

    private static final String DEFAULT_COG_ID = "AAAAAAAAAA";
    private static final String UPDATED_COG_ID = "BBBBBBBBBB";

    @Autowired
    private CogBroadcastRightsRepository cogBroadcastRightsRepository;

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

    private MockMvc restCogBroadcastRightsMockMvc;

    private CogBroadcastRights cogBroadcastRights;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CogBroadcastRightsResource cogBroadcastRightsResource = new CogBroadcastRightsResource(cogBroadcastRightsRepository);
        this.restCogBroadcastRightsMockMvc = MockMvcBuilders.standaloneSetup(cogBroadcastRightsResource)
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
    public static CogBroadcastRights createEntity(EntityManager em) {
        CogBroadcastRights cogBroadcastRights = new CogBroadcastRights()
            .cogId(DEFAULT_COG_ID);
        return cogBroadcastRights;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CogBroadcastRights createUpdatedEntity(EntityManager em) {
        CogBroadcastRights cogBroadcastRights = new CogBroadcastRights()
            .cogId(UPDATED_COG_ID);
        return cogBroadcastRights;
    }

    @BeforeEach
    public void initTest() {
        cogBroadcastRights = createEntity(em);
    }

    @Test
    @Transactional
    public void createCogBroadcastRights() throws Exception {
        int databaseSizeBeforeCreate = cogBroadcastRightsRepository.findAll().size();

        // Create the CogBroadcastRights
        restCogBroadcastRightsMockMvc.perform(post("/api/cog-broadcast-rights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cogBroadcastRights)))
            .andExpect(status().isCreated());

        // Validate the CogBroadcastRights in the database
        List<CogBroadcastRights> cogBroadcastRightsList = cogBroadcastRightsRepository.findAll();
        assertThat(cogBroadcastRightsList).hasSize(databaseSizeBeforeCreate + 1);
        CogBroadcastRights testCogBroadcastRights = cogBroadcastRightsList.get(cogBroadcastRightsList.size() - 1);
        assertThat(testCogBroadcastRights.getCogId()).isEqualTo(DEFAULT_COG_ID);
    }

    @Test
    @Transactional
    public void createCogBroadcastRightsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cogBroadcastRightsRepository.findAll().size();

        // Create the CogBroadcastRights with an existing ID
        cogBroadcastRights.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCogBroadcastRightsMockMvc.perform(post("/api/cog-broadcast-rights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cogBroadcastRights)))
            .andExpect(status().isBadRequest());

        // Validate the CogBroadcastRights in the database
        List<CogBroadcastRights> cogBroadcastRightsList = cogBroadcastRightsRepository.findAll();
        assertThat(cogBroadcastRightsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCogBroadcastRights() throws Exception {
        // Initialize the database
        cogBroadcastRightsRepository.saveAndFlush(cogBroadcastRights);

        // Get all the cogBroadcastRightsList
        restCogBroadcastRightsMockMvc.perform(get("/api/cog-broadcast-rights?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cogBroadcastRights.getId().intValue())))
            .andExpect(jsonPath("$.[*].cogId").value(hasItem(DEFAULT_COG_ID)));
    }
    
    @Test
    @Transactional
    public void getCogBroadcastRights() throws Exception {
        // Initialize the database
        cogBroadcastRightsRepository.saveAndFlush(cogBroadcastRights);

        // Get the cogBroadcastRights
        restCogBroadcastRightsMockMvc.perform(get("/api/cog-broadcast-rights/{id}", cogBroadcastRights.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(cogBroadcastRights.getId().intValue()))
            .andExpect(jsonPath("$.cogId").value(DEFAULT_COG_ID));
    }

    @Test
    @Transactional
    public void getNonExistingCogBroadcastRights() throws Exception {
        // Get the cogBroadcastRights
        restCogBroadcastRightsMockMvc.perform(get("/api/cog-broadcast-rights/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCogBroadcastRights() throws Exception {
        // Initialize the database
        cogBroadcastRightsRepository.saveAndFlush(cogBroadcastRights);

        int databaseSizeBeforeUpdate = cogBroadcastRightsRepository.findAll().size();

        // Update the cogBroadcastRights
        CogBroadcastRights updatedCogBroadcastRights = cogBroadcastRightsRepository.findById(cogBroadcastRights.getId()).get();
        // Disconnect from session so that the updates on updatedCogBroadcastRights are not directly saved in db
        em.detach(updatedCogBroadcastRights);
        updatedCogBroadcastRights
            .cogId(UPDATED_COG_ID);

        restCogBroadcastRightsMockMvc.perform(put("/api/cog-broadcast-rights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCogBroadcastRights)))
            .andExpect(status().isOk());

        // Validate the CogBroadcastRights in the database
        List<CogBroadcastRights> cogBroadcastRightsList = cogBroadcastRightsRepository.findAll();
        assertThat(cogBroadcastRightsList).hasSize(databaseSizeBeforeUpdate);
        CogBroadcastRights testCogBroadcastRights = cogBroadcastRightsList.get(cogBroadcastRightsList.size() - 1);
        assertThat(testCogBroadcastRights.getCogId()).isEqualTo(UPDATED_COG_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingCogBroadcastRights() throws Exception {
        int databaseSizeBeforeUpdate = cogBroadcastRightsRepository.findAll().size();

        // Create the CogBroadcastRights

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCogBroadcastRightsMockMvc.perform(put("/api/cog-broadcast-rights")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(cogBroadcastRights)))
            .andExpect(status().isBadRequest());

        // Validate the CogBroadcastRights in the database
        List<CogBroadcastRights> cogBroadcastRightsList = cogBroadcastRightsRepository.findAll();
        assertThat(cogBroadcastRightsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCogBroadcastRights() throws Exception {
        // Initialize the database
        cogBroadcastRightsRepository.saveAndFlush(cogBroadcastRights);

        int databaseSizeBeforeDelete = cogBroadcastRightsRepository.findAll().size();

        // Delete the cogBroadcastRights
        restCogBroadcastRightsMockMvc.perform(delete("/api/cog-broadcast-rights/{id}", cogBroadcastRights.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CogBroadcastRights> cogBroadcastRightsList = cogBroadcastRightsRepository.findAll();
        assertThat(cogBroadcastRightsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
