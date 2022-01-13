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
 * A Reception.
 */
@Entity
@Table(name = "reception")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Reception implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "num_contrat")
    private String numContrat;

    @Column(name = "caracteristique")
    private String caracteristique;

    @Column(name = "quantite_article")
    private Long quantiteArticle;

    @Column(name = "numero_serie")
    private String numeroSerie;

    @Column(name = "status")
    private Integer status;

    @Column(name = "date_contrat")
    private LocalDate dateContrat;

    @Column(name = "date_reception")
    private LocalDate dateReception;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "update_at")
    private LocalDate updateAt;

    @OneToMany(mappedBy = "reception")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "reception" }, allowSetters = true)
    private Set<DetailReception> detailReceptions = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_reception__article",
        joinColumns = @JoinColumn(name = "reception_id"),
        inverseJoinColumns = @JoinColumn(name = "article_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "affectation", "categorie", "receptions" }, allowSetters = true)
    private Set<Article> articles = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "affectations", "receptions", "division" }, allowSetters = true)
    private Employee employee;

    @ManyToOne
    @JsonIgnoreProperties(value = { "receptions" }, allowSetters = true)
    private Fournisseur fournisseur;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Reception id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumContrat() {
        return this.numContrat;
    }

    public Reception numContrat(String numContrat) {
        this.setNumContrat(numContrat);
        return this;
    }

    public void setNumContrat(String numContrat) {
        this.numContrat = numContrat;
    }

    public String getCaracteristique() {
        return this.caracteristique;
    }

    public Reception caracteristique(String caracteristique) {
        this.setCaracteristique(caracteristique);
        return this;
    }

    public void setCaracteristique(String caracteristique) {
        this.caracteristique = caracteristique;
    }

    public Long getQuantiteArticle() {
        return this.quantiteArticle;
    }

    public Reception quantiteArticle(Long quantiteArticle) {
        this.setQuantiteArticle(quantiteArticle);
        return this;
    }

    public void setQuantiteArticle(Long quantiteArticle) {
        this.quantiteArticle = quantiteArticle;
    }

    public String getNumeroSerie() {
        return this.numeroSerie;
    }

    public Reception numeroSerie(String numeroSerie) {
        this.setNumeroSerie(numeroSerie);
        return this;
    }

    public void setNumeroSerie(String numeroSerie) {
        this.numeroSerie = numeroSerie;
    }

    public Integer getStatus() {
        return this.status;
    }

    public Reception status(Integer status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public LocalDate getDateContrat() {
        return this.dateContrat;
    }

    public Reception dateContrat(LocalDate dateContrat) {
        this.setDateContrat(dateContrat);
        return this;
    }

    public void setDateContrat(LocalDate dateContrat) {
        this.dateContrat = dateContrat;
    }

    public LocalDate getDateReception() {
        return this.dateReception;
    }

    public Reception dateReception(LocalDate dateReception) {
        this.setDateReception(dateReception);
        return this;
    }

    public void setDateReception(LocalDate dateReception) {
        this.dateReception = dateReception;
    }

    public LocalDate getCreatedAt() {
        return this.createdAt;
    }

    public Reception createdAt(LocalDate createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdateAt() {
        return this.updateAt;
    }

    public Reception updateAt(LocalDate updateAt) {
        this.setUpdateAt(updateAt);
        return this;
    }

    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }

    public Set<DetailReception> getDetailReceptions() {
        return this.detailReceptions;
    }

    public void setDetailReceptions(Set<DetailReception> detailReceptions) {
        if (this.detailReceptions != null) {
            this.detailReceptions.forEach(i -> i.setReception(null));
        }
        if (detailReceptions != null) {
            detailReceptions.forEach(i -> i.setReception(this));
        }
        this.detailReceptions = detailReceptions;
    }

    public Reception detailReceptions(Set<DetailReception> detailReceptions) {
        this.setDetailReceptions(detailReceptions);
        return this;
    }

    public Reception addDetailReception(DetailReception detailReception) {
        this.detailReceptions.add(detailReception);
        detailReception.setReception(this);
        return this;
    }

    public Reception removeDetailReception(DetailReception detailReception) {
        this.detailReceptions.remove(detailReception);
        detailReception.setReception(null);
        return this;
    }

    public Set<Article> getArticles() {
        return this.articles;
    }

    public void setArticles(Set<Article> articles) {
        this.articles = articles;
    }

    public Reception articles(Set<Article> articles) {
        this.setArticles(articles);
        return this;
    }

    public Reception addArticle(Article article) {
        this.articles.add(article);
        article.getReceptions().add(this);
        return this;
    }

    public Reception removeArticle(Article article) {
        this.articles.remove(article);
        article.getReceptions().remove(this);
        return this;
    }

    public Employee getEmployee() {
        return this.employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Reception employee(Employee employee) {
        this.setEmployee(employee);
        return this;
    }

    public Fournisseur getFournisseur() {
        return this.fournisseur;
    }

    public void setFournisseur(Fournisseur fournisseur) {
        this.fournisseur = fournisseur;
    }

    public Reception fournisseur(Fournisseur fournisseur) {
        this.setFournisseur(fournisseur);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Reception)) {
            return false;
        }
        return id != null && id.equals(((Reception) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Reception{" +
            "id=" + getId() +
            ", numContrat='" + getNumContrat() + "'" +
            ", caracteristique='" + getCaracteristique() + "'" +
            ", quantiteArticle=" + getQuantiteArticle() +
            ", numeroSerie='" + getNumeroSerie() + "'" +
            ", status=" + getStatus() +
            ", dateContrat='" + getDateContrat() + "'" +
            ", dateReception='" + getDateReception() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updateAt='" + getUpdateAt() + "'" +
            "}";
    }
}
