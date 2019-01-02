package ru.gas.imgviewer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    //При обновлении страницы, когда путь например authors/1/edit - не работает
//    @RequestMapping(value = {"/"})
//    public String index() {
//        return "index";
//    }

}
