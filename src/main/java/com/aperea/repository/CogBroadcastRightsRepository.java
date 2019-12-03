package com.aperea.repository;
import com.aperea.domain.CogBroadcastRights;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CogBroadcastRights entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CogBroadcastRightsRepository extends JpaRepository<CogBroadcastRights, Long> {

}
