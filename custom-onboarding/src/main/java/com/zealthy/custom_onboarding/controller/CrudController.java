package com.zealthy.custom_onboarding.controller;

import com.zealthy.custom_onboarding.model.BaseEntity;
import com.zealthy.custom_onboarding.service.CrudService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net. URI;
import java.util.UUID;

// Base generic controller for CRUD operations
@Log4j2
@RequiredArgsConstructor
public class CrudController<E extends BaseEntity> {
    protected final CrudService<E> crudService;

    @GetMapping
    public ResponseEntity<?> findAll() {
        log.info("Fetching all entities");
        return ResponseEntity.ok(crudService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable(required = true) UUID id) {
        log.info("Fetching entity with id: {}", id);
        return ResponseEntity.ok(crudService.findById(id));
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody @Valid E entity) {
        log.info("Saving new entity: {}", entity);
        var savedEntity = crudService.save(entity);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .buildAndExpand(savedEntity)
                .toUri();
        log.info("Entity saved with location: {}", location);
        return ResponseEntity.created(location).body(savedEntity);
    }


    @PutMapping
    public ResponseEntity<?> update(@RequestBody @Valid E entity) {
        log.info("Updating entity with id: {}", entity.getId());
        return ResponseEntity.ok(crudService.update(entity.getId(), entity));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable(required = true) UUID id) {
        log.info("Deleting entity with id: {}", id);
        crudService.delete(id);
        return ResponseEntity.noContent().build();
    }
}