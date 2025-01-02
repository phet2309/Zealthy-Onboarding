package com.zealthy.custom_onboarding.controller;

import com.zealthy.custom_onboarding.model.AdminConfig;
import com.zealthy.custom_onboarding.service.CrudService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Admin controller to intercept /v1/admin request
@RestController
@RequestMapping("/v1/admin")
public class AdminController extends CrudController<AdminConfig> {
    public AdminController(CrudService<AdminConfig> crudService) {
        super(crudService);
    }
}
