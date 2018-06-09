package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.model.Authentication;
import com.fumbler.royalerumble.model.Member;

public interface MemberService {

    Member memberLogin(Authentication authentication) throws Exception;

    boolean memberJoin(Member member) throws Exception;

    boolean checkEmail(String email) throws Exception;

}
