package com.fumbler.royalerumble.dao;

import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.Query;


public interface ForumDao extends BaseDao<Forum, Long> {

    int getCount(Query query) throws Exception;
}
