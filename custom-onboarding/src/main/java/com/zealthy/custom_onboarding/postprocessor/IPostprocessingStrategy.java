package com.zealthy.custom_onboarding.postprocessor;

import com.zealthy.custom_onboarding.model.BaseEntity;

// Postprocessing interface for building different postprocessing strategies
public interface IPostprocessingStrategy<E extends BaseEntity> {
    void postProcess(E entity);
}
