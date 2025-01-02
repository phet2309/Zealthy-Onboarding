package com.zealthy.custom_onboarding.postprocessor;

import com.zealthy.custom_onboarding.model.BaseEntity;
import com.zealthy.custom_onboarding.postprocessor.impl.DefaultPostprocessingStrategy;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class PostprocessingStrategyFactory {
    private final ApplicationContext applicationContext;
    private final Map<Class<?>, IPostprocessingStrategy<?>> preprocessingStrategyMap;

    @PostConstruct
    public void init() {
    }

    @SuppressWarnings("unchecked")
    public <E extends BaseEntity> IPostprocessingStrategy<E> getPostprocessingStrategy(E entity) {
        return (IPostprocessingStrategy<E>) preprocessingStrategyMap.getOrDefault(entity.getClass(), applicationContext.getBean(DefaultPostprocessingStrategy.class));
    }
}
