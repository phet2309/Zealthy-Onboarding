package com.zealthy.custom_onboarding.service;

import com.zealthy.custom_onboarding.exception.ResourceNotFoundException;
import com.zealthy.custom_onboarding.model.BaseEntity;
import com.zealthy.custom_onboarding.postprocessor.PostprocessingStrategyFactory;
import com.zealthy.custom_onboarding.repository.CrudRepository;
import com.zealthy.custom_onboarding.validation.ValidationStrategyFactory;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

// Performs business logic for generic base entity
@Service
@Log4j2
@RequiredArgsConstructor
public class CrudService<E extends BaseEntity> {
    protected final CrudRepository<E> crudRepository;

    protected final ValidationStrategyFactory validationStrategyFactory;
    protected final PostprocessingStrategyFactory postprocessingStrategyFactory;



    public List<E> findAll() {
        log.info("Fetching all entities");
        List<E> entities = crudRepository.findAll();
        if (entities.isEmpty()) {
            log.warn("No entities found");
            throw new ResourceNotFoundException("No entities found");
        }
        return entities;
    }

    public E findById(UUID id) {
        log.info("Fetching entity with id: {}", id);
        return crudRepository.findById(id).orElseThrow(() -> {
            log.error("Entity not found with id: {}", id);
            return new ResourceNotFoundException("Entity not found");
        });
    }

    @Transactional
    public E save(E entity) {
        log.info("Saving entity: {}", entity);
        validationStrategyFactory.getValidationStrategy(entity).validate(entity);
        E savedEntity = crudRepository.save(entity);
        postprocessingStrategyFactory.getPostprocessingStrategy(entity).postProcess(savedEntity);
        log.info("Entity saved: {}", savedEntity);
        return savedEntity;
    }

    @Transactional
    public E update(UUID id, E entity) {
        log.info("Updating entity with id: {}", id);
        if (null == findById(id)) {
            log.error("Entity not found for update with id: {}", id);
            throw new ResourceNotFoundException("Entity not found for update");
        }
        entity.setId(id);
        E updatedEntity = crudRepository.save(entity);
        log.info("Entity updated: {}", updatedEntity);
        return updatedEntity;
    }

    @Transactional
    public void delete(UUID id) {
        log.info("Deleting entity with id: {}", id);
        var entity = findById(id);
        if (null == entity) {
            log.error("Entity not found for deletion with id: {}", id);
            throw new ResourceNotFoundException("Entity not found");
        }
        crudRepository.deleteById(id);
        log.info("Entity deleted with id: {}", id);
    }
}
