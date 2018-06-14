package com.fumbler.royalerumble.dao;


import com.fumbler.royalerumble.model.Comment;
import com.fumbler.royalerumble.model.CommentParams;
import com.fumbler.royalerumble.model.Pagination;

import java.util.List;

public interface CommentDao extends BaseDao<Comment, Long> {

    int getCount(long id) throws Exception;

    int getPageCount(CommentParams params) throws Exception;

    List<Comment> selectListReply(Pagination pagination) throws Exception;

}
