package com.zealthy.custom_onboarding.repository;

import com.zealthy.custom_onboarding.model.Users;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

// Handles database operations for users entity
public interface UserRepository extends CrudRepository<Users> {
    @Query("SELECT u FROM Users u WHERE u.email = :email")
    Optional<Users> findUserByEmail(@Param("email") String email);

}
