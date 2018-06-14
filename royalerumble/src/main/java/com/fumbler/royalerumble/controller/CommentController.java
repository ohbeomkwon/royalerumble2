package com.fumbler.royalerumble.controller;

import com.fumbler.royalerumble.model.Comment;
import com.fumbler.royalerumble.model.CommentParams;
import com.fumbler.royalerumble.model.Pagination;
import com.fumbler.royalerumble.service.CommentService;
import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.proxy.annotation.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


//TODO 추천 기능 넣기
@Slf4j
@RestController
@RequestMapping("/api/comment/{forumId}")
public class CommentController {

    @Autowired
    CommentService service;

//    @GetMapping
//    public Map<String, Object> getCommentList(
//            @PathVariable long forumId,
//            @RequestParam(value = "page", defaultValue = "1") int page,
//            @RequestParam(value = "sort", defaultValue = "default") String sort,
//            @RequestParam(value = "ref", defaultValue = "0") long commentRef) throws Exception{
//        Map<String, Object> map = new HashMap<>();
//        int total = service.totalComment(forumId);
//        Pagination pagination;
//        List<Comment> list;
//        if(commentRef == 0) {
//            pagination = service.makePagination(page, 1, params);
//            list = service.findListComment(pagination);
//        } else {
//            pagination = service.makePagination(page, 5, params);
//            list = service.findListReply(pagination);
//        }
//        map.put("pagination", pagination);
//        map.put("list", list);
//        map.put("total", total);
//        return map;
//    }

    @GetMapping
    public ResponseEntity getCommentList(@PathVariable long forumId,
                                         @ModelAttribute CommentParams params) throws Exception{
        params.setForumId(forumId);
        Map<String, Object> map = service.makeMap(params);
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity write(@RequestBody @Valid Comment comment,
                                BindingResult result) throws Exception {
        if(result.hasErrors()){
            return new ResponseEntity<>("유효성 에러",HttpStatus.BAD_REQUEST);
        }
        if(!service.insert(comment)){
            return new ResponseEntity<>("SQL 에러", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>("성공",HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity edit(@RequestBody @Valid Comment comment,
                               BindingResult result) throws Exception {
        return new ResponseEntity<>("성공",HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") long id) throws Exception {
        return new ResponseEntity<>("성공",HttpStatus.OK);
    }

}
