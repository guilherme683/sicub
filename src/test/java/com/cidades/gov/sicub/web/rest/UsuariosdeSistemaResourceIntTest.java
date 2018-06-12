package com.cidades.gov.sicub.web.rest;

import com.cidades.gov.sicub.SicubApp;

import com.cidades.gov.sicub.domain.UsuariosdeSistema;
import com.cidades.gov.sicub.repository.UsuariosdeSistemaRepository;
import com.cidades.gov.sicub.repository.search.UsuariosdeSistemaSearchRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.cidades.gov.sicub.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cidades.gov.sicub.domain.enumeration.Sgdb;
import com.cidades.gov.sicub.domain.enumeration.Area;
/**
 * Test class for the UsuariosdeSistemaResource REST controller.
 *
 * @see UsuariosdeSistemaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SicubApp.class)
public class UsuariosdeSistemaResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_SENHA = "AAAAAAAAAA";
    private static final String UPDATED_SENHA = "BBBBBBBBBB";

    private static final Sgdb DEFAULT_SGDB = Sgdb.MYSQL;
    private static final Sgdb UPDATED_SGDB = Sgdb.MARIADB;

    private static final String DEFAULT_BASE = "AAAAAAAAAA";
    private static final String UPDATED_BASE = "BBBBBBBBBB";

    private static final String DEFAULT_ESQUEMA = "AAAAAAAAAA";
    private static final String UPDATED_ESQUEMA = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO_BASE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO_BASE = "BBBBBBBBBB";

    private static final String DEFAULT_SOLICITANTE = "AAAAAAAAAA";
    private static final String UPDATED_SOLICITANTE = "BBBBBBBBBB";

    private static final Integer DEFAULT_RAMAL = 1;
    private static final Integer UPDATED_RAMAL = 2;

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Area DEFAULT_AREA = Area.SNH;
    private static final Area UPDATED_AREA = Area.SNSA;

    private static final LocalDate DEFAULT_DATA_CRIACAO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_CRIACAO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private UsuariosdeSistemaRepository usuariosdeSistemaRepository;

    @Autowired
    private UsuariosdeSistemaSearchRepository usuariosdeSistemaSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUsuariosdeSistemaMockMvc;

    private UsuariosdeSistema usuariosdeSistema;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UsuariosdeSistemaResource usuariosdeSistemaResource = new UsuariosdeSistemaResource(usuariosdeSistemaRepository, usuariosdeSistemaSearchRepository);
        this.restUsuariosdeSistemaMockMvc = MockMvcBuilders.standaloneSetup(usuariosdeSistemaResource)
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
    public static UsuariosdeSistema createEntity(EntityManager em) {
        UsuariosdeSistema usuariosdeSistema = new UsuariosdeSistema()
            .nome(DEFAULT_NOME)
            .senha(DEFAULT_SENHA)
            .sgdb(DEFAULT_SGDB)
            .base(DEFAULT_BASE)
            .esquema(DEFAULT_ESQUEMA)
            .descricaoBase(DEFAULT_DESCRICAO_BASE)
            .solicitante(DEFAULT_SOLICITANTE)
            .ramal(DEFAULT_RAMAL)
            .email(DEFAULT_EMAIL)
            .area(DEFAULT_AREA)
            .dataCriacao(DEFAULT_DATA_CRIACAO);
        return usuariosdeSistema;
    }

    @Before
    public void initTest() {
        usuariosdeSistemaSearchRepository.deleteAll();
        usuariosdeSistema = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsuariosdeSistema() throws Exception {
        int databaseSizeBeforeCreate = usuariosdeSistemaRepository.findAll().size();

        // Create the UsuariosdeSistema
        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isCreated());

        // Validate the UsuariosdeSistema in the database
        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeCreate + 1);
        UsuariosdeSistema testUsuariosdeSistema = usuariosdeSistemaList.get(usuariosdeSistemaList.size() - 1);
        assertThat(testUsuariosdeSistema.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testUsuariosdeSistema.getSenha()).isEqualTo(DEFAULT_SENHA);
        assertThat(testUsuariosdeSistema.getSgdb()).isEqualTo(DEFAULT_SGDB);
        assertThat(testUsuariosdeSistema.getBase()).isEqualTo(DEFAULT_BASE);
        assertThat(testUsuariosdeSistema.getEsquema()).isEqualTo(DEFAULT_ESQUEMA);
        assertThat(testUsuariosdeSistema.getDescricaoBase()).isEqualTo(DEFAULT_DESCRICAO_BASE);
        assertThat(testUsuariosdeSistema.getSolicitante()).isEqualTo(DEFAULT_SOLICITANTE);
        assertThat(testUsuariosdeSistema.getRamal()).isEqualTo(DEFAULT_RAMAL);
        assertThat(testUsuariosdeSistema.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUsuariosdeSistema.getArea()).isEqualTo(DEFAULT_AREA);
        assertThat(testUsuariosdeSistema.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);

        // Validate the UsuariosdeSistema in Elasticsearch
        UsuariosdeSistema usuariosdeSistemaEs = usuariosdeSistemaSearchRepository.findOne(testUsuariosdeSistema.getId());
        assertThat(usuariosdeSistemaEs).isEqualToIgnoringGivenFields(testUsuariosdeSistema);
    }

    @Test
    @Transactional
    public void createUsuariosdeSistemaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usuariosdeSistemaRepository.findAll().size();

        // Create the UsuariosdeSistema with an existing ID
        usuariosdeSistema.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        // Validate the UsuariosdeSistema in the database
        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosdeSistemaRepository.findAll().size();
        // set the field null
        usuariosdeSistema.setNome(null);

        // Create the UsuariosdeSistema, which fails.

        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSenhaIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosdeSistemaRepository.findAll().size();
        // set the field null
        usuariosdeSistema.setSenha(null);

        // Create the UsuariosdeSistema, which fails.

        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSgdbIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosdeSistemaRepository.findAll().size();
        // set the field null
        usuariosdeSistema.setSgdb(null);

        // Create the UsuariosdeSistema, which fails.

        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkBaseIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosdeSistemaRepository.findAll().size();
        // set the field null
        usuariosdeSistema.setBase(null);

        // Create the UsuariosdeSistema, which fails.

        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDescricaoBaseIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosdeSistemaRepository.findAll().size();
        // set the field null
        usuariosdeSistema.setDescricaoBase(null);

        // Create the UsuariosdeSistema, which fails.

        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSolicitanteIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosdeSistemaRepository.findAll().size();
        // set the field null
        usuariosdeSistema.setSolicitante(null);

        // Create the UsuariosdeSistema, which fails.

        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkRamalIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosdeSistemaRepository.findAll().size();
        // set the field null
        usuariosdeSistema.setRamal(null);

        // Create the UsuariosdeSistema, which fails.

        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosdeSistemaRepository.findAll().size();
        // set the field null
        usuariosdeSistema.setEmail(null);

        // Create the UsuariosdeSistema, which fails.

        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuariosdeSistemaRepository.findAll().size();
        // set the field null
        usuariosdeSistema.setDataCriacao(null);

        // Create the UsuariosdeSistema, which fails.

        restUsuariosdeSistemaMockMvc.perform(post("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isBadRequest());

        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllUsuariosdeSistemas() throws Exception {
        // Initialize the database
        usuariosdeSistemaRepository.saveAndFlush(usuariosdeSistema);

        // Get all the usuariosdeSistemaList
        restUsuariosdeSistemaMockMvc.perform(get("/api/usuariosde-sistemas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuariosdeSistema.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].senha").value(hasItem(DEFAULT_SENHA.toString())))
            .andExpect(jsonPath("$.[*].sgdb").value(hasItem(DEFAULT_SGDB.toString())))
            .andExpect(jsonPath("$.[*].base").value(hasItem(DEFAULT_BASE.toString())))
            .andExpect(jsonPath("$.[*].esquema").value(hasItem(DEFAULT_ESQUEMA.toString())))
            .andExpect(jsonPath("$.[*].descricaoBase").value(hasItem(DEFAULT_DESCRICAO_BASE.toString())))
            .andExpect(jsonPath("$.[*].solicitante").value(hasItem(DEFAULT_SOLICITANTE.toString())))
            .andExpect(jsonPath("$.[*].ramal").value(hasItem(DEFAULT_RAMAL)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.toString())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())));
    }

    @Test
    @Transactional
    public void getUsuariosdeSistema() throws Exception {
        // Initialize the database
        usuariosdeSistemaRepository.saveAndFlush(usuariosdeSistema);

        // Get the usuariosdeSistema
        restUsuariosdeSistemaMockMvc.perform(get("/api/usuariosde-sistemas/{id}", usuariosdeSistema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(usuariosdeSistema.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.senha").value(DEFAULT_SENHA.toString()))
            .andExpect(jsonPath("$.sgdb").value(DEFAULT_SGDB.toString()))
            .andExpect(jsonPath("$.base").value(DEFAULT_BASE.toString()))
            .andExpect(jsonPath("$.esquema").value(DEFAULT_ESQUEMA.toString()))
            .andExpect(jsonPath("$.descricaoBase").value(DEFAULT_DESCRICAO_BASE.toString()))
            .andExpect(jsonPath("$.solicitante").value(DEFAULT_SOLICITANTE.toString()))
            .andExpect(jsonPath("$.ramal").value(DEFAULT_RAMAL))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.area").value(DEFAULT_AREA.toString()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUsuariosdeSistema() throws Exception {
        // Get the usuariosdeSistema
        restUsuariosdeSistemaMockMvc.perform(get("/api/usuariosde-sistemas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsuariosdeSistema() throws Exception {
        // Initialize the database
        usuariosdeSistemaRepository.saveAndFlush(usuariosdeSistema);
        usuariosdeSistemaSearchRepository.save(usuariosdeSistema);
        int databaseSizeBeforeUpdate = usuariosdeSistemaRepository.findAll().size();

        // Update the usuariosdeSistema
        UsuariosdeSistema updatedUsuariosdeSistema = usuariosdeSistemaRepository.findOne(usuariosdeSistema.getId());
        // Disconnect from session so that the updates on updatedUsuariosdeSistema are not directly saved in db
        em.detach(updatedUsuariosdeSistema);
        updatedUsuariosdeSistema
            .nome(UPDATED_NOME)
            .senha(UPDATED_SENHA)
            .sgdb(UPDATED_SGDB)
            .base(UPDATED_BASE)
            .esquema(UPDATED_ESQUEMA)
            .descricaoBase(UPDATED_DESCRICAO_BASE)
            .solicitante(UPDATED_SOLICITANTE)
            .ramal(UPDATED_RAMAL)
            .email(UPDATED_EMAIL)
            .area(UPDATED_AREA)
            .dataCriacao(UPDATED_DATA_CRIACAO);

        restUsuariosdeSistemaMockMvc.perform(put("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUsuariosdeSistema)))
            .andExpect(status().isOk());

        // Validate the UsuariosdeSistema in the database
        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeUpdate);
        UsuariosdeSistema testUsuariosdeSistema = usuariosdeSistemaList.get(usuariosdeSistemaList.size() - 1);
        assertThat(testUsuariosdeSistema.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testUsuariosdeSistema.getSenha()).isEqualTo(UPDATED_SENHA);
        assertThat(testUsuariosdeSistema.getSgdb()).isEqualTo(UPDATED_SGDB);
        assertThat(testUsuariosdeSistema.getBase()).isEqualTo(UPDATED_BASE);
        assertThat(testUsuariosdeSistema.getEsquema()).isEqualTo(UPDATED_ESQUEMA);
        assertThat(testUsuariosdeSistema.getDescricaoBase()).isEqualTo(UPDATED_DESCRICAO_BASE);
        assertThat(testUsuariosdeSistema.getSolicitante()).isEqualTo(UPDATED_SOLICITANTE);
        assertThat(testUsuariosdeSistema.getRamal()).isEqualTo(UPDATED_RAMAL);
        assertThat(testUsuariosdeSistema.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUsuariosdeSistema.getArea()).isEqualTo(UPDATED_AREA);
        assertThat(testUsuariosdeSistema.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);

        // Validate the UsuariosdeSistema in Elasticsearch
        UsuariosdeSistema usuariosdeSistemaEs = usuariosdeSistemaSearchRepository.findOne(testUsuariosdeSistema.getId());
        assertThat(usuariosdeSistemaEs).isEqualToIgnoringGivenFields(testUsuariosdeSistema);
    }

    @Test
    @Transactional
    public void updateNonExistingUsuariosdeSistema() throws Exception {
        int databaseSizeBeforeUpdate = usuariosdeSistemaRepository.findAll().size();

        // Create the UsuariosdeSistema

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUsuariosdeSistemaMockMvc.perform(put("/api/usuariosde-sistemas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usuariosdeSistema)))
            .andExpect(status().isCreated());

        // Validate the UsuariosdeSistema in the database
        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUsuariosdeSistema() throws Exception {
        // Initialize the database
        usuariosdeSistemaRepository.saveAndFlush(usuariosdeSistema);
        usuariosdeSistemaSearchRepository.save(usuariosdeSistema);
        int databaseSizeBeforeDelete = usuariosdeSistemaRepository.findAll().size();

        // Get the usuariosdeSistema
        restUsuariosdeSistemaMockMvc.perform(delete("/api/usuariosde-sistemas/{id}", usuariosdeSistema.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean usuariosdeSistemaExistsInEs = usuariosdeSistemaSearchRepository.exists(usuariosdeSistema.getId());
        assertThat(usuariosdeSistemaExistsInEs).isFalse();

        // Validate the database is empty
        List<UsuariosdeSistema> usuariosdeSistemaList = usuariosdeSistemaRepository.findAll();
        assertThat(usuariosdeSistemaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchUsuariosdeSistema() throws Exception {
        // Initialize the database
        usuariosdeSistemaRepository.saveAndFlush(usuariosdeSistema);
        usuariosdeSistemaSearchRepository.save(usuariosdeSistema);

        // Search the usuariosdeSistema
        restUsuariosdeSistemaMockMvc.perform(get("/api/_search/usuariosde-sistemas?query=id:" + usuariosdeSistema.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuariosdeSistema.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].senha").value(hasItem(DEFAULT_SENHA.toString())))
            .andExpect(jsonPath("$.[*].sgdb").value(hasItem(DEFAULT_SGDB.toString())))
            .andExpect(jsonPath("$.[*].base").value(hasItem(DEFAULT_BASE.toString())))
            .andExpect(jsonPath("$.[*].esquema").value(hasItem(DEFAULT_ESQUEMA.toString())))
            .andExpect(jsonPath("$.[*].descricaoBase").value(hasItem(DEFAULT_DESCRICAO_BASE.toString())))
            .andExpect(jsonPath("$.[*].solicitante").value(hasItem(DEFAULT_SOLICITANTE.toString())))
            .andExpect(jsonPath("$.[*].ramal").value(hasItem(DEFAULT_RAMAL)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].area").value(hasItem(DEFAULT_AREA.toString())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsuariosdeSistema.class);
        UsuariosdeSistema usuariosdeSistema1 = new UsuariosdeSistema();
        usuariosdeSistema1.setId(1L);
        UsuariosdeSistema usuariosdeSistema2 = new UsuariosdeSistema();
        usuariosdeSistema2.setId(usuariosdeSistema1.getId());
        assertThat(usuariosdeSistema1).isEqualTo(usuariosdeSistema2);
        usuariosdeSistema2.setId(2L);
        assertThat(usuariosdeSistema1).isNotEqualTo(usuariosdeSistema2);
        usuariosdeSistema1.setId(null);
        assertThat(usuariosdeSistema1).isNotEqualTo(usuariosdeSistema2);
    }
}
