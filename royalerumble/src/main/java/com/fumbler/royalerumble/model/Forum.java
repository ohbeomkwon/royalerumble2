package com.fumbler.royalerumble.model;

import lombok.Data;

import java.util.Date;

@Data
public class Forum {

    private long id;

    private String userName;

    private String subject;

    private String content;

    private int commentCnt;

    private Date regDate;

    private int hits;

}
