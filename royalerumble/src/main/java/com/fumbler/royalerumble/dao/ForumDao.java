package com.fumbler.royalerumble.dao;

import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.ForumParams;


public interface ForumDao extends BaseDao<Forum, Long> {

    int getPageCount(ForumParams params) throws Exception;

    int deleteComment(long id) throws Exception;
}
