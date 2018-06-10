package com.fumbler.royalerumble.model;

import lombok.*;


@Data
@NoArgsConstructor
public class Query {

    private String type;

    private int select;

    private String keyword;

    private String likeKeyword;

    public Query(String type, int select, String keyword) {
        //TODO 검색 키워드 sql injection 생각해보기
        this.type = type;
        this.select = select;
        this.keyword = keyword;
        this.likeKeyword = "%" + this.keyword + "%";
    }
}
