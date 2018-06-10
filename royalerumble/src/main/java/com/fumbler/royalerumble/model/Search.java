package com.fumbler.royalerumble.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.Min;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Search {

    @NotBlank
    private String searchType;

    private int searchSelect;

    @NotBlank
    @Length(min = 2, max = 10)
    private String searchKeyword;
}
