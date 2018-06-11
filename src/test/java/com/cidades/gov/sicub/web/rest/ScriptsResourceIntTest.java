package com.cidades.gov.sicub.web.rest;

import com.cidades.gov.sicub.SicubApp;

import com.cidades.gov.sicub.domain.Scripts;
import com.cidades.gov.sicub.repository.ScriptsRepository;
import com.cidades.gov.sicub.repository.search.ScriptsSearchRepository;
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
/**
 * Test class for the ScriptsResource REST controller.
 *
 * @see ScriptsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SicubApp.class)
public class ScriptsResourceIntTest {

    private static final String DEFAULT_ACAO = "AAAAAAAAAA";
    private static final String UPDATED_ACAO = "BBBBBBBBBB";

    private static final String DEFAULT_COMANDO = "AAAAAAAAAA";
    private static final String UPDATED_COMANDO = "BBBBBBBBBB";

    private static final Sgdb DEFAULT_SGDB = Sgdb.MYSQL;
    private static final Sgdb UPDATED_SGDB = Sgdb.MARIADB;

    @Autowired
    private ScriptsRepository scriptsRepository;

    @Autowired
    private ScriptsSearchRepository scriptsSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restScriptsMockMvc;

    private Scripts scripts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ScriptsResource scriptsResource = new ScriptsResource(scriptsRepository, scriptsSearchRepository);
        this.restScriptsMockMvc = MockMvcBuilders.standaloneSetup(scriptsResource)
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
    public static Scripts createEntity(EntityManager em) {
        Scripts scripts = new Scripts()
            .acao(DEFAULT_ACAO)
            .comando(DEFAULT_COMANDO)
            .sgdb(DEFAULT_SGDB);
        return scripts;
    }

    @Before
    public void initTest() {
        scriptsSearchRepository.deleteAll();
        scripts = createEntity(em);
    }

    @Test
    @Transactional
    public void createScripts() throws Exception {
        int databaseSizeBeforeCreate = scriptsRepository.findAll().size();

        // Create the Scripts
        restScriptsMockMvc.perform(post("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scripts)))
            .andExpect(status().isCreated());

        // Validate the Scripts in the database
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeCreate + 1);
        Scripts testScripts = scriptsList.get(scriptsList.size() - 1);
        assertThat(testScripts.getAcao()).isEqualTo(DEFAULT_ACAO);
        assertThat(testScripts.getComando()).isEqualTo(DEFAULT_COMANDO);
        assertThat(testScripts.getSgdb()).isEqualTo(DEFAULT_SGDB);

        // Validate the Scripts in Elasticsearch
        Scripts scriptsEs = scriptsSearchRepository.findOne(testScripts.getId());
        assertThat(scriptsEs).isEqualToIgnoringGivenFields(testScripts);
    }

    @Test
    @Transactional
    public void createScriptsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = scriptsRepository.findAll().size();

        // Create the Scripts with an existing ID
        scripts.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restScriptsMockMvc.perform(post("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scripts)))
            .andExpect(status().isBadRequest());

        // Validate the Scripts in the database
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkAcaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = scriptsRepository.findAll().size();
        // set the field null
        scripts.setAcao(null);

        // Create the Scripts, which fails.

        restScriptsMockMvc.perform(post("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scripts)))
            .andExpect(status().isBadRequest());

        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkComandoIsRequired() throws Exception {
        int databaseSizeBeforeTest = scriptsRepository.findAll().size();
        // set the field null
        scripts.setComando(null);

        // Create the Scripts, which fails.

        restScriptsMockMvc.perform(post("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scripts)))
            .andExpect(status().isBadRequest());

        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSgdbIsRequired() throws Exception {
        int databaseSizeBeforeTest = scriptsRepository.findAll().size();
        // set the field null
        scripts.setSgdb(null);

        // Create the Scripts, which fails.

        restScriptsMockMvc.perform(post("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scripts)))
            .andExpect(status().isBadRequest());

        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllScripts() throws Exception {
        // Initialize the database
        scriptsRepository.saveAndFlush(scripts);

        // Get all the scriptsList
        restScriptsMockMvc.perform(get("/api/scripts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scripts.getId().intValue())))
            .andExpect(jsonPath("$.[*].acao").value(hasItem(DEFAULT_ACAO.toString())))
            .andExpect(jsonPath("$.[*].comando").value(hasItem(DEFAULT_COMANDO.toString())))
            .andExpect(jsonPath("$.[*].sgdb").value(hasItem(DEFAULT_SGDB.toString())));
    }

    @Test
    @Transactional
    public void getScripts() throws Exception {
        // Initialize the database
        scriptsRepository.saveAndFlush(scripts);

        // Get the scripts
        restScriptsMockMvc.perform(get("/api/scripts/{id}", scripts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(scripts.getId().intValue()))
            .andExpect(jsonPath("$.acao").value(DEFAULT_ACAO.toString()))
            .andExpect(jsonPath("$.comando").value(DEFAULT_COMANDO.toString()))
            .andExpect(jsonPath("$.sgdb").value(DEFAULT_SGDB.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingScripts() throws Exception {
        // Get the scripts
        restScriptsMockMvc.perform(get("/api/scripts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateScripts() throws Exception {
        // Initialize the database
        scriptsRepository.saveAndFlush(scripts);
        scriptsSearchRepository.save(scripts);
        int databaseSizeBeforeUpdate = scriptsRepository.findAll().size();

        // Update the scripts
        Scripts updatedScripts = scriptsRepository.findOne(scripts.getId());
        // Disconnect from session so that the updates on updatedScripts are not directly saved in db
        em.detach(updatedScripts);
        updatedScripts
            .acao(UPDATED_ACAO)
            .comando(UPDATED_COMANDO)
            .sgdb(UPDATED_SGDB);

        restScriptsMockMvc.perform(put("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedScripts)))
            .andExpect(status().isOk());

        // Validate the Scripts in the database
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeUpdate);
        Scripts testScripts = scriptsList.get(scriptsList.size() - 1);
        assertThat(testScripts.getAcao()).isEqualTo(UPDATED_ACAO);
        assertThat(testScripts.getComando()).isEqualTo(UPDATED_COMANDO);
        assertThat(testScripts.getSgdb()).isEqualTo(UPDATED_SGDB);

        // Validate the Scripts in Elasticsearch
        Scripts scriptsEs = scriptsSearchRepository.findOne(testScripts.getId());
        assertThat(scriptsEs).isEqualToIgnoringGivenFields(testScripts);
    }

    @Test
    @Transactional
    public void updateNonExistingScripts() throws Exception {
        int databaseSizeBeforeUpdate = scriptsRepository.findAll().size();

        // Create the Scripts

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restScriptsMockMvc.perform(put("/api/scripts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(scripts)))
            .andExpect(status().isCreated());

        // Validate the Scripts in the database
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteScripts() throws Exception {
        // Initialize the database
        scriptsRepository.saveAndFlush(scripts);
        scriptsSearchRepository.save(scripts);
        int databaseSizeBeforeDelete = scriptsRepository.findAll().size();

        // Get the scripts
        restScriptsMockMvc.perform(delete("/api/scripts/{id}", scripts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean scriptsExistsInEs = scriptsSearchRepository.exists(scripts.getId());
        assertThat(scriptsExistsInEs).isFalse();

        // Validate the database is empty
        List<Scripts> scriptsList = scriptsRepository.findAll();
        assertThat(scriptsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchScripts() throws Exception {
        // Initialize the database
        scriptsRepository.saveAndFlush(scripts);
        scriptsSearchRepository.save(scripts);

        // Search the scripts
        restScriptsMockMvc.perform(get("/api/_search/scripts?query=id:" + scripts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(scripts.getId().intValue())))
            .andExpect(jsonPath("$.[*].acao").value(hasItem(DEFAULT_ACAO.toString())))
            .andExpect(jsonPath("$.[*].comando").value(hasItem(DEFAULT_COMANDO.toString())))
            .andExpect(jsonPath("$.[*].sgdb").value(hasItem(DEFAULT_SGDB.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Scripts.class);
        Scripts scripts1 = new Scripts();
        scripts1.setId(1L);
        Scripts scripts2 = new Scripts();
        scripts2.setId(scripts1.getId());
        assertThat(scripts1).isEqualTo(scripts2);
        scripts2.setId(2L);
        assertThat(scripts1).isNotEqualTo(scripts2);
        scripts1.setId(null);
        assertThat(scripts1).isNotEqualTo(scripts2);
    }
}
