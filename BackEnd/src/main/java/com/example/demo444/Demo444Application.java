package com.example.demo444;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.io.IOException;

@SpringBootApplication
public class Demo444Application {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(Demo444Application.class, args);

	}


}
