package com.fumbler.royalerumble.controller;


import com.fumbler.royalerumble.model.Member;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {

    @RequestMapping(value = "/")
    public String home (Model model) {
        //TODO URL 기억하기
        model.addAttribute("home", "active");
        return "home";
    }

    @RequestMapping(value = "/success")
    public String success () {
        return "account/success";
    }

}
