package com.jack.timely.service;

import com.jack.timely.model.TimeBlock;
import com.jack.timely.repo.TimeBlockRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

@Service
public class TimeBlockService {
    private final TimeBlockRepo timeBlockRepo;

    @Autowired
    public TimeBlockService(TimeBlockRepo timeBlockRepo){
        this.timeBlockRepo = timeBlockRepo;
    }

    public TimeBlock startTimeBlock(TimeBlock timeBlock) {
        Date now = (Date) Calendar.getInstance().getTime();
        timeBlock.setStartTime(new Timestamp(now.getTime()));
        return timeBlockRepo.save(timeBlock);
    }

    public TimeBlock endTimeBlock(TimeBlock timeBlock){
        Date now = (Date) Calendar.getInstance().getTime();
        timeBlock.setEndTime(new Timestamp(now.getTime()));
        return timeBlockRepo.save(timeBlock);
    }

    public List<TimeBlock> findAllBlocks() {
        return timeBlockRepo.findAll();
    }

    // TODO: TimeBlock object can be passed? Angular dependant?
    public void delete(Long id){
        timeBlockRepo.deleteTimeBlockById(id); // time block not found exception
    }

    public TimeBlock findById_(Long id){
        return timeBlockRepo.findTimeBlockById(id); // time block not found exception
    }

    public void deleteAllTimeBlock(){
        List<TimeBlock> timeBlockList = this.timeBlockRepo.findAll();
        timeBlockRepo.deleteAll(timeBlockList);
    }

    public TimeBlock updateBlock(TimeBlock timeBlock){
        return timeBlockRepo.save(timeBlock);
    }
}
