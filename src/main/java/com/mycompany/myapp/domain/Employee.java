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
 * A Employee.
 */
@Entity
@Table(name = "employee")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "update_at")
    private LocalDate updateAt;

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "article", "employee" }, allowSetters = true)
    private Set<Affectation> affectations = new HashSet<>();

    @OneToMany(mappedBy = "employee")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "detailReceptions", "articles", "employee", "fournisseur" }, allowSetters = true)
    private Set<Reception> receptions = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "employees" }, allowSetters = true)
    private Division division;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Employee id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Employee nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return this.prenom;
    }

    public Employee prenom(String prenom) {
        this.setPrenom(prenom);
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public LocalDate getCreatedAt() {
        return this.createdAt;
    }

    public Employee createdAt(LocalDate createdAt) {
        this.setCreatedAt(createdAt);
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdateAt() {
        return this.updateAt;
    }

    public Employee updateAt(LocalDate updateAt) {
        this.setUpdateAt(updateAt);
        return this;
    }

    public void setUpdateAt(LocalDate updateAt) {
        this.updateAt = updateAt;
    }

    public Set<Affectation> getAffectations() {
        return this.affectations;
    }

    public void setAffectations(Set<Affectation> affectations) {
        if (this.affectations != null) {
            this.affectations.forEach(i -> i.setEmployee(null));
        }
        if (affectations != null) {
            affectations.forEach(i -> i.setEmployee(this));
        }
        this.affectations = affectations;
    }

    public Employee affectations(Set<Affectation> affectations) {
        this.setAffectations(affectations);
        return this;
    }

    public Employee addAffectation(Affectation affectation) {
        this.affectations.add(affectation);
        affectation.setEmployee(this);
        return this;
    }

    public Employee removeAffectation(Affectation affectation) {
        this.affectations.remove(affectation);
        affectation.setEmployee(null);
        return this;
    }

    public Set<Reception> getReceptions() {
        return this.receptions;
    }

    public void setReceptions(Set<Reception> receptions) {
        if (this.receptions != null) {
            this.receptions.forEach(i -> i.setEmployee(null));
        }
        if (receptions != null) {
            receptions.forEach(i -> i.setEmployee(this));
        }
        this.receptions = receptions;
    }

    public Employee receptions(Set<Reception> receptions) {
        this.setReceptions(receptions);
        return this;
    }

    public Employee addReception(Reception reception) {
        this.receptions.add(reception);
        reception.setEmployee(this);
        return this;
    }

    public Employee removeReception(Reception reception) {
        this.receptions.remove(reception);
        reception.setEmployee(null);
        return this;
    }

    public Division getDivision() {
        return this.division;
    }

    public void setDivision(Division division) {
        this.division = division;
    }

    public Employee division(Division division) {
        this.setDivision(division);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Employee)) {
            return false;
        }
        return id != null && id.equals(((Employee) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Employee{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updateAt='" + getUpdateAt() + "'" +
            "}";
    }
}
