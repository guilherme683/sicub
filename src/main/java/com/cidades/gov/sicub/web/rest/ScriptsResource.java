package com.cidades.gov.sicub.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cidades.gov.sicub.domain.Scripts;

import com.cidades.gov.sicub.repository.ScriptsRepository;
import com.cidades.gov.sicub.repository.search.ScriptsSearchRepository;
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
 * REST controller for managing Scripts.
 */
@RestController
@RequestMapping("/api")
public class ScriptsResource {

    private final Logger log = LoggerFactory.getLogger(ScriptsResource.class);

    private static final String ENTITY_NAME = "scripts";

    private final ScriptsRepository scriptsRepository;

    private final ScriptsSearchRepository scriptsSearchRepository;

    public ScriptsResource(ScriptsRepository scriptsRepository, ScriptsSearchRepository scriptsSearchRepository) {
        this.scriptsRepository = scriptsRepository;
        this.scriptsSearchRepository = scriptsSearchRepository;
    }

    /**
     * POST  /scripts : Create a new scripts.
     *
     * @param scripts the scripts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new scripts, or with status 400 (Bad Request) if the scripts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/scripts")
    @Timed
    public ResponseEntity<Scripts> createScripts(@Valid @RequestBody Scripts scripts) throws URISyntaxException {
        log.debug("REST request to save Scripts : {}", scripts);
        if (scripts.getId() != null) {
            throw new BadRequestAlertException("A new scripts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Scripts result = scriptsRepository.save(scripts);
        scriptsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/scripts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /scripts : Updates an existing scripts.
     *
     * @param scripts the scripts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated scripts,
     * or with status 400 (Bad Request) if the scripts is not valid,
     * or with status 500 (Internal Server Error) if the scripts couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/scripts")
    @Timed
    public ResponseEntity<Scripts> updateScripts(@Valid @RequestBody Scripts scripts) throws URISyntaxException {
        log.debug("REST request to update Scripts : {}", scripts);
        if (scripts.getId() == null) {
            return createScripts(scripts);
        }
        Scripts result = scriptsRepository.save(scripts);
        scriptsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, scripts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /scripts : get all the scripts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of scripts in body
     */
    @GetMapping("/scripts")
    @Timed
    public List<Scripts> getAllScripts() {
        log.debug("REST request to get all Scripts");
        return scriptsRepository.findAll();
        }

    /**
     * GET  /scripts/:id : get the "id" scripts.
     *
     * @param id the id of the scripts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the scripts, or with status 404 (Not Found)
     */
    @GetMapping("/scripts/{id}")
    @Timed
    public ResponseEntity<Scripts> getScripts(@PathVariable Long id) {
        log.debug("REST request to get Scripts : {}", id);
        Scripts scripts = scriptsRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(scripts));
    }

    /**
     * DELETE  /scripts/:id : delete the "id" scripts.
     *
     * @param id the id of the scripts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/scripts/{id}")
    @Timed
    public ResponseEntity<Void> deleteScripts(@PathVariable Long id) {
        log.debug("REST request to delete Scripts : {}", id);
        scriptsRepository.delete(id);
        scriptsSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/scripts?query=:query : search for the scripts corresponding
     * to the query.
     *
     * @param query the query of the scripts search
     * @return the result of the search
     */
    @GetMapping("/_search/scripts")
    @Timed
    public List<Scripts> searchScripts(@RequestParam String query) {
        log.debug("REST request to search Scripts for query {}", query);
        return StreamSupport
            .stream(scriptsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
