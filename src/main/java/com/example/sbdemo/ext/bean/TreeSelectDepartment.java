package com.example.sbdemo.ext.bean;

import lombok.Data;

@Data
public class TreeSelectDepartment {

    private String id;
    private String pId;
    private String name;

    public TreeSelectDepartment(String id, String pid, String name) {
        this.id = id;
        this.pId = pid;
        this.name = name;
    }
}
