package com.fumbler.royalerumble.controller;

import com.fumbler.royalerumble.model.Authenticate;
import com.fumbler.royalerumble.model.Member;
import com.fumbler.royalerumble.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.concurrent.ExecutionException;

@Controller
@Slf4j
public class AccountController {

    @Autowired
    MemberService service;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Authenticate authenticate, Model model) {
        model.addAttribute("login", "active");
        return "account/login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String loginSubmit(@Valid Authenticate authenticate,
                              BindingResult result,
                              HttpSession session) throws Exception {
        if(result.hasErrors()){
            return "account/login";
        }
        Member member = service.memberLogin(authenticate);
        if(member == null) {
            result.reject("loginFail", "아이디 또는 비밀번호가 틀립니다.");
            return "account/login";
        }
        session.setAttribute("USER", member);
        return "redirect:/";
    }

    @RequestMapping(value = "/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }

    @RequestMapping(value = "/join", method = RequestMethod.GET)
    public String join(Member member, Model model) {
        model.addAttribute("join", "active");
        return "account/join";
    }

    @RequestMapping(value = "/join", method = RequestMethod.POST)
    public String joinSubmit(@Valid Member member,
                             BindingResult result,
                             RedirectAttributes redirectAttributes) throws Exception{
        if(result.hasErrors()) {
            return "account/join";
        }
        log.info(member.toString());
        if(!service.memberJoin(member)){
            return "account/join";
        }
        redirectAttributes.addFlashAttribute("member", member);
        return "account/success";
    }

    @RequestMapping(value = "/success", method = RequestMethod.GET)
    public String joinSuccess(){
        return "account/success";
    }

    @ResponseBody
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    public boolean duplication(
            @RequestParam(value = "email", defaultValue = "null") String email,
            @RequestParam(value = "name", defaultValue = "null") String userName) throws Exception {
        return service.duplication(email, userName);
    }

    @RequestMapping(value = "account/{id}", method = RequestMethod.GET)
    public String accountInfo(@PathVariable("id") long id, HttpSession session){
        Member sessionMember = (Member) session.getAttribute("USER");
        if(sessionMember.getId() != id) {
            return "redirect:/home";
        }
        return "account/info";
    }
}
