package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DetailReceptionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetailReception.class);
        DetailReception detailReception1 = new DetailReception();
        detailReception1.setId(1L);
        DetailReception detailReception2 = new DetailReception();
        detailReception2.setId(detailReception1.getId());
        assertThat(detailReception1).isEqualTo(detailReception2);
        detailReception2.setId(2L);
        assertThat(detailReception1).isNotEqualTo(detailReception2);
        detailReception1.setId(null);
        assertThat(detailReception1).isNotEqualTo(detailReception2);
    }
}
