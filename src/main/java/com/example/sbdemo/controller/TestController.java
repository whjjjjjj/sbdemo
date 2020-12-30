package com.example.sbdemo.controller;


import com.example.sbdemo.common.JsonResult;
import com.example.sbdemo.entity.Department;
import com.example.sbdemo.entity.User;
import com.example.sbdemo.ext.log.LogKit;
import com.example.sbdemo.service.UserService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

@Controller
public class TestController {

    @Autowired
    UserService userService;

//    @RequestMapping(path = "/test")
//    @ResponseBody
//    public List<String> test(HttpServletRequest request, @Validated User user, BindingResult result) {
//
//        LogKit.ADMIN_lOG.info("1111");
//
//        List<String> errors = new ArrayList<>();
//        // 如果 BindingResult 的 hasErrors 方法返回true，则表示有错误信息
//        if (result.hasErrors()) {
//            List<ObjectError> allErrors = result.getAllErrors();
//            /// 遍历错误信息，返回给前端
//            for (ObjectError error : allErrors) {
//                errors.add(error.getDefaultMessage());
//            }
//        }
//        return errors;
//    }

//    @RequestMapping("/user")
//    public String getTotalUser(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
//        Cookie cookie;
//        try {
//            //把sessionId记录在浏览器
//            cookie = new Cookie("JSESSIONID", URLEncoder.encode(httpRequest.getSession().getId(), "utf-8"));
//            cookie.setPath("/");
//            cookie.setMaxAge(48*60*60);
//            httpResponse.addCookie(cookie);
//        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
//        }
//        Integer count = (Integer)httpRequest.getSession().getServletContext().getAttribute("count");
//        return "当前在线人数:" + count;
//    }
//
//    @RequestMapping("/ceshi")
//    @ResponseBody
//    public User get() {
//        System.out.println(userService.get());
//
//        return userService.get();
//    }
//
//    @RequestMapping("/ceshi1")
//    @ResponseBody
//    public Department get1() {
//        System.out.println(userService.get1());
//        return userService.get1();
//    }


}
