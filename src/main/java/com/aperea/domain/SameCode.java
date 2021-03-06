package com.aperea.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A SameCode.
 */
@Entity
@Table(name = "same_code")
public class SameCode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "same_code")
    private String sameCode;

    @ManyToOne
    @JsonIgnoreProperties("sameCodes")
    private CogBroadcastRights cogBroadcastRights;

    @ManyToMany(mappedBy = "sameCodes")
    @JsonIgnore
    private Set<CogBroadcastRights> cogBroadcastRights = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSameCode() {
        return sameCode;
    }

    public SameCode sameCode(String sameCode) {
        this.sameCode = sameCode;
        return this;
    }

    public void setSameCode(String sameCode) {
        this.sameCode = sameCode;
    }

    public CogBroadcastRights getCogBroadcastRights() {
        return cogBroadcastRights;
    }

    public SameCode cogBroadcastRights(CogBroadcastRights cogBroadcastRights) {
        this.cogBroadcastRights = cogBroadcastRights;
        return this;
    }

    public void setCogBroadcastRights(CogBroadcastRights cogBroadcastRights) {
        this.cogBroadcastRights = cogBroadcastRights;
    }

    public Set<CogBroadcastRights> getCogBroadcastRights() {
        return cogBroadcastRights;
    }

    public SameCode cogBroadcastRights(Set<CogBroadcastRights> cogBroadcastRights) {
        this.cogBroadcastRights = cogBroadcastRights;
        return this;
    }

    public SameCode addCogBroadcastRights(CogBroadcastRights cogBroadcastRights) {
        this.cogBroadcastRights.add(cogBroadcastRights);
        cogBroadcastRights.getSameCodes().add(this);
        return this;
    }

    public SameCode removeCogBroadcastRights(CogBroadcastRights cogBroadcastRights) {
        this.cogBroadcastRights.remove(cogBroadcastRights);
        cogBroadcastRights.getSameCodes().remove(this);
        return this;
    }

    public void setCogBroadcastRights(Set<CogBroadcastRights> cogBroadcastRights) {
        this.cogBroadcastRights = cogBroadcastRights;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SameCode)) {
            return false;
        }
        return id != null && id.equals(((SameCode) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SameCode{" +
            "id=" + getId() +
            ", sameCode='" + getSameCode() + "'" +
            "}";
    }
}
