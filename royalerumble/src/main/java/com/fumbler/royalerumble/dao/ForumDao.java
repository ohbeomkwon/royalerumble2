package com.fumbler.royalerumble.dao;

import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.Member;
import com.fumbler.royalerumble.model.Params;


public interface ForumDao extends BaseDao<Forum, Long> {

    int increaseHits(long id) throws Exception;

    int getPageCount(Params params) throws Exception;

    int updateUserName(Member member) throws Exception;

    int attachmentCheck(Forum forum) throws Exception;


}
