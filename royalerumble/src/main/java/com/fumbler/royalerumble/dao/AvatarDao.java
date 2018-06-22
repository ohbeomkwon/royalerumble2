package com.fumbler.royalerumble.dao;

import com.fumbler.royalerumble.model.Avatar;
import com.fumbler.royalerumble.model.Member;

public interface AvatarDao extends BaseDao<Avatar, String> {

    int updateUserName(Member member) throws Exception;
}
