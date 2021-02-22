package com.example.sbdemo.entity;

import lombok.Data;

@Data
public class RequestRecord {

    private Long requestId;

    private String requestRemarks;

    private Long requestTime;

    private Long examineTime;

    private String examineRemarks;

    private int examineStatus;

    private User user;

    private Department department;
}

