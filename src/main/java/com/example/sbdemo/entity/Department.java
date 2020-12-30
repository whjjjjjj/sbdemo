package com.example.sbdemo.entity;

import lombok.Data;

@Data
public class Department {

    private Long departmentId;
    private String departmentCode;
    private String departmentName;
    private String parentCode;
    private int level;
    private String describe;
    private int status;
}
