package com.cidades.gov.sicub.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.cidades.gov.sicub.domain.Servidores;

import com.cidades.gov.sicub.repository.ServidoresRepository;
import com.cidades.gov.sicub.repository.search.ServidoresSearchRepository;
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
 * REST controller for managing Servidores.
 */
@RestController
@RequestMapping("/api")
public class ServidoresResource {

    private final Logger log = LoggerFactory.getLogger(ServidoresResource.class);

    private static final String ENTITY_NAME = "servidores";

    private final ServidoresRepository servidoresRepository;

    private final ServidoresSearchRepository servidoresSearchRepository;

    public ServidoresResource(ServidoresRepository servidoresRepository, ServidoresSearchRepository servidoresSearchRepository) {
        this.servidoresRepository = servidoresRepository;
        this.servidoresSearchRepository = servidoresSearchRepository;
    }

    /**
     * POST  /servidores : Create a new servidores.
     *
     * @param servidores the servidores to create
     * @return the ResponseEntity with status 201 (Created) and with body the new servidores, or with status 400 (Bad Request) if the servidores has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/servidores")
    @Timed
    public ResponseEntity<Servidores> createServidores(@Valid @RequestBody Servidores servidores) throws URISyntaxException {
        log.debug("REST request to save Servidores : {}", servidores);
        if (servidores.getId() != null) {
            throw new BadRequestAlertException("A new servidores cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Servidores result = servidoresRepository.save(servidores);
        servidoresSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/servidores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /servidores : Updates an existing servidores.
     *
     * @param servidores the servidores to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated servidores,
     * or with status 400 (Bad Request) if the servidores is not valid,
     * or with status 500 (Internal Server Error) if the servidores couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/servidores")
    @Timed
    public ResponseEntity<Servidores> updateServidores(@Valid @RequestBody Servidores servidores) throws URISyntaxException {
        log.debug("REST request to update Servidores : {}", servidores);
        if (servidores.getId() == null) {
            return createServidores(servidores);
        }
        Servidores result = servidoresRepository.save(servidores);
        servidoresSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, servidores.getId().toString()))
            .body(result);
    }

    /**
     * GET  /servidores : get all the servidores.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of servidores in body
     */
    @GetMapping("/servidores")
    @Timed
    public List<Servidores> getAllServidores() {
        log.debug("REST request to get all Servidores");
        return servidoresRepository.findAll();
        }

    /**
     * GET  /servidores/:id : get the "id" servidores.
     *
     * @param id the id of the servidores to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the servidores, or with status 404 (Not Found)
     */
    @GetMapping("/servidores/{id}")
    @Timed
    public ResponseEntity<Servidores> getServidores(@PathVariable Long id) {
        log.debug("REST request to get Servidores : {}", id);
        Servidores servidores = servidoresRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(servidores));
    }

    /**
     * DELETE  /servidores/:id : delete the "id" servidores.
     *
     * @param id the id of the servidores to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/servidores/{id}")
    @Timed
    public ResponseEntity<Void> deleteServidores(@PathVariable Long id) {
        log.debug("REST request to delete Servidores : {}", id);
        servidoresRepository.delete(id);
        servidoresSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/servidores?query=:query : search for the servidores corresponding
     * to the query.
     *
     * @param query the query of the servidores search
     * @return the result of the search
     */
    @GetMapping("/_search/servidores")
    @Timed
    public List<Servidores> searchServidores(@RequestParam String query) {
        log.debug("REST request to search Servidores for query {}", query);
        return StreamSupport
            .stream(servidoresSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
