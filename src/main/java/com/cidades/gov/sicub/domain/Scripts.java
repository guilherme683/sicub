package com.cidades.gov.sicub.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.cidades.gov.sicub.domain.enumeration.Sgdb;

/**
 * A Scripts.
 */
@Entity
@Table(name = "scripts")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "scripts")
public class Scripts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(min = 10, max = 100)
    @Column(name = "acao", length = 100, nullable = false)
    private String acao;

    @NotNull
    @Size(min = 10, max = 255)
    @Column(name = "comando", length = 255, nullable = false)
    private String comando;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "sgdb", nullable = false)
    private Sgdb sgdb;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAcao() {
        return acao;
    }

    public Scripts acao(String acao) {
        this.acao = acao;
        return this;
    }

    public void setAcao(String acao) {
        this.acao = acao;
    }

    public String getComando() {
        return comando;
    }

    public Scripts comando(String comando) {
        this.comando = comando;
        return this;
    }

    public void setComando(String comando) {
        this.comando = comando;
    }

    public Sgdb getSgdb() {
        return sgdb;
    }

    public Scripts sgdb(Sgdb sgdb) {
        this.sgdb = sgdb;
        return this;
    }

    public void setSgdb(Sgdb sgdb) {
        this.sgdb = sgdb;
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
        Scripts scripts = (Scripts) o;
        if (scripts.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), scripts.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Scripts{" +
            "id=" + getId() +
            ", acao='" + getAcao() + "'" +
            ", comando='" + getComando() + "'" +
            ", sgdb='" + getSgdb() + "'" +
            "}";
    }
}
