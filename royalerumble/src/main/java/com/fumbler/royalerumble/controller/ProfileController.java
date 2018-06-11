package com.fumbler.royalerumble.controller;

import com.fumbler.royalerumble.dao.MemberDao;
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

@Slf4j
@Controller
@RequestMapping("/profile")
public class ProfileController {

    @Autowired
    MemberService service;

    @GetMapping(value = "/account")
    public String accountInfo(Member member, HttpSession session, Model model){
        model.addAttribute("account", "active");
        return "account/info";
    }

    @PostMapping("/account")
    public String accountInfoSubmit(Member member, BindingResult result,
                                    HttpSession session, Model model,
                                    RedirectAttributes redirectAttributes) throws Exception{
        Member sessionMember = (Member)session.getAttribute("USER");
        if(result.hasErrors()){
            return "account/info";
        }
        member.setId(sessionMember.getId());
        if(!service.memberUpdate(member)){
            model.addAttribute("result", "다시 시도해 주세요.");
            return "account/info";
        }
        Member newMember = service.getMember(sessionMember.getEmail());
        session.setAttribute("USER", newMember);
        redirectAttributes.addFlashAttribute("result", "변경 완료");
        return "redirect:/profile/account";
    }


    @GetMapping(value = "/password")
    public String changePassword(Member member, HttpSession session, Model model){
        model.addAttribute("account", "active");
        return "account/password";
    }

    @PostMapping("/password")
    public String changePasswordSubmit(Member member, BindingResult result,
                                       HttpSession session, Model model,
                                       RedirectAttributes redirectAttributes) throws Exception{
        Member sessionMember = (Member)session.getAttribute("USER");
        if(result.hasErrors()){
            return "account/password";
        }
        member.setId(sessionMember.getId());
        if(!service.memberUpdate(member)){
            model.addAttribute("result", "기존 비밀번호가 맞지 않습니다.");
            return "account/password";
        }
        Member newMember = service.getMember(sessionMember.getEmail());
        session.setAttribute("USER", newMember);
        redirectAttributes.addFlashAttribute("result", "변경 완료");
        return "redirect:/profile/password";
    }
}
