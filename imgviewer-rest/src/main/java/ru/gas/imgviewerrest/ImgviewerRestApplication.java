package ru.gas.imgviewerrest;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@Slf4j
public class ImgviewerRestApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(ImgviewerRestApplication.class, args);
		log.info("START SPRING BOOT!!!");
		//Так можно выключить если завис
// 		context.close();
	}

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
						.allowedMethods("GET", "POST")
						.allowedOrigins("null");//такой хост при запросе с html, лежащей на компе
			}
		};
	}
}

