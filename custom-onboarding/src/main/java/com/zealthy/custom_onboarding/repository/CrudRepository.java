package com.zealthy.custom_onboarding.repository;

import com.zealthy.custom_onboarding.model.BaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

// Handles crud database operations with generic base entity
public interface CrudRepository<E extends BaseEntity> extends JpaRepository<E, UUID> {
}
