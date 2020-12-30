package com.example.sbdemo.mapper;

import com.example.sbdemo.entity.RequestRecord;
import org.apache.ibatis.annotations.Select;

public interface RequestRecordMapper {


    @Select("SELECT * FROM request_record WHERE user_id = #{userId} AND documentId = #{documentId} LIMIT 1")
    RequestRecord findOneByIds(Long userId, Long documentId);

    @Select("SELECT * FROM request_record WHERE request_id = #{requestId} LIMIT 1 ")
    RequestRecord findOneById(Long requestId);
}
