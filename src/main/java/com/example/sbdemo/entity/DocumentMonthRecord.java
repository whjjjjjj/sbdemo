package com.example.sbdemo.entity;

import lombok.Data;

@Data
public class DocumentMonthRecord {

    private Long monthId;

    private int year;

    private int month;

    private int uploadSum;

    private int readSum;

    private Long createTime;
}
