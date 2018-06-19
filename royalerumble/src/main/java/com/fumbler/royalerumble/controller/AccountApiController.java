package com.fumbler.royalerumble.controller;

import com.fumbler.royalerumble.model.Authenticate;
import com.fumbler.royalerumble.model.Member;
import com.fumbler.royalerumble.model.Message;
import com.fumbler.royalerumble.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/account")
public class AccountApiController {

    @Autowired
    MemberService service;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid Authenticate authenticate,
                                BindingResult result) throws Exception {
        Message message = new Message();
        if(result.hasErrors()) {
            message.setMessage("올바르게 입력해주세요.");
            message.setCode("bad.request");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        Member member = service.memberLogin(authenticate);
        if(member == null) {
            message.setMessage("아이디 또는 비밀번호가 틀립니다.");
            message.setCode("bad.request");
            return new ResponseEntity<>(message, HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(member, HttpStatus.OK);
    }
}
