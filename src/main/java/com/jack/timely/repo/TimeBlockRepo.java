package com.jack.timely.repo;

import com.jack.timely.model.TimeBlock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeBlockRepo extends JpaRepository<TimeBlock, Long> {

    void deleteTimeBlockById(Long id);
    TimeBlock findTimeBlockById(Long id);
}
