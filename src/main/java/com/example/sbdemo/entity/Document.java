package com.example.sbdemo.entity;

import lombok.Data;

@Data
public class Document {

    private Long documentId;

    private String documentName;

    private String documentType;

    private String documentSize;

    private int documentPermission;

    private String dfsName;

    private String dfsToken;

    private String dfsPath;

    private int status;
}
