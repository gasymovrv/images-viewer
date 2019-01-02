package ru.gas.imgviewer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@Slf4j
public class Application {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(Application.class, args);
        log.info("START SPRING BOOT!!!");
        //Так можно выключить если завис
// 		context.close();
    }

// теперь не нужно, т.к. рест-запросы с того же сервера

    /**
     * Глобальное разрешение CORS
     * Википедия:
     * "Cross-origin resource sharing
     * (CORS; с англ. — «совместное использование ресурсов между разными источниками») —
     * технология современных браузеров,
     * которая позволяет предоставить веб-странице доступ к ресурсам другого домена
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("DELETE", "GET", "POST")
                        .allowedOrigins("*");
            }
        };
    }
}
