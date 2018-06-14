package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.model.Comment;
import com.fumbler.royalerumble.model.CommentParams;
import com.fumbler.royalerumble.model.ForumParams;
import com.fumbler.royalerumble.model.Pagination;

import java.util.List;
import java.util.Map;

public interface CommentService {

    Map<String, Object> makeMap(CommentParams params) throws Exception;

    int totalComment(long id) throws Exception;

    Pagination makePagination(CommentParams params, int perPage, int perBlock) throws Exception;

    Comment findOneComment(long id) throws Exception;

    List<Comment> findListComment(Pagination pagination) throws Exception;

    List<Comment> findListReply(Pagination pagination) throws Exception;

    boolean insert(Comment comment) throws Exception;

    boolean update(Comment comment) throws Exception;

    boolean delete(long id) throws Exception;

}
