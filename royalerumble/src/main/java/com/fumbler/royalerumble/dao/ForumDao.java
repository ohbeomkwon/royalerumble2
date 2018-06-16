package com.fumbler.royalerumble.dao;

import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.Params;


public interface ForumDao extends BaseDao<Forum, Long> {

    int getPageCount(Params params) throws Exception;

    int deleteComment(long id) throws Exception;

    int attachmentCheck(Forum forum) throws Exception;

    int deleteAttachment(long id) throws Exception;
}
