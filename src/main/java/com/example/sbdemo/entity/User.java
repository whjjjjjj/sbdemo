package com.example.sbdemo.entity;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class User implements Serializable {

    private Long userId;

    private String showId;
    private String userName;
    private String userUsername;
    private Long departmentId;
    private String userTelephone;
    private String userPassword;
    private String userSalt;
    private Long roleId;
    private int status;

    private Department department;
}
