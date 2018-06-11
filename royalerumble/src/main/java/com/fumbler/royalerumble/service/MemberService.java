package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.model.Authenticate;
import com.fumbler.royalerumble.model.Member;

public interface MemberService {

    Member getMember(String email) throws Exception;

    Member memberLogin(Authenticate authenticate) throws Exception;

    boolean memberJoin(Member member) throws Exception;

    boolean duplication(String email, String userName) throws Exception;

    boolean memberUpdate(Member member) throws Exception;


}
