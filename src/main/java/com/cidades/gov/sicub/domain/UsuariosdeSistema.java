package com.cidades.gov.sicub.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.cidades.gov.sicub.domain.enumeration.Sgdb;

import com.cidades.gov.sicub.domain.enumeration.Area;

/**
 * A UsuariosdeSistema.
 */
@Entity
@Table(name = "usuariosde_sistema")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "usuariosdesistema")
public class UsuariosdeSistema implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "senha", nullable = false)
    private String senha;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sgdb", nullable = false)
    private Sgdb sgdb;

    @NotNull
    @Column(name = "base", nullable = false)
    private String base;

    @Column(name = "esquema")
    private String esquema;

    @NotNull
    @Column(name = "descricao_base", nullable = false)
    private String descricaoBase;

    @NotNull
    @Column(name = "solicitante", nullable = false)
    private String solicitante;

    @NotNull
    @Column(name = "ramal", nullable = false)
    private Integer ramal;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Enumerated(EnumType.STRING)
    @Column(name = "area")
    private Area area;

    @NotNull
    @Column(name = "data_criacao", nullable = false)
    private LocalDate dataCriacao;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "usuariosde_sistema_servidores",
               joinColumns = @JoinColumn(name="usuariosde_sistemas_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="servidores_id", referencedColumnName="id"))
    private Set<Servidores> servidores = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public UsuariosdeSistema nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public UsuariosdeSistema senha(String senha) {
        this.senha = senha;
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Sgdb getSgdb() {
        return sgdb;
    }

    public UsuariosdeSistema sgdb(Sgdb sgdb) {
        this.sgdb = sgdb;
        return this;
    }

    public void setSgdb(Sgdb sgdb) {
        this.sgdb = sgdb;
    }

    public String getBase() {
        return base;
    }

    public UsuariosdeSistema base(String base) {
        this.base = base;
        return this;
    }

    public void setBase(String base) {
        this.base = base;
    }

    public String getEsquema() {
        return esquema;
    }

    public UsuariosdeSistema esquema(String esquema) {
        this.esquema = esquema;
        return this;
    }

    public void setEsquema(String esquema) {
        this.esquema = esquema;
    }

    public String getDescricaoBase() {
        return descricaoBase;
    }

    public UsuariosdeSistema descricaoBase(String descricaoBase) {
        this.descricaoBase = descricaoBase;
        return this;
    }

    public void setDescricaoBase(String descricaoBase) {
        this.descricaoBase = descricaoBase;
    }

    public String getSolicitante() {
        return solicitante;
    }

    public UsuariosdeSistema solicitante(String solicitante) {
        this.solicitante = solicitante;
        return this;
    }

    public void setSolicitante(String solicitante) {
        this.solicitante = solicitante;
    }

    public Integer getRamal() {
        return ramal;
    }

    public UsuariosdeSistema ramal(Integer ramal) {
        this.ramal = ramal;
        return this;
    }

    public void setRamal(Integer ramal) {
        this.ramal = ramal;
    }

    public String getEmail() {
        return email;
    }

    public UsuariosdeSistema email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Area getArea() {
        return area;
    }

    public UsuariosdeSistema area(Area area) {
        this.area = area;
        return this;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public LocalDate getDataCriacao() {
        return dataCriacao;
    }

    public UsuariosdeSistema dataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
        return this;
    }

    public void setDataCriacao(LocalDate dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Set<Servidores> getServidores() {
        return servidores;
    }

    public UsuariosdeSistema servidores(Set<Servidores> servidores) {
        this.servidores = servidores;
        return this;
    }

    public UsuariosdeSistema addServidores(Servidores servidores) {
        this.servidores.add(servidores);
        servidores.getNomes().add(this);
        return this;
    }

    public UsuariosdeSistema removeServidores(Servidores servidores) {
        this.servidores.remove(servidores);
        servidores.getNomes().remove(this);
        return this;
    }

    public void setServidores(Set<Servidores> servidores) {
        this.servidores = servidores;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        UsuariosdeSistema usuariosdeSistema = (UsuariosdeSistema) o;
        if (usuariosdeSistema.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), usuariosdeSistema.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "UsuariosdeSistema{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", senha='" + getSenha() + "'" +
            ", sgdb='" + getSgdb() + "'" +
            ", base='" + getBase() + "'" +
            ", esquema='" + getEsquema() + "'" +
            ", descricaoBase='" + getDescricaoBase() + "'" +
            ", solicitante='" + getSolicitante() + "'" +
            ", ramal=" + getRamal() +
            ", email='" + getEmail() + "'" +
            ", area='" + getArea() + "'" +
            ", dataCriacao='" + getDataCriacao() + "'" +
            "}";
    }
}
