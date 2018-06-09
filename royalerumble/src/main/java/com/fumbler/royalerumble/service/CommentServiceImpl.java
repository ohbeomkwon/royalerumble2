package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.dao.CommentDao;
import com.fumbler.royalerumble.model.Comment;
import com.fumbler.royalerumble.model.Pagination;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentDao dao;

    @Override
    public Pagination makePagination(int page, long forumId, String sort, int perBlock) throws Exception {
        int total = dao.getCountComment(forumId);
        Pagination pagination = new Pagination(page, total, 10, perBlock);
        pagination.setForumId(forumId);
        pagination.setSort(sort);
        return pagination;
    }

    @Override
    public int getCountReply(long id) throws Exception {
        return 0;
    }

    @Override
    public Comment findOneComment(long id) throws Exception {
        return null;
    }

    @Override
    public Comment findOneReply(long id) throws Exception {
        return null;
    }

    @Override
    public List<Comment> findListComment(Pagination pagination) throws Exception {
        return dao.selectList(pagination);
    }

    @Override
    public boolean insert(Comment comment) throws Exception {
        return dao.insert(comment) == 1;
    }

    @Override
    public boolean update(Comment comment) throws Exception {
        return false;
    }

    @Override
    public boolean delete(long id) throws Exception {
        return false;
    }
}
