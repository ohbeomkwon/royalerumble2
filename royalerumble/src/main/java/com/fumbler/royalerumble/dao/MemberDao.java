package com.fumbler.royalerumble.dao;


import com.fumbler.royalerumble.model.Member;

public interface MemberDao extends BaseDao<Member, String> {

    Member selectUserName(String userName) throws Exception;

    int updateForumName(Member member) throws Exception;

    int updateCommentName(Member member) throws Exception;

    int updateAvatarName(Member member) throws Exception;

}
