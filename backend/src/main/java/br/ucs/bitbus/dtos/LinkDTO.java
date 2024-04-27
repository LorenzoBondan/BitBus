package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Link;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LinkDTO {

    private Long id;
    private String url;
    private Long itemId;

    public LinkDTO(Link entity) {
        this.id = entity.getId();
        this.url = entity.getUrl();
        this.itemId = entity.getItem().getId();
    }
}
