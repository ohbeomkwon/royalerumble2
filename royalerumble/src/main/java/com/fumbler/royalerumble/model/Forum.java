package com.fumbler.royalerumble.model;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.Date;

@Data
public class Forum {

    private long id;

    @NotBlank
    private String userName;

    @NotEmpty
    private String subject;

    @NotEmpty
    private String content;

    private int commentCnt;

    private Date regDate;

    private int hits;

    private String type;

    private String insertType;
}
