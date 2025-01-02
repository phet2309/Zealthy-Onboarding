package com.zealthy.custom_onboarding.validation;

import com.zealthy.custom_onboarding.model.BaseEntity;
import com.zealthy.custom_onboarding.validation.impl.DefaultValidationStrategy;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
@RequiredArgsConstructor
public class ValidationStrategyFactory {

    private final ApplicationContext applicationContext;
    private final Map<Class<?>, IValidationStrategy<?>> validationStrategyMap;

    @PostConstruct
    public void init() {
    }

    @SuppressWarnings("unchecked")
    public <E extends BaseEntity> IValidationStrategy<E> getValidationStrategy(E entity) {
        return (IValidationStrategy<E>) validationStrategyMap.getOrDefault(entity.getClass(), applicationContext.getBean(DefaultValidationStrategy.class));
    }

}