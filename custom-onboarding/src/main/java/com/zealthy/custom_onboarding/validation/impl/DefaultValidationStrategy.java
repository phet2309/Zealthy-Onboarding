package com.zealthy.custom_onboarding.validation.impl;

import com.zealthy.custom_onboarding.model.BaseEntity;
import com.zealthy.custom_onboarding.validation.IValidationStrategy;
import org.springframework.stereotype.Component;

@Component
public class DefaultValidationStrategy<E extends BaseEntity> implements IValidationStrategy<E> {

    @Override
    public void validate(E entity) {
        // no default validation needed
    }
}
