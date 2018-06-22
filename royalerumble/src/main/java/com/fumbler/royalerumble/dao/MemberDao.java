package com.fumbler.royalerumble.dao;


import com.fumbler.royalerumble.model.Member;

import java.util.List;

public interface MemberDao extends BaseDao<Member, String> {

    Member selectUserName(String userName) throws Exception;

    List<String> searchList(String userName) throws Exception;

}
