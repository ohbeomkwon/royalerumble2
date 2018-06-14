package com.fumbler.royalerumble.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Data
public class ForumParams {

    private int page;

    private String type;

    private int select;

    private String keyword;

    public ForumParams() {
        //TODO 검색 키워드 sql injection 생각해보기
        page = 1;
        type = "free";
        select = 0;
        keyword = "";
    }


//    public ForumParams(String type, int select, String keyword) {
//        this.type = type;
//        this.select = select;
//        this.keyword = keyword;
//    }
}

