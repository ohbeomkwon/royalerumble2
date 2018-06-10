package com.fumbler.royalerumble.controller;

import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.Pagination;
import com.fumbler.royalerumble.model.Query;
import com.fumbler.royalerumble.model.Search;
import com.fumbler.royalerumble.service.ForumService;
import com.sun.deploy.net.HttpResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Null;
import java.net.URLEncoder;
import java.util.List;
@Slf4j
@Controller
@RequestMapping("/forums")
public class ForumController {

    @Autowired
    ForumService service;

    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public String getForumList(
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "type", defaultValue = "free") String type,
            @RequestParam(value = "select", defaultValue = "0") int select,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            Search search, Model model) throws Exception{
        //TODO Pagination 에 type,select,keyword 정보 추가하기...
        Query query = new Query(type, select, keyword);
        Pagination pagination = service.makePagination(page, query);
        List<Forum> list = service.findList(pagination);
        model.addAttribute("pagination", pagination);
        model.addAttribute("list", list);
        model.addAttribute("forum", "active");
        return "forums/list";
    }

    @RequestMapping(value = "/list", method = RequestMethod.POST)
    public String forumSearch(@Valid Search search, BindingResult result) throws Exception{
        String query =
                "type=" + search.getSearchType() + "&select=" + search.getSearchSelect();
        if(result.hasErrors()){
            return "redirect:/forums/list?" + query;
        }
        return "redirect:/forums/list?" + query + "&keyword=" +
                URLEncoder.encode(search.getSearchKeyword(),"UTF-8");
    }

    @RequestMapping(value = "/forum/{id}", method = RequestMethod.GET)
    public String getView(@PathVariable("id") long id, Model model) throws Exception {
        Forum forum = service.findOne(id);
        model.addAttribute("forum", forum);
        return "forums/forum";
    }

    @RequestMapping(value = "/writing", method = RequestMethod.GET)
    public String writing(
            @RequestParam(value = "type", defaultValue = "free") String type, Forum forum, Model model){
        model.addAttribute("type", type);
        return "forums/writing";
    }

    @RequestMapping(value = "/writing", method = RequestMethod.POST)
    public String writingSubmit(@Valid Forum forum, BindingResult result, Model model) throws Exception {
        if(result.hasErrors()){
            return "redirect:/forums/writing?type="+forum.getType();
        }
        if(!service.insertForum(forum)){
            return "redirect:/forums/writing?type="+forum.getType();
        }
        return "redirect:/forums/list?type="+forum.getType();
    }
}
