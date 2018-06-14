package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.ForumParams;
import com.fumbler.royalerumble.model.Pagination;


import java.util.List;

public interface ForumService {

//    Pagination makePagination(int page, ForumParams params) throws Exception;

    Pagination makePagination(ForumParams params) throws Exception;

    Forum findOne(long id) throws Exception;

    List<Forum> findList(Pagination pagination) throws Exception;

    boolean insertForum(Forum forum) throws Exception;

    boolean updateForum(Forum forum) throws Exception;

    boolean deleteForum(long id) throws Exception;
}
