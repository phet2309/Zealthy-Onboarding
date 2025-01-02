package com.zealthy.custom_onboarding.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

// admin_config table in the database
@Data
@Entity
@Table(name = "admin_config")
@EqualsAndHashCode(callSuper = true)
public class AdminConfig extends BaseEntity {

    @Column(name = "page_number", nullable = false)
    private Integer pageNumber;

    @Column(name = "component_name", nullable = false, length = 100)
    private String componentName;

}
