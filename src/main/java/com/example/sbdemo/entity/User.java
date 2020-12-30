package com.example.sbdemo.entity;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class User implements Serializable {

    private Long userId;

    @NotNull(message = "没有此id")
    private String showId;
    private String userName;
    @NotEmpty(message = "没有这名字")
    private String userUsername;
    private Long departmentId;
    private String userTelephone;
    private String userPassword;
    private String userSalt;
    private Long roleId;
    private int status;

    private Department department;
}
