package com.jack.timely;

import com.jack.timely.model.TimeBlock;
import com.jack.timely.service.TimeBlockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.List;

@RestController
@RequestMapping("/timeblock")
public class TimeBlockResource {
    private final TimeBlockService timeBlockService;


    public TimeBlockResource(TimeBlockService timeBlockService) {
        this.timeBlockService = timeBlockService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TimeBlock>> getAllTimeBlocks() {
        List<TimeBlock> timeBlockList = timeBlockService.findAllBlocks();
        return new ResponseEntity<>(timeBlockList, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<TimeBlock> getTimeBlockById(@PathVariable("id") Long id) {
        TimeBlock tb = timeBlockService.findById(id);
        return new ResponseEntity<>(tb, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<TimeBlock> createTimeBlock(@RequestBody TimeBlock timeBlock) {
        timeBlock.setStartTime(new Timestamp(Calendar.getInstance().getTime().getTime()));
        TimeBlock tb = timeBlockService.createTimeBlock(timeBlock);
        return new ResponseEntity<>(tb, HttpStatus.CREATED);
    }

    @PutMapping("/end")
    public ResponseEntity<TimeBlock> endTimeBlock(@RequestBody TimeBlock timeBlock){
        System.out.println(timeBlock);
        timeBlock.setEndTime(new Timestamp(Calendar.getInstance().getTime().getTime()));
        TimeBlock tb = timeBlockService.updateTimeBlock(timeBlock);
        return new ResponseEntity<>(tb, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<TimeBlock> updateTimeBlock(@RequestBody TimeBlock timeBlock) {
        TimeBlock tb = timeBlockService.updateTimeBlock(timeBlock);
        return new ResponseEntity<>(tb, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<TimeBlock> deleteTimeBlock(@PathVariable("id") Long id) {
        timeBlockService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<TimeBlock> deleteTimeBlock() {
        timeBlockService.deleteAllTimeBlock();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
