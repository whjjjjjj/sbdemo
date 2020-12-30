package com.example.sbdemo.entity;

import lombok.Data;

@Data
public class DocumentMonthRecord {

    private Long monthId;

    private int year;

    private int month;

    private int upload_sum;

    private int read_sum;

    private Long create_time;
}
