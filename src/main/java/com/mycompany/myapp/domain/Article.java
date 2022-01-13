package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "libelle_article")
    private String libelleArticle;

    @Column(name = "stock")
    private String stock;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "update_at")
    private LocalDate updateAt;

    @JsonIgnoreProperties(value = { "article", "employee" }, allowSetters = true)
    @OneToOne(mappedBy = "article")
    private Affectation affectation;

    @ManyToOne
    @JsonIgnoreProperties(value = { "articles" }, allowSetters = true)
    private Categorie categorie;

    @ManyToMany(mappedBy = "articles")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "detailReceptions", "articles", "employee", "fournisseur" }, allowSetters = true)
    private Set<Reception> receptions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Article id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleArticle() {
        return this.libelleArticle;
    }

    public Article libelleArticle(String libelleArticle) {
        this.setLibelleArticle(libelleArticle);
        return this;
    }

    public void setLibelleArticle(String libelleArticle) {
        this.libelleArticle = libelleArticle;
    }

    public String getStock() {
        return this.stock;
    }

    public Article stock(String stock) {
        this.setStock(stock);
        return this;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }

    public LocalDate getCreatedAt() {
        return this.createdAt;
    }

    public Article createdAt(LocalDate createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdateAt() {
        return this.updateAt;
    }

    public Article updateAt(LocalDate updateAt) {
        this.setUpdateAt(updateAt);
        return this;
    }

    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }

    public Affectation getAffectation() {
        return this.affectation;
    }

    public void setAffectation(Affectation affectation) {
        if (this.affectation != null) {
            this.affectation.setArticle(null);
        }
        if (affectation != null) {
            affectation.setArticle(this);
        }
        this.affectation = affectation;
    }

    public Article affectation(Affectation affectation) {
        this.setAffectation(affectation);
        return this;
    }

    public Categorie getCategorie() {
        return this.categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Article categorie(Categorie categorie) {
        this.setCategorie(categorie);
        return this;
    }

    public Set<Reception> getReceptions() {
        return this.receptions;
    }

    public void setReceptions(Set<Reception> receptions) {
        if (this.receptions != null) {
            this.receptions.forEach(i -> i.removeArticle(this));
        }
        if (receptions != null) {
            receptions.forEach(i -> i.addArticle(this));
        }
        this.receptions = receptions;
    }

    public Article receptions(Set<Reception> receptions) {
        this.setReceptions(receptions);
        return this;
    }

    public Article addReception(Reception reception) {
        this.receptions.add(reception);
        reception.getArticles().add(this);
        return this;
    }

    public Article removeReception(Reception reception) {
        this.receptions.remove(reception);
        reception.getArticles().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", libelleArticle='" + getLibelleArticle() + "'" +
            ", stock='" + getStock() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updateAt='" + getUpdateAt() + "'" +
            "}";
    }
}
