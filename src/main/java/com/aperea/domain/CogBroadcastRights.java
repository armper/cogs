package com.aperea.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A CogBroadcastRights.
 */
@Entity
@Table(name = "cog_broadcast_rights")
public class CogBroadcastRights implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "cog_id")
    private String cogId;

    @OneToMany(mappedBy = "cogBroadcastRights")
    private Set<SameCode> sameCodes = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "cog_broadcast_rights_same_code",
               joinColumns = @JoinColumn(name = "cog_broadcast_rights_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "same_code_id", referencedColumnName = "id"))
    private Set<SameCode> sameCodes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCogId() {
        return cogId;
    }

    public CogBroadcastRights cogId(String cogId) {
        this.cogId = cogId;
        return this;
    }

    public void setCogId(String cogId) {
        this.cogId = cogId;
    }

    public Set<SameCode> getSameCodes() {
        return sameCodes;
    }

    public CogBroadcastRights sameCodes(Set<SameCode> sameCodes) {
        this.sameCodes = sameCodes;
        return this;
    }

    public CogBroadcastRights addSameCode(SameCode sameCode) {
        this.sameCodes.add(sameCode);
        sameCode.setCogBroadcastRights(this);
        return this;
    }

    public CogBroadcastRights removeSameCode(SameCode sameCode) {
        this.sameCodes.remove(sameCode);
        sameCode.setCogBroadcastRights(null);
        return this;
    }

    public void setSameCodes(Set<SameCode> sameCodes) {
        this.sameCodes = sameCodes;
    }

    public Set<SameCode> getSameCodes() {
        return sameCodes;
    }

    public CogBroadcastRights sameCodes(Set<SameCode> sameCodes) {
        this.sameCodes = sameCodes;
        return this;
    }

    public CogBroadcastRights addSameCode(SameCode sameCode) {
        this.sameCodes.add(sameCode);
        sameCode.getCogBroadcastRights().add(this);
        return this;
    }

    public CogBroadcastRights removeSameCode(SameCode sameCode) {
        this.sameCodes.remove(sameCode);
        sameCode.getCogBroadcastRights().remove(this);
        return this;
    }

    public void setSameCodes(Set<SameCode> sameCodes) {
        this.sameCodes = sameCodes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CogBroadcastRights)) {
            return false;
        }
        return id != null && id.equals(((CogBroadcastRights) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CogBroadcastRights{" +
            "id=" + getId() +
            ", cogId='" + getCogId() + "'" +
            "}";
    }
}
