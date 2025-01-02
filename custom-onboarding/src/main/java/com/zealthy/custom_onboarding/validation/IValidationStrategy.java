package com.zealthy.custom_onboarding.validation;

import com.zealthy.custom_onboarding.model.BaseEntity;

// Interface for the validation strategy
public interface IValidationStrategy <E extends BaseEntity> {
    void validate(E entity);
}
