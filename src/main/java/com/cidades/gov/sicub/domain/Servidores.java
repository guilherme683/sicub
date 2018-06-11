package com.cidades.gov.sicub.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.cidades.gov.sicub.domain.enumeration.Sgdb;

import com.cidades.gov.sicub.domain.enumeration.Tipo;

/**
 * A Servidores.
 */
@Entity
@Table(name = "servidores")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "servidores")
public class Servidores implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sgdb", nullable = false)
    private Sgdb sgdb;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private Tipo tipo;

    @ManyToMany(mappedBy = "servidores")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<UsuariosdeSistema> nomes = new HashSet<>();

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

    public Servidores nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Sgdb getSgdb() {
        return sgdb;
    }

    public Servidores sgdb(Sgdb sgdb) {
        this.sgdb = sgdb;
        return this;
    }

    public void setSgdb(Sgdb sgdb) {
        this.sgdb = sgdb;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public Servidores tipo(Tipo tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public Set<UsuariosdeSistema> getNomes() {
        return nomes;
    }

    public Servidores nomes(Set<UsuariosdeSistema> usuariosdeSistemas) {
        this.nomes = usuariosdeSistemas;
        return this;
    }

    public Servidores addNome(UsuariosdeSistema usuariosdeSistema) {
        this.nomes.add(usuariosdeSistema);
        usuariosdeSistema.getServidores().add(this);
        return this;
    }

    public Servidores removeNome(UsuariosdeSistema usuariosdeSistema) {
        this.nomes.remove(usuariosdeSistema);
        usuariosdeSistema.getServidores().remove(this);
        return this;
    }

    public void setNomes(Set<UsuariosdeSistema> usuariosdeSistemas) {
        this.nomes = usuariosdeSistemas;
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
        Servidores servidores = (Servidores) o;
        if (servidores.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), servidores.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Servidores{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sgdb='" + getSgdb() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
