package com.example.sbdemo.service;

import com.example.sbdemo.entity.Department;
import com.example.sbdemo.entity.User;
import com.example.sbdemo.exception.BusinessMsgEnum;
import com.example.sbdemo.ext.log.LogKit;
import com.example.sbdemo.mapper.UserMapper;
import com.example.sbdemo.util.Md5Util;
import com.example.sbdemo.util.StringUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.jfinal.kit.HashKit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;


//    public User get() {
//        User u = userMapper.findDepartmentCodeById(1L);
//        return u;
//    }
//
//    public Department get1() {
//        Department d = userMapper.findD(1L);
//        return d;
//    }
//
    public User getUser() {
        User u = new User();
        u.setUserId(1L);
        u.setUserName("cs");

        return u;
    }
//
//    public PageInfo getUser1() {
//        User u = new User();
//        u.setUserId(1L);
//        u.setUserName("cs");
//        User u1 = new User();
//        u.setUserId(2L);
//        u.setUserName("CS1");
//        List<User> list = new ArrayList<>();
//        list.add(u) ;
//        list.add(u1);
//
//        PageHelper.startPage(1,10);
//        PageInfo<User> page = new PageInfo(list);
//        page.getList().stream().forEach(i -> {
//            i.getDepartmentId();
//        });
//        return page;
////        return u;
//    }

    public PageInfo pageList(List<Long> departmentIds, Integer pageNumber, Integer pageSize) {
        List<User> list = userMapper.findAll(departmentIds);

        PageHelper.startPage(pageNumber, pageSize);
        PageInfo<User> page = new PageInfo(list);

        return page;
    }

    public boolean resetPwd(Long userId) {
        User user = userMapper.findOneById(userId);
        String salt = HashKit.generateSaltForSha256();
        String password = (StringUtil.isEmpty(user.getUserUsername()) ? "user" : user.getUserUsername().trim()) + "@123456";
        password = Md5Util.md5(password);
        password = Md5Util.md5(salt + password);
        user.setUserSalt(salt);
        user.setUserPassword(password);
        LogKit.ADMIN_lOG.info("重置账号" + userId);
        return userMapper.updateUserPwd(user) >0;
    }

    public boolean stopUser(Long userId) {
        User user = userMapper.findOneById(userId);
        user.setStatus(0);
        LogKit.ADMIN_lOG.info("禁用账号" + userId);
        return userMapper.updateUserState(user) >0;
    }

    public boolean setAdmin(Long userId) {
        User user = userMapper.findOneById(userId);
        user.setRoleId(2L);
        LogKit.ADMIN_lOG.info("设置账号" + userId + "为管理员");
        return userMapper.updateUserRole(user) >0;
    }

    public boolean updateUser(String type, User user) {
        boolean b = false;
        if ("mod".equals(type)) {
            b = userMapper.updateUserDepartment(user) > 0;
            LogKit.ADMIN_lOG.info("修改用户信息" + user.getUserId());
        } else {
            String salt = HashKit.generateSaltForSha256();
            String password = user.getUserUsername().trim() + "@123456";
            password = Md5Util.md5(password);
            password = Md5Util.md5(salt + password);
            user.setUserSalt(salt);
            user.setUserPassword(password);
            user.setStatus(1);
            //showId 由 账号和用户名组成
            user.setShowId(Md5Util.md5(user.getUserName().trim() + user.getUserUsername().trim()));
            user.setRoleId(3L);
            b = userMapper.insertUser(user) > 0;
            LogKit.ADMIN_lOG.info("新增用户" + user.getUserId());
        }
        return b ;
    }
}
