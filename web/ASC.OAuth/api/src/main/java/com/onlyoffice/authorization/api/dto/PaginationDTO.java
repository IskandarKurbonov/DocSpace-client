package com.onlyoffice.authorization.api.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.hateoas.RepresentationModel;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class PaginationDTO<E> extends RepresentationModel<PaginationDTO<E>> implements Serializable {
    int page;
    int limit;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    Integer previous;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    Integer next;
    Iterable<E> data;
}
