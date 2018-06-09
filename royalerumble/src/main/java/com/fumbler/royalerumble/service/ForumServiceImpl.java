package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.dao.ForumDao;
import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.Pagination;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class ForumServiceImpl implements ForumService{

    @Autowired
    ForumDao dao;

    @Override
    public Pagination makePagination(int page) throws Exception {
        int total = dao.getCount();
        log.info("총 갯수 : "+total);
        return new Pagination(page, total, 10, 10);
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
    public boolean insertForum(Forum forum) throws Exception {
        return dao.insert(forum) == 1;
    }
}
