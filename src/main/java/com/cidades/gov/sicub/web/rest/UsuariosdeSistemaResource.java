package com.cidades.gov.sicub.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cidades.gov.sicub.domain.UsuariosdeSistema;

import com.cidades.gov.sicub.repository.UsuariosdeSistemaRepository;
import com.cidades.gov.sicub.repository.search.UsuariosdeSistemaSearchRepository;
import com.cidades.gov.sicub.web.rest.errors.BadRequestAlertException;
import com.cidades.gov.sicub.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing UsuariosdeSistema.
 */
@RestController
@RequestMapping("/api")
public class UsuariosdeSistemaResource {

    private final Logger log = LoggerFactory.getLogger(UsuariosdeSistemaResource.class);

    private static final String ENTITY_NAME = "usuariosdeSistema";

    private final UsuariosdeSistemaRepository usuariosdeSistemaRepository;

    private final UsuariosdeSistemaSearchRepository usuariosdeSistemaSearchRepository;

    public UsuariosdeSistemaResource(UsuariosdeSistemaRepository usuariosdeSistemaRepository, UsuariosdeSistemaSearchRepository usuariosdeSistemaSearchRepository) {
        this.usuariosdeSistemaRepository = usuariosdeSistemaRepository;
        this.usuariosdeSistemaSearchRepository = usuariosdeSistemaSearchRepository;
    }

    /**
     * POST  /usuariosde-sistemas : Create a new usuariosdeSistema.
     *
     * @param usuariosdeSistema the usuariosdeSistema to create
     * @return the ResponseEntity with status 201 (Created) and with body the new usuariosdeSistema, or with status 400 (Bad Request) if the usuariosdeSistema has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/usuariosde-sistemas")
    @Timed
    public ResponseEntity<UsuariosdeSistema> createUsuariosdeSistema(@Valid @RequestBody UsuariosdeSistema usuariosdeSistema) throws URISyntaxException {
        log.debug("REST request to save UsuariosdeSistema : {}", usuariosdeSistema);
        if (usuariosdeSistema.getId() != null) {
            throw new BadRequestAlertException("A new usuariosdeSistema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsuariosdeSistema result = usuariosdeSistemaRepository.save(usuariosdeSistema);
        usuariosdeSistemaSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/usuariosde-sistemas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /usuariosde-sistemas : Updates an existing usuariosdeSistema.
     *
     * @param usuariosdeSistema the usuariosdeSistema to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated usuariosdeSistema,
     * or with status 400 (Bad Request) if the usuariosdeSistema is not valid,
     * or with status 500 (Internal Server Error) if the usuariosdeSistema couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/usuariosde-sistemas")
    @Timed
    public ResponseEntity<UsuariosdeSistema> updateUsuariosdeSistema(@Valid @RequestBody UsuariosdeSistema usuariosdeSistema) throws URISyntaxException {
        log.debug("REST request to update UsuariosdeSistema : {}", usuariosdeSistema);
        if (usuariosdeSistema.getId() == null) {
            return createUsuariosdeSistema(usuariosdeSistema);
        }
        UsuariosdeSistema result = usuariosdeSistemaRepository.save(usuariosdeSistema);
        usuariosdeSistemaSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, usuariosdeSistema.getId().toString()))
            .body(result);
    }

    /**
     * GET  /usuariosde-sistemas : get all the usuariosdeSistemas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of usuariosdeSistemas in body
     */
    @GetMapping("/usuariosde-sistemas")
    @Timed
    public List<UsuariosdeSistema> getAllUsuariosdeSistemas() {
        log.debug("REST request to get all UsuariosdeSistemas");
        return usuariosdeSistemaRepository.findAllWithEagerRelationships();
        }

    /**
     * GET  /usuariosde-sistemas/:id : get the "id" usuariosdeSistema.
     *
     * @param id the id of the usuariosdeSistema to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the usuariosdeSistema, or with status 404 (Not Found)
     */
    @GetMapping("/usuariosde-sistemas/{id}")
    @Timed
    public ResponseEntity<UsuariosdeSistema> getUsuariosdeSistema(@PathVariable Long id) {
        log.debug("REST request to get UsuariosdeSistema : {}", id);
        UsuariosdeSistema usuariosdeSistema = usuariosdeSistemaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(usuariosdeSistema));
    }

    /**
     * DELETE  /usuariosde-sistemas/:id : delete the "id" usuariosdeSistema.
     *
     * @param id the id of the usuariosdeSistema to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/usuariosde-sistemas/{id}")
    @Timed
    public ResponseEntity<Void> deleteUsuariosdeSistema(@PathVariable Long id) {
        log.debug("REST request to delete UsuariosdeSistema : {}", id);
        usuariosdeSistemaRepository.delete(id);
        usuariosdeSistemaSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/usuariosde-sistemas?query=:query : search for the usuariosdeSistema corresponding
     * to the query.
     *
     * @param query the query of the usuariosdeSistema search
     * @return the result of the search
     */
    @GetMapping("/_search/usuariosde-sistemas")
    @Timed
    public List<UsuariosdeSistema> searchUsuariosdeSistemas(@RequestParam String query) {
        log.debug("REST request to search UsuariosdeSistemas for query {}", query);
        return StreamSupport
            .stream(usuariosdeSistemaSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
