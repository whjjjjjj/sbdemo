package com.example.sbdemo.entity;

import lombok.Data;

@Data
public class DocumentReadRecord {

    private Long readId;

    private Long readTime;

    private Document document;

    private DocumentMonthRecord documentMonthRecord;

    private User user;
}
