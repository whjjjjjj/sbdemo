package com.example.sbdemo.ext.handle;


import com.example.sbdemo.ext.log.LogKit;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.Signature;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

@Aspect
@Component
public class LogAspectHandler {

    @Pointcut("execution(* com.example.sbdemo.controller..*.*(..))")
    public void pointCut() {
        LogKit.ADMIN_lOG.info("切面切入");
    }

    @Before("pointCut()")
    public void doBefore(JoinPoint joinPoint) {
        LogKit.ADMIN_lOG.info("之前执行");
        // 获取签名
        Signature signature = joinPoint.getSignature();
        // 获取切入的包名
        String declaringTypeName = signature.getDeclaringTypeName();
        // 获取即将执行的方法名
        String funcName = signature.getName();
        LogKit.ADMIN_lOG.info("即将执行方法为: {}，属于{}包", funcName, declaringTypeName);

        // 也可以用来记录一些信息，比如获取请求的url和ip
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        // 获取请求url
        String url = request.getRequestURL().toString();
        // 获取请求ip
        String ip = request.getRemoteAddr();
        LogKit.ADMIN_lOG.info("用户请求的url为：{}，ip地址为：{}", url, ip);
    }
}
