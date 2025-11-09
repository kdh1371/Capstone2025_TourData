package com.capstone.tourdata;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class TourdataApplication {

	public static void main(String[] args) {
		SpringApplication.run(TourdataApplication.class, args);
	}

}
