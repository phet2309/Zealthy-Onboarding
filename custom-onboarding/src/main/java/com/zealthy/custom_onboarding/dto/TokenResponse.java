package com.zealthy.custom_onboarding.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

// DTO for token response
@Data
@AllArgsConstructor
public class TokenResponse {
    private String token;
    private String message;

}
