package com.aperea.web.rest;

import com.aperea.domain.SameCode;
import com.aperea.repository.SameCodeRepository;
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
 * REST controller for managing {@link com.aperea.domain.SameCode}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SameCodeResource {

    private final Logger log = LoggerFactory.getLogger(SameCodeResource.class);

    private static final String ENTITY_NAME = "sameCode";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SameCodeRepository sameCodeRepository;

    public SameCodeResource(SameCodeRepository sameCodeRepository) {
        this.sameCodeRepository = sameCodeRepository;
    }

    /**
     * {@code POST  /same-codes} : Create a new sameCode.
     *
     * @param sameCode the sameCode to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sameCode, or with status {@code 400 (Bad Request)} if the sameCode has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/same-codes")
    public ResponseEntity<SameCode> createSameCode(@RequestBody SameCode sameCode) throws URISyntaxException {
        log.debug("REST request to save SameCode : {}", sameCode);
        if (sameCode.getId() != null) {
            throw new BadRequestAlertException("A new sameCode cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SameCode result = sameCodeRepository.save(sameCode);
        return ResponseEntity.created(new URI("/api/same-codes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /same-codes} : Updates an existing sameCode.
     *
     * @param sameCode the sameCode to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sameCode,
     * or with status {@code 400 (Bad Request)} if the sameCode is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sameCode couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/same-codes")
    public ResponseEntity<SameCode> updateSameCode(@RequestBody SameCode sameCode) throws URISyntaxException {
        log.debug("REST request to update SameCode : {}", sameCode);
        if (sameCode.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SameCode result = sameCodeRepository.save(sameCode);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, sameCode.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /same-codes} : get all the sameCodes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sameCodes in body.
     */
    @GetMapping("/same-codes")
    public List<SameCode> getAllSameCodes() {
        log.debug("REST request to get all SameCodes");
        return sameCodeRepository.findAll();
    }

    /**
     * {@code GET  /same-codes/:id} : get the "id" sameCode.
     *
     * @param id the id of the sameCode to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sameCode, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/same-codes/{id}")
    public ResponseEntity<SameCode> getSameCode(@PathVariable Long id) {
        log.debug("REST request to get SameCode : {}", id);
        Optional<SameCode> sameCode = sameCodeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sameCode);
    }

    /**
     * {@code DELETE  /same-codes/:id} : delete the "id" sameCode.
     *
     * @param id the id of the sameCode to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/same-codes/{id}")
    public ResponseEntity<Void> deleteSameCode(@PathVariable Long id) {
        log.debug("REST request to delete SameCode : {}", id);
        sameCodeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
