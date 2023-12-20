package com.example.demo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@SpringBootApplication
@PropertySource("classpath:application.properties")
public class CredoperationprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CredoperationprojectApplication.class, args);
		System.out.println("App is successfully started");
	}

}
