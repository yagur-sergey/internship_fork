package com.syagur.resourceserver.common.exception;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CustomErrorResponse {

    private String message;
    private LocalDateTime time;
    private int status;

    public CustomErrorResponse(String message, int status) {
        this.message = message;
        this.status = status;
        this.time = LocalDateTime.now();
    }


}