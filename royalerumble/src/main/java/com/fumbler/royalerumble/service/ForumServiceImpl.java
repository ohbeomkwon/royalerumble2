package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.dao.ForumDao;
import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.ForumParams;
import com.fumbler.royalerumble.model.Pagination;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
public class ForumServiceImpl implements ForumService{

    @Autowired
    ForumDao dao;

    @Override
    public Pagination makePagination(ForumParams params) throws Exception {
        int total = dao.getPageCount(params);
        Pagination pagination = new Pagination(params.getPage(), total, 10, 10);
        pagination.setType(params.getType());
        pagination.setSelect(params.getSelect());
        pagination.setKeyword(params.getKeyword());
        return pagination;
    }

    @Override
    public Forum findOne(long id) throws Exception {
        return dao.selectOne(id);
    }

    @Override
    public List<Forum> findList(Pagination pagination) throws Exception {
        return dao.selectList(pagination);
    }

    @Override
    @Transactional
    public boolean insertForum(Forum forum) throws Exception {
        return dao.insert(forum) == 1;
    }

    @Override
    @Transactional
    public boolean updateForum(Forum forum) throws Exception {
        return dao.update(forum) == 1;
    }

    @Override
    @Transactional
    public boolean deleteForum(long id) throws Exception {
        dao.deleteComment(id);
        return dao.delete(id) == 1;
    }

}
