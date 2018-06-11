package com.fumbler.royalerumble.dao;



import com.fumbler.royalerumble.model.Member;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;


@Component
public class TestDao {
    private Map<String, Object> map;

    public TestDao() {
    }

    public Map<String, Object> getMap() {
        return map;
    }

    public void setMap(Map<String, Object> map) {
        this.map = map;
    }
}
