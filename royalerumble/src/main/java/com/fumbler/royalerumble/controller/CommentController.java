package com.fumbler.royalerumble.controller;

import com.fumbler.royalerumble.model.Comment;
import com.fumbler.royalerumble.model.Pagination;
import com.fumbler.royalerumble.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/comment/{forumId}")
public class CommentController {

    @Autowired
    CommentService service;

    @GetMapping
    public Map<String, Object> getCommentList(
            @PathVariable long forumId,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "sort", defaultValue = "default") String sort) throws Exception{
        Map<String, Object> map = new HashMap<>();
        Pagination pagination = service.makePagination(page, forumId, sort, 1);
        List<Comment> list = service.findListComment(pagination);
        map.put("pagination", pagination);
        map.put("list", list);
        return map;
    }

    @PostMapping
    public int insert(@RequestBody Comment comment, BindingResult result) throws Exception {
        if(result.hasErrors()){

        }
        log.info(comment.toString());
        service.insert(comment);
        return 0;
    }
}
