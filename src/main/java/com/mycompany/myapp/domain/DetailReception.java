package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DetailReception.
 */
@Entity
@Table(name = "detail_reception")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class DetailReception implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "caracteristique")
    private String caracteristique;

    @Column(name = "quantite_article")
    private Long quantiteArticle;

    @Column(name = "numero_serie")
    private String numeroSerie;

    @Column(name = "status")
    private Integer status;

    @ManyToOne
    @JsonIgnoreProperties(value = { "detailReceptions", "articles", "employee", "fournisseur" }, allowSetters = true)
    private Reception reception;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DetailReception id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCaracteristique() {
        return this.caracteristique;
    }

    public DetailReception caracteristique(String caracteristique) {
        this.setCaracteristique(caracteristique);
        return this;
    }

    public void setCaracteristique(String caracteristique) {
        this.caracteristique = caracteristique;
    }

    public Long getQuantiteArticle() {
        return this.quantiteArticle;
    }

    public DetailReception quantiteArticle(Long quantiteArticle) {
        this.setQuantiteArticle(quantiteArticle);
        return this;
    }

    public void setQuantiteArticle(Long quantiteArticle) {
        this.quantiteArticle = quantiteArticle;
    }

    public String getNumeroSerie() {
        return this.numeroSerie;
    }

    public DetailReception numeroSerie(String numeroSerie) {
        this.setNumeroSerie(numeroSerie);
        return this;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    public Integer getStatus() {
        return this.status;
    }

    public DetailReception status(Integer status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Reception getReception() {
        return this.reception;
    }

    public void setReception(Reception reception) {
        this.reception = reception;
    }

    public DetailReception reception(Reception reception) {
        this.setReception(reception);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetailReception)) {
            return false;
        }
        return id != null && id.equals(((DetailReception) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DetailReception{" +
            "id=" + getId() +
            ", caracteristique='" + getCaracteristique() + "'" +
            ", quantiteArticle=" + getQuantiteArticle() +
            ", numeroSerie='" + getNumeroSerie() + "'" +
            ", status=" + getStatus() +
            "}";
    }
}
