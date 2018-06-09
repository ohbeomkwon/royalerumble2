package com.fumbler.royalerumble.dao;


import com.fumbler.royalerumble.model.Comment;

public interface CommentDao extends BaseDao<Comment, Long> {

    int getCountComment(long id) throws Exception;

    int getCountReply(long commentRef) throws Exception;
}
