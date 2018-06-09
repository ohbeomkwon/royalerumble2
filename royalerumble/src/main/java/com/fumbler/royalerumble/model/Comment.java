package com.fumbler.royalerumble.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.AssertTrue;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    private long id;

    private long forumId;

    private String userName;

    private String content;

    private int commentRef;

    private int commentLevel;

    private int commentCnt;

    private Date regDate;
}
