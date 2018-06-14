package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.dao.CommentDao;
import com.fumbler.royalerumble.model.Comment;
import com.fumbler.royalerumble.model.CommentParams;
import com.fumbler.royalerumble.model.Pagination;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class CommentServiceImpl implements CommentService {

    @Autowired
    CommentDao dao;

    @Override
    public Map<String, Object> makeMap(CommentParams params) throws Exception {
        Map<String, Object> map = new HashMap<>();
        int total = totalComment(params.getForumId());
        Pagination pagination;
        List<Comment> list;
        if(params.getRef() == 0) {
            pagination = makePagination(params, 20,1);
            list = findListComment(pagination);
        } else {
            pagination = makePagination(params, 30,5);
            list = findListReply(pagination);
        }
        map.put("pagination", pagination);
        map.put("list", list);
        map.put("total", total);
        return map;
    }

    @Override
    public int totalComment(long forumId) throws Exception {
        return dao.getCount(forumId);
    }

    @Override
    public Pagination makePagination(CommentParams params, int perPage, int perBlock) throws Exception {
        int total = dao.getPageCount(params);
        Pagination pagination = new Pagination(params.getPage(), total, perPage, perBlock);
        pagination.setForumId(params.getForumId());
        pagination.setSort(params.getSort());
        pagination.setCommentRef(params.getRef());
        return pagination;
    }

    @Override
    public Comment findOneComment(long id) throws Exception {
        return dao.selectOne(id);
    }


    @Override
    public List<Comment> findListComment(Pagination pagination) throws Exception {
        return dao.selectList(pagination);
    }

    @Override
    public List<Comment> findListReply(Pagination pagination) throws Exception {
        return dao.selectListReply(pagination);
    }

    @Override
    @Transactional
    public boolean insert(Comment comment) throws Exception {
        return dao.insert(comment) == 1;
    }

    @Override
    @Transactional
    public boolean update(Comment comment) throws Exception {
        return false;
    }

    @Override
    @Transactional
    public boolean delete(long id) throws Exception {
        return false;
    }
}
