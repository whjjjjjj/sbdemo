package com.example.sbdemo.component;

import com.example.sbdemo.entity.User;
import com.example.sbdemo.service.UserService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.servlet.ServletContext;


@Component
public class MyServletContextListener implements ApplicationListener<ContextRefreshedEvent> {
    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        //先获取上下文
        ApplicationContext applicationContext = contextRefreshedEvent.getApplicationContext();
        //获取对应的service
        UserService u = applicationContext.getBean(UserService.class);
        User u1 = u.getUser();
        //获取application域对象, 将查到的信息放在application域中
        ServletContext application = applicationContext.getBean(ServletContext.class);
        application.setAttribute("user", u1);
    }
}
