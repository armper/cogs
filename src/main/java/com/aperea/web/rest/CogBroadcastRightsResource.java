package com.aperea.web.rest;

import com.aperea.domain.CogBroadcastRights;
import com.aperea.repository.CogBroadcastRightsRepository;
import com.aperea.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional; 
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.aperea.domain.CogBroadcastRights}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CogBroadcastRightsResource {

    private final Logger log = LoggerFactory.getLogger(CogBroadcastRightsResource.class);

    private static final String ENTITY_NAME = "cogBroadcastRights";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CogBroadcastRightsRepository cogBroadcastRightsRepository;

    public CogBroadcastRightsResource(CogBroadcastRightsRepository cogBroadcastRightsRepository) {
        this.cogBroadcastRightsRepository = cogBroadcastRightsRepository;
    }

    /**
     * {@code POST  /cog-broadcast-rights} : Create a new cogBroadcastRights.
     *
     * @param cogBroadcastRights the cogBroadcastRights to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cogBroadcastRights, or with status {@code 400 (Bad Request)} if the cogBroadcastRights has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cog-broadcast-rights")
    public ResponseEntity<CogBroadcastRights> createCogBroadcastRights(@RequestBody CogBroadcastRights cogBroadcastRights) throws URISyntaxException {
        log.debug("REST request to save CogBroadcastRights : {}", cogBroadcastRights);
        if (cogBroadcastRights.getId() != null) {
            throw new BadRequestAlertException("A new cogBroadcastRights cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CogBroadcastRights result = cogBroadcastRightsRepository.save(cogBroadcastRights);
        return ResponseEntity.created(new URI("/api/cog-broadcast-rights/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cog-broadcast-rights} : Updates an existing cogBroadcastRights.
     *
     * @param cogBroadcastRights the cogBroadcastRights to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cogBroadcastRights,
     * or with status {@code 400 (Bad Request)} if the cogBroadcastRights is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cogBroadcastRights couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cog-broadcast-rights")
    public ResponseEntity<CogBroadcastRights> updateCogBroadcastRights(@RequestBody CogBroadcastRights cogBroadcastRights) throws URISyntaxException {
        log.debug("REST request to update CogBroadcastRights : {}", cogBroadcastRights);
        if (cogBroadcastRights.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CogBroadcastRights result = cogBroadcastRightsRepository.save(cogBroadcastRights);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, cogBroadcastRights.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cog-broadcast-rights} : get all the cogBroadcastRights.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cogBroadcastRights in body.
     */
    @GetMapping("/cog-broadcast-rights")
    public List<CogBroadcastRights> getAllCogBroadcastRights(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all CogBroadcastRights");
        return cogBroadcastRightsRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /cog-broadcast-rights/:id} : get the "id" cogBroadcastRights.
     *
     * @param id the id of the cogBroadcastRights to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cogBroadcastRights, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cog-broadcast-rights/{id}")
    public ResponseEntity<CogBroadcastRights> getCogBroadcastRights(@PathVariable Long id) {
        log.debug("REST request to get CogBroadcastRights : {}", id);
        Optional<CogBroadcastRights> cogBroadcastRights = cogBroadcastRightsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(cogBroadcastRights);
    }

    /**
     * {@code DELETE  /cog-broadcast-rights/:id} : delete the "id" cogBroadcastRights.
     *
     * @param id the id of the cogBroadcastRights to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cog-broadcast-rights/{id}")
    public ResponseEntity<Void> deleteCogBroadcastRights(@PathVariable Long id) {
        log.debug("REST request to delete CogBroadcastRights : {}", id);
        cogBroadcastRightsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
