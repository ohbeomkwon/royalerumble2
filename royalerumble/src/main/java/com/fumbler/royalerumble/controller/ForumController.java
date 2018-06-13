package com.fumbler.royalerumble.controller;

import com.fumbler.royalerumble.model.Forum;
import com.fumbler.royalerumble.model.Member;
import com.fumbler.royalerumble.model.Pagination;
import com.fumbler.royalerumble.model.Query;
import com.fumbler.royalerumble.service.ForumService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "type", defaultValue = "free") String type,
            @RequestParam(value = "select", defaultValue = "0") int select,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            Model model) throws Exception {
        //TODO Pagination 에 type,select,keyword 정보 추가하기...
        Query query = new Query(type, select, keyword);
        Pagination pagination = service.makePagination(page, query);
        List<Forum> list = service.findList(pagination);
        model.addAttribute("pagination", pagination);
        model.addAttribute("list", list);
        model.addAttribute("forum", "active");
        return "forums/list";
    }

    @RequestMapping(value = "/forum/{id}", method = RequestMethod.GET)
    public String getView(@PathVariable("id") long id, Model model) throws Exception {
        //TODO 추천 기능 넣기
        Forum forum = service.findOne(id);
        model.addAttribute("forum", forum);
        return "forums/forum";
    }

    @RequestMapping(value = "/writing", method = RequestMethod.GET)
    public String write(@RequestParam(value = "type", defaultValue = "free") String type,
                          Forum forum, Model model){
        model.addAttribute("type", type);
        return "forums/writing";
    }

    @RequestMapping(value = "/writing", method = RequestMethod.POST)
    public String writeSubmit(@Valid Forum forum, BindingResult result) throws Exception {
        if(result.hasErrors()){
            return "forums/writing";
        }
        if(!service.insertForum(forum)){
            return "forums/writing";
        }
        return "redirect:/forums/list?type=" + forum.getType();
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.GET)
    public String edit(@PathVariable long id,
                            Forum forum, HttpSession session, Model model) throws Exception {
        Member member = (Member) session.getAttribute("USER");
        Forum editForum = service.findOne(id);
        if(!editForum.userNameMatching(member.getUserName())){
            return "redirect:/";
        }
        model.addAttribute("forum", editForum);
        return "forums/update";
    }

    @RequestMapping(value = "update/{id}", method = RequestMethod.POST)
    public String editSubmit(@PathVariable long id,
                                  @Valid Forum forum, BindingResult result) throws Exception{
        if(result.hasErrors()) {
            return "forums/update";
        }
        if(!service.updateForum(forum)){
            return "forums/update";
        }
        return "redirect:/forums/forum/" + id;
    }

    @RequestMapping(value = "delete/{id}", method = RequestMethod.GET)
    public String deleteSubmit(@PathVariable long id, HttpSession session) throws Exception{
        Member member = (Member) session.getAttribute("USER");
        Forum forum = service.findOne(id);
        if(!forum.userNameMatching(member.getUserName())) {
            return "redirect:/";
        }
        if(!service.deleteForum(id)) {
            return "forums/forum";
        }
        return "redirect:/forums/list?type=" + forum.getType();
    }
}
