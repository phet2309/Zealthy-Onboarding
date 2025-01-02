package com.zealthy.custom_onboarding.service;

import com.zealthy.custom_onboarding.model.AdminConfig;
import com.zealthy.custom_onboarding.postprocessor.PostprocessingStrategyFactory;
import com.zealthy.custom_onboarding.repository.CrudRepository;
import com.zealthy.custom_onboarding.validation.ValidationStrategyFactory;
import org.springframework.stereotype.Service;

// Performs business logic for admin_config table
@Service
public class AdminService extends CrudService<AdminConfig> {
    public AdminService(CrudRepository<AdminConfig> crudRepository, ValidationStrategyFactory validationStrategyFactory, PostprocessingStrategyFactory postprocessingStrategyFactory) {
        super(crudRepository, validationStrategyFactory, postprocessingStrategyFactory);
    }
}
