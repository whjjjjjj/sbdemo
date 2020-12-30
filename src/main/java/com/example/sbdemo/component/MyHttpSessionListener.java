package com.example.sbdemo.component;

import com.example.sbdemo.ext.log.LogKit;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

/**
 * 可获取在线人数
 */
@Component
public class MyHttpSessionListener implements HttpSessionListener {

    public Integer count = 0;

    @Override
    public synchronized void sessionCreated(HttpSessionEvent httpSessionEvent) {
        LogKit.USER_LOG.info("新用户上线");
        count ++;
        httpSessionEvent.getSession().getServletContext().setAttribute("count", count);
    }

    @Override
    public synchronized void sessionDestroyed(HttpSessionEvent httpSessionEvent) {
        LogKit.USER_LOG.info("用户下线");
        count --;
        httpSessionEvent.getSession().getServletContext().setAttribute("count", count);
    }
}
