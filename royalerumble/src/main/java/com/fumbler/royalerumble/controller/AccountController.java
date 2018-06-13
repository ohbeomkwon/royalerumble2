package com.fumbler.royalerumble.controller;

import com.fumbler.royalerumble.model.Authenticate;
import com.fumbler.royalerumble.model.Member;
import com.fumbler.royalerumble.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.StringTokenizer;
import java.util.concurrent.ExecutionException;

@Controller
@Slf4j
public class AccountController {

    @Autowired
    MemberService service;

    private String uriTokenizer(String uri) {
        //TODO 정규표현식도 생각해보기...
        String rootURI = "";
        String requestURL = "";
        log.info("테스트 uri " + uri);
        if(uri != null && !uri.isEmpty()) {
            StringTokenizer tokenizer = new StringTokenizer(uri, "/");
            // "/" 네번째 까지만 자르기
            for (int i = 0; i < 4; i++) {
                if (i != 3) {
                    rootURI += tokenizer.nextToken();
                } else if(tokenizer.hasMoreTokens()){
                    requestURL = tokenizer.nextToken();
                }
            }
            log.info("분리된 이전 URL" + requestURL);
            if(requestURL.equals("/") || requestURL.equals("login") || requestURL.equals("join")){
                return "/";
            }
            log.info("쿼리포함 URL 경로" + uri.substring(rootURI.length() + 3));
            return uri.substring(rootURI.length() + 3);
        }
        return "/";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(@ModelAttribute("url") String url, Authenticate authenticate,
                        HttpServletRequest request, Model model) {
        if (url != null && !url.isEmpty()) {
            //인터셉터일 경우
            authenticate.setInterceptorMessage("로그인이 필요한 서비스입니다.");
        } else {
            //로그인 버튼을 누른경우
            url = uriTokenizer(request.getHeader("referer"));
        }
        authenticate.setUrl(url);
        model.addAttribute("login", "active");
        return "account/login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String loginSubmit(@Valid Authenticate authenticate,
                              BindingResult result,
                              HttpSession session) throws Exception {
        String url = authenticate.getUrl();
        if (result.hasErrors()) {
            return "account/login";
        }
        Member member = service.memberLogin(authenticate);
        if (member == null) {
            result.reject("loginFail", "아이디 또는 비밀번호가 틀립니다.");
            return "account/login";
        }
        session.setAttribute("USER", member);
        if (url != null && !url.isEmpty()) {
            return "redirect:" + url;
        }
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
                             RedirectAttributes redirectAttributes) throws Exception {
        if (result.hasErrors()) {
            return "account/join";
        }
        if (!service.memberJoin(member)) {
            return "account/join";
        }
        redirectAttributes.addFlashAttribute("member", member);
        return "account/success";
    }

    @ResponseBody
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    public boolean duplication(
            @RequestParam(value = "email", defaultValue = "null") String email,
            @RequestParam(value = "name", defaultValue = "null") String userName) throws Exception {
        return service.duplication(email, userName);
    }

}
