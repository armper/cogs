package com.aperea.repository;
import com.aperea.domain.SameCode;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SameCode entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SameCodeRepository extends JpaRepository<SameCode, Long> {

}
