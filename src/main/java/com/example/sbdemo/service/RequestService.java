package com.example.sbdemo.service;

import com.example.sbdemo.entity.RequestRecord;
import com.example.sbdemo.mapper.RequestRecordMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    @Autowired
    private RequestRecordMapper requestRecordMapper;

    public PageInfo pageList(String keyword, Long userId, Integer pageNumber, Integer pageSize) {
        List<RequestRecord> list = requestRecordMapper.findById(keyword, userId);

        PageHelper.startPage(pageNumber, pageSize);
        PageInfo<RequestRecord> pageInfo = new PageInfo(list);
        return pageInfo;
    }

    public boolean examine(Long requestId, Integer examineStatus, String examineRemarks) {
        RequestRecord requestRecord = requestRecordMapper.findOneById(requestId);
        requestRecord.setExamineStatus(examineStatus);
        requestRecord.setExamineRemarks(examineRemarks);
        requestRecord.setExamineTime(System.currentTimeMillis());
        return requestRecordMapper.updateExamine(requestRecord) > 0;
    }
}
