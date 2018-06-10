package com.fumbler.royalerumble.dao;


import com.fumbler.royalerumble.model.Member;

public interface MemberDao extends BaseDao<Member, String> {

    Member selectUserName(String userName) throws Exception;

}
