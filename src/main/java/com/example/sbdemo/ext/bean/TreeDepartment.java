package com.example.sbdemo.ext.bean;

import lombok.Data;

import java.util.List;

@Data
public class TreeDepartment {
    private String text;
    private String tags;
    private List<TreeDepartment> nodes;
}
