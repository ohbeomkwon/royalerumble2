package com.fumbler.royalerumble.model;

import com.fumbler.royalerumble.dao.MemberDao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    private long id;

    private String email;

    private String userName;

    private String password;

    private String newPassword;

    private Date regDate;

    private Date updateDate;

    public boolean passwordMatching(String password){
        return this.password.equals(password);
    }
}
