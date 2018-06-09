package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.model.Comment;
import com.fumbler.royalerumble.model.Pagination;

import java.util.List;

public interface CommentService {

    Pagination makePagination(int page, long forumId, String sort, int perBlock) throws Exception;

    int getCountReply(long id) throws Exception;

    Comment findOneComment(long id) throws Exception;

    Comment findOneReply(long id) throws Exception;

    List<Comment> findListComment(Pagination pagination) throws Exception;

    boolean insert(Comment comment) throws Exception;

    boolean update(Comment comment) throws Exception;

    boolean delete(long id) throws Exception;

}
