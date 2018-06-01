package com.cidades.gov.sicub.web.rest;

import com.cidades.gov.sicub.SicubApp;

import com.cidades.gov.sicub.domain.Servidores;
import com.cidades.gov.sicub.repository.ServidoresRepository;
import com.cidades.gov.sicub.repository.search.ServidoresSearchRepository;
import com.cidades.gov.sicub.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.cidades.gov.sicub.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cidades.gov.sicub.domain.enumeration.Sgdb;
import com.cidades.gov.sicub.domain.enumeration.Tipo;
/**
 * Test class for the ServidoresResource REST controller.
 *
 * @see ServidoresResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SicubApp.class)
public class ServidoresResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final Sgdb DEFAULT_SGDB = Sgdb.MYSQL;
    private static final Sgdb UPDATED_SGDB = Sgdb.MARIADB;

    private static final Tipo DEFAULT_TIPO = Tipo.HOMOLOGACAO;
    private static final Tipo UPDATED_TIPO = Tipo.PRODUCAO;

    @Autowired
    private ServidoresRepository servidoresRepository;

    @Autowired
    private ServidoresSearchRepository servidoresSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServidoresMockMvc;

    private Servidores servidores;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServidoresResource servidoresResource = new ServidoresResource(servidoresRepository, servidoresSearchRepository);
        this.restServidoresMockMvc = MockMvcBuilders.standaloneSetup(servidoresResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Servidores createEntity(EntityManager em) {
        Servidores servidores = new Servidores()
            .nome(DEFAULT_NOME)
            .sgdb(DEFAULT_SGDB)
            .tipo(DEFAULT_TIPO);
        return servidores;
    }

    @Before
    public void initTest() {
        servidoresSearchRepository.deleteAll();
        servidores = createEntity(em);
    }

    @Test
    @Transactional
    public void createServidores() throws Exception {
        int databaseSizeBeforeCreate = servidoresRepository.findAll().size();

        // Create the Servidores
        restServidoresMockMvc.perform(post("/api/servidores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidores)))
            .andExpect(status().isCreated());

        // Validate the Servidores in the database
        List<Servidores> servidoresList = servidoresRepository.findAll();
        assertThat(servidoresList).hasSize(databaseSizeBeforeCreate + 1);
        Servidores testServidores = servidoresList.get(servidoresList.size() - 1);
        assertThat(testServidores.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testServidores.getSgdb()).isEqualTo(DEFAULT_SGDB);
        assertThat(testServidores.getTipo()).isEqualTo(DEFAULT_TIPO);

        // Validate the Servidores in Elasticsearch
        Servidores servidoresEs = servidoresSearchRepository.findOne(testServidores.getId());
        assertThat(servidoresEs).isEqualToIgnoringGivenFields(testServidores);
    }

    @Test
    @Transactional
    public void createServidoresWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = servidoresRepository.findAll().size();

        // Create the Servidores with an existing ID
        servidores.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServidoresMockMvc.perform(post("/api/servidores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidores)))
            .andExpect(status().isBadRequest());

        // Validate the Servidores in the database
        List<Servidores> servidoresList = servidoresRepository.findAll();
        assertThat(servidoresList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = servidoresRepository.findAll().size();
        // set the field null
        servidores.setNome(null);

        // Create the Servidores, which fails.

        restServidoresMockMvc.perform(post("/api/servidores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidores)))
            .andExpect(status().isBadRequest());

        List<Servidores> servidoresList = servidoresRepository.findAll();
        assertThat(servidoresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSgdbIsRequired() throws Exception {
        int databaseSizeBeforeTest = servidoresRepository.findAll().size();
        // set the field null
        servidores.setSgdb(null);

        // Create the Servidores, which fails.

        restServidoresMockMvc.perform(post("/api/servidores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidores)))
            .andExpect(status().isBadRequest());

        List<Servidores> servidoresList = servidoresRepository.findAll();
        assertThat(servidoresList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllServidores() throws Exception {
        // Initialize the database
        servidoresRepository.saveAndFlush(servidores);

        // Get all the servidoresList
        restServidoresMockMvc.perform(get("/api/servidores?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(servidores.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].sgdb").value(hasItem(DEFAULT_SGDB.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }

    @Test
    @Transactional
    public void getServidores() throws Exception {
        // Initialize the database
        servidoresRepository.saveAndFlush(servidores);

        // Get the servidores
        restServidoresMockMvc.perform(get("/api/servidores/{id}", servidores.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(servidores.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.sgdb").value(DEFAULT_SGDB.toString()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServidores() throws Exception {
        // Get the servidores
        restServidoresMockMvc.perform(get("/api/servidores/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServidores() throws Exception {
        // Initialize the database
        servidoresRepository.saveAndFlush(servidores);
        servidoresSearchRepository.save(servidores);
        int databaseSizeBeforeUpdate = servidoresRepository.findAll().size();

        // Update the servidores
        Servidores updatedServidores = servidoresRepository.findOne(servidores.getId());
        // Disconnect from session so that the updates on updatedServidores are not directly saved in db
        em.detach(updatedServidores);
        updatedServidores
            .nome(UPDATED_NOME)
            .sgdb(UPDATED_SGDB)
            .tipo(UPDATED_TIPO);

        restServidoresMockMvc.perform(put("/api/servidores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedServidores)))
            .andExpect(status().isOk());

        // Validate the Servidores in the database
        List<Servidores> servidoresList = servidoresRepository.findAll();
        assertThat(servidoresList).hasSize(databaseSizeBeforeUpdate);
        Servidores testServidores = servidoresList.get(servidoresList.size() - 1);
        assertThat(testServidores.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testServidores.getSgdb()).isEqualTo(UPDATED_SGDB);
        assertThat(testServidores.getTipo()).isEqualTo(UPDATED_TIPO);

        // Validate the Servidores in Elasticsearch
        Servidores servidoresEs = servidoresSearchRepository.findOne(testServidores.getId());
        assertThat(servidoresEs).isEqualToIgnoringGivenFields(testServidores);
    }

    @Test
    @Transactional
    public void updateNonExistingServidores() throws Exception {
        int databaseSizeBeforeUpdate = servidoresRepository.findAll().size();

        // Create the Servidores

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restServidoresMockMvc.perform(put("/api/servidores")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(servidores)))
            .andExpect(status().isCreated());

        // Validate the Servidores in the database
        List<Servidores> servidoresList = servidoresRepository.findAll();
        assertThat(servidoresList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteServidores() throws Exception {
        // Initialize the database
        servidoresRepository.saveAndFlush(servidores);
        servidoresSearchRepository.save(servidores);
        int databaseSizeBeforeDelete = servidoresRepository.findAll().size();

        // Get the servidores
        restServidoresMockMvc.perform(delete("/api/servidores/{id}", servidores.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean servidoresExistsInEs = servidoresSearchRepository.exists(servidores.getId());
        assertThat(servidoresExistsInEs).isFalse();

        // Validate the database is empty
        List<Servidores> servidoresList = servidoresRepository.findAll();
        assertThat(servidoresList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchServidores() throws Exception {
        // Initialize the database
        servidoresRepository.saveAndFlush(servidores);
        servidoresSearchRepository.save(servidores);

        // Search the servidores
        restServidoresMockMvc.perform(get("/api/_search/servidores?query=id:" + servidores.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(servidores.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].sgdb").value(hasItem(DEFAULT_SGDB.toString())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Servidores.class);
        Servidores servidores1 = new Servidores();
        servidores1.setId(1L);
        Servidores servidores2 = new Servidores();
        servidores2.setId(servidores1.getId());
        assertThat(servidores1).isEqualTo(servidores2);
        servidores2.setId(2L);
        assertThat(servidores1).isNotEqualTo(servidores2);
        servidores1.setId(null);
        assertThat(servidores1).isNotEqualTo(servidores2);
    }
}
