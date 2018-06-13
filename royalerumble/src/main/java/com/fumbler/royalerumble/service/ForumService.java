package com.fumbler.royalerumble.service;

import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.Pagination;
import com.fumbler.royalerumble.model.Query;


import java.util.List;

public interface ForumService {

    Pagination makePagination(int page, Query query) throws Exception;

    Forum findOne(long id) throws Exception;

    List<Forum> findList(Pagination pagination) throws Exception;

    boolean insertForum(Forum forum) throws Exception;

    boolean updateForum(Forum forum) throws Exception;

    boolean deleteForum(long id) throws Exception;
}
