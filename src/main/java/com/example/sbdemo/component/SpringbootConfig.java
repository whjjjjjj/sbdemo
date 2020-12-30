package com.example.sbdemo.component;

import com.jfinal.template.Engine;
import com.jfinal.template.ext.spring.JFinalViewResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringbootConfig {

    @Bean(name = "jfinalViewResolver")
    public JFinalViewResolver getJfinalViewResolver() {
        //创建用于整合springboot的ViewRosolver扩展对象
        JFinalViewResolver jfr = new JFinalViewResolver();

        //对springboot进行配置
        jfr.setSuffix(".html");
        jfr.setContentType("text/html;chartset=UTF-8");

        //设置在模板中可通过#(session.value) 访问session中的数据
        jfr.setSessionInView(true);

        //获取Engine 对象, 对enjoy模板引擎进行配置
        Engine engine = JFinalViewResolver.engine;

        //热加载配置能对后续配置产生影响, 需要放在最前面
        engine.setDevMode(true);

        //使用ClassPathSourceFactory 从 class path 和 jar包中 加载模板
        engine.setToClassPathSourceFactory();

        // 在使用 ClassPathSourceFactory 时要使用 setBaseTemplatePath
        // 代替 jfr.setPrefix("/view/")
        engine.setBaseTemplatePath("/templates/");

        // 添加模板函数
//        engine.addSharedFunction("/common/_layout.html");

        // 更多配置与前面章节完全一样
        // engine.addDirective(...)
        // engine.addSharedMethod(...);
        return jfr;

    }

}
