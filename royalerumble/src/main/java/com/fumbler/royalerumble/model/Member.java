package com.fumbler.royalerumble.model;

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

    private Date regDate;

    private Date updateDate;

}
