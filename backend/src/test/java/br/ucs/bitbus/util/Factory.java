package br.ucs.bitbus.util;

import br.ucs.bitbus.dtos.*;
import br.ucs.bitbus.entities.*;
import br.ucs.bitbus.entities.enums.CLASSIFICACAO;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Factory {

    public static TipoItem createTipoItem() {
        TipoItem tipoItem = new TipoItem();
        tipoItem.setId(1L);
        tipoItem.setDescricao("Tipo de Item");
        return tipoItem;
    }
    
    public static TipoItemDTO createTipoItemDTO() {
        return new TipoItemDTO(createTipoItem());
    }

    public static DiscoRemovivel createDiscoRemovivel(){
        DiscoRemovivel discoRemovivel = new DiscoRemovivel();
        discoRemovivel.setId(1L);
        discoRemovivel.setNome("Nome 1");
        discoRemovivel.setAno(2020);
        discoRemovivel.setQuantidade(1);
        discoRemovivel.setAltura(10.0);
        discoRemovivel.setLargura(10.0);
        discoRemovivel.setEspessura(10.0);
        discoRemovivel.setInformacoes("Informacoes 1");
        discoRemovivel.setImgUrl("https://img.com");
        discoRemovivel.setTipoItem(createTipoItem());
        return discoRemovivel;
    }

    public static DiscoRemovivelDTO createDiscoRemovivelDTO(){
        return new DiscoRemovivelDTO(createDiscoRemovivel());
    }

    public static Memoria createMemoria(){
        Memoria memoria = new Memoria();
        memoria.setId(1L);
        memoria.setNome("Nome 1");
        memoria.setAno(2020);
        memoria.setQuantidade(1);
        memoria.setAltura(10.0);
        memoria.setLargura(10.0);
        memoria.setEspessura(10.0);
        memoria.setInformacoes("Informacoes 1");
        return memoria;
    }

    public static MemoriaDTO createMemoriaDTO(){
        return new MemoriaDTO(createMemoria());
    }

    public static Periferico createPeriferico(){
        Periferico periferico = new Periferico();
        periferico.setId(1L);
        periferico.setNome("Nome 1");
        periferico.setAno(2020);
        periferico.setQuantidade(1);
        periferico.setAltura(10.0);
        periferico.setLargura(10.0);
        periferico.setEspessura(10.0);
        periferico.setInformacoes("Informacoes 1");
        periferico.setImgUrl("https://img.com");
        periferico.setTipoItem(createTipoItem());
        return periferico;
    }

    public static PerifericoDTO createPerifericoDTO(){
        return new PerifericoDTO(createPeriferico());
    }

    public static Item createItem(){
        Item item = new Item();
        item.setId(1L);
        item.setNome("Nome 1");
        item.setAno(2020);
        item.setQuantidade(1);
        item.setAltura(10.0);
        item.setLargura(10.0);
        item.setEspessura(10.0);
        item.setInformacoes("Informacoes 1");
        return item;
    }

    public static ItemDTO createItemDTO(){
        return new ItemDTO(createItem());
    }

    public static Placa createPlaca(){
        Placa placa = new Placa();
        placa.setId(1L);
        placa.setNome("Nome 1");
        placa.setAno(2020);
        placa.setQuantidade(1);
        placa.setAltura(10.0);
        placa.setLargura(10.0);
        placa.setEspessura(10.0);
        placa.setInformacoes("Informacoes 1");
        placa.setClassificacao(CLASSIFICACAO.ATX);
        return placa;
    }

    public static PlacaDTO createPlacaDTO(){
        return new PlacaDTO(createPlaca());
    }

    public static Processador createProcessador(){
        Processador processador = new Processador();
        processador.setId(1L);
        processador.setNome("Nome 1");
        processador.setAno(2020);
        processador.setQuantidade(1);
        processador.setAltura(10.0);
        processador.setLargura(10.0);
        processador.setEspessura(10.0);
        processador.setInformacoes("Informacoes 1");
        return processador;
    }

    public static ProcessadorDTO createProcessadorDTO(){
        return new ProcessadorDTO(createProcessador());
    }

    public static Software createSoftware(){
        Software software = new Software();
        software.setId(1L);
        software.setNome("Nome 1");
        software.setAno(2020);
        software.setQuantidade(1);
        software.setAltura(10.0);
        software.setLargura(10.0);
        software.setEspessura(10.0);
        software.setInformacoes("Informacoes 1");
        return software;
    }

    public static SoftwareDTO createSoftwareDTO(){
        return new SoftwareDTO(createSoftware());
    }

    public static Link createLink(){
        Link link = new Link();
        link.setId(1L);
        link.setUrl("https://img.com");
        link.setItem(createItem());
        return link;
    }

    public static LinkDTO createLinkDTO(){
        return new LinkDTO(createLink());
    }

    public static Papel createPapel(){
        Papel papel = new Papel();
        papel.setId(1L);
        papel.setDescricao("Papel 1");
        return papel;
    }

    public static PapelDTO createPapelDTO(){
        return new PapelDTO(createPapel());
    }

    public static Pessoa createPessoa(){
        Pessoa pessoa = new Pessoa();
        pessoa.setId(1L);
        pessoa.setNome("Nome 1");
        pessoa.setEmail("email@email.com");
        pessoa.setCurriculo("Curriculo 1");

        Set<Papel> papeis = new HashSet<>();
        papeis.add(createPapel());

        pessoa.setPapeis(papeis);
        return pessoa;
    }

    public static PessoaDTO createPessoaDTO(){
        return new PessoaDTO(createPessoa());
    }

    public static Oficina createOficina(){
        Oficina oficina = new Oficina();
        oficina.setId(1L);
        oficina.setTitulo("Oficina 1");
        oficina.setDuracao(120);
        oficina.setResumo("Resumo 1");
        oficina.setHorario(LocalDateTime.of(2090,1,1,1,1));
        oficina.setLocal("Local 1");
        oficina.setPalestrante(createPessoa());
        return oficina;
    }

    public static OficinaDTO createOficinaDTO(){
        return new OficinaDTO(createOficina());
    }

    public static Doacao createDoacao(){
        Doacao doacao = new Doacao();
        doacao.setId(1L);
        doacao.setDescricao("Doacao 1");
        doacao.setValor(10.0);
        doacao.setDoador(createPessoa());

        List<Item> itens = new ArrayList<>();
        itens.add(createMemoria());
        doacao.setItens(itens);

        return doacao;
    }

    public static DoacaoDTO createDoacaoDTO(){
        return new DoacaoDTO(createDoacao());
    }

    public static Visita createVisita(){
        Visita visita = new Visita();
        visita.setId(1L);
        visita.setLocal("Local 1");
        visita.setDataInicio(LocalDateTime.of(2090,1,1,1,1));
        visita.setDataFim(LocalDateTime.of(2090,1,2,1,1));
        visita.setResponsavel(createPessoa());
        return visita;
    }

    public static VisitaDTO createVisitaDTO(){
        return new VisitaDTO(createVisita());
    }

    public static Feedback createFeedback(){
        Feedback feedback = new Feedback();
        feedback.setId(1L);
        feedback.setComentario("Comentario 1");
        feedback.setImgUrl("https://img.com");
        feedback.setAutor(createPessoa());
        feedback.setVisita(createVisita());
        return feedback;
    }

    public static FeedbackDTO createFeedbackDTO(){
        return new FeedbackDTO(createFeedback());
    }
}
