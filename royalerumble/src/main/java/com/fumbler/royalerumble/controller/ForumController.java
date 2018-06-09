package com.fumbler.royalerumble.controller;

import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.Pagination;
import com.fumbler.royalerumble.service.ForumService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.util.List;
@Slf4j
@Controller
@RequestMapping("/forums")
public class ForumController {

    @Autowired
    ForumService service;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String getForumList(
            @RequestParam(value = "page", defaultValue = "1") int page, Model model) throws Exception{
        Pagination pagination = service.makePagination(page);
        List<Forum> list = service.findList(pagination);
        model.addAttribute("pagination", pagination);
        model.addAttribute("list", list);
        log.info(list.toString());
        return "forums/list";
    }

    @RequestMapping(value = "/forum/{id}", method = RequestMethod.GET)
    public String getView(@PathVariable("id") long id, Model model) throws Exception {
        Forum forum = service.findOne(id);
        model.addAttribute("forum", forum);
        return "forums/forum";
    }

    @RequestMapping(value = "/writing", method = RequestMethod.GET)
    public String writing(Forum forum){
        return "forums/writing";
    }

    @RequestMapping(value = "/writing", method = RequestMethod.POST)
    public String writingSubmit(@Valid Forum forum, BindingResult result) throws Exception {
        if(result.hasErrors()){
            return "forums/writing";
        }
        if(!service.insertForum(forum)){
            return "forums/writing";
        }
        return "redirect:/forums/list";
    }
}
