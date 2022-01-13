package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.DetailReception;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DetailReception entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetailReceptionRepository extends JpaRepository<DetailReception, Long> {}
