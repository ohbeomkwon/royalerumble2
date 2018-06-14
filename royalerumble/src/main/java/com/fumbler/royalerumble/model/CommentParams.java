package com.fumbler.royalerumble.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CommentParams {

    private int page;

    private long forumId;

    private String sort;

    private long ref;

    public CommentParams() {
        page = 1;
        sort = "default";
        ref = 0;
    }
}

