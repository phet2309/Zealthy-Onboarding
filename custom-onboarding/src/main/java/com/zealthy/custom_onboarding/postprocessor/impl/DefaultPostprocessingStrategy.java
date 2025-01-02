package com.zealthy.custom_onboarding.postprocessor.impl;

import com.zealthy.custom_onboarding.model.BaseEntity;
import com.zealthy.custom_onboarding.postprocessor.IPostprocessingStrategy;
import org.springframework.stereotype.Component;

@Component
public class DefaultPostprocessingStrategy implements IPostprocessingStrategy<BaseEntity> {
    @Override
    public void postProcess(BaseEntity entity) {
        // no default preprocessing needed
    }
}
