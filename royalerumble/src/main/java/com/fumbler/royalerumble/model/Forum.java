package com.fumbler.royalerumble.model;

import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;
import org.hibernate.validator.constraints.NotEmpty;

import java.util.Date;

@Data
public class Forum {

    private long id;

//    private long memberId;

    @NotBlank
    private String userName;

    @NotEmpty
    private String subject;

    private String updateSubject;

    @NotEmpty
    private String content;

    private int commentCnt;

    private Date regDate;

    private int modified;

    private int hits;

    private String type;

    private String insertType;

    public boolean userNameMatching(String userName) {
        return this.userName.equals(userName);
    }
}
