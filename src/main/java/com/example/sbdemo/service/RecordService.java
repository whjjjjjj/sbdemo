package com.example.sbdemo.service;

import com.example.sbdemo.entity.DocumentMonthRecord;
import com.example.sbdemo.entity.DocumentReadRecord;
import com.example.sbdemo.entity.User;
import com.example.sbdemo.ext.log.LogKit;
import com.example.sbdemo.mapper.DocumentMonthRecordMapper;
import com.example.sbdemo.mapper.UserMapper;
import com.example.sbdemo.util.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RecordService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    DocumentMonthRecordMapper monthMapper;

    /**
     * 查看(下载)记录保存
     *
     * @param showId
     * @param documentId
     */
    @Transactional(rollbackFor = Exception.class)
    public void downRecord(String showId, Long documentId) {
        User user = userMapper.findOneByShowId(showId);
            long timestamp = System.currentTimeMillis();
            int year = TimeUtil.getYear(timestamp);
            int month = TimeUtil.getMonth(timestamp);
            DocumentMonthRecord monthRecord = monthMapper.findOneByIds(year, month);
            if (monthRecord == null) {
                monthRecord = new DocumentMonthRecord();
                monthRecord.setYear(year);
                monthRecord.setMonth(month);
                monthRecord.setUploadSum(0);
                monthRecord.setReadSum(1);
                monthRecord.setCreateTime(System.currentTimeMillis());
                monthMapper.insertMonthRecord(monthRecord);
            } else {
                monthRecord.setReadSum(monthRecord.getReadSum() + 1);
                monthMapper.updateMonthRecordReadSum(monthRecord);
            }
            DocumentReadRecord readRecord = new DocumentReadRecord();
            readRecord.getDocument().setDocumentId(documentId);
            readRecord.setReadTime(timestamp);
            readRecord.getDocumentMonthRecord().setMonthId(monthRecord.getMonthId());
            readRecord.getUser().setUserId(user.getUserId());
            readRecord.save();
            LogKit.USER_LOG.info(user.getUserId() + "下载文件" + documentId);
    }
}
