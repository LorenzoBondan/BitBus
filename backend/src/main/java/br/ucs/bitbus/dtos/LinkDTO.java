package br.ucs.bitbus.dtos;

import br.ucs.bitbus.entities.Link;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LinkDTO {

    private Long id;
    @NotNull(message = "A url não pode ser nula")
    @Size(min = 8, message = "A url deve conter pelo menos 8 caracteres")
    private String url;
    @NotNull(message = "O item não pode ser nulo")
    private Long itemId;

    public LinkDTO(Link entity) {
        this.id = entity.getId();
        this.url = entity.getUrl();
        this.itemId = entity.getItem().getId();
    }
}
