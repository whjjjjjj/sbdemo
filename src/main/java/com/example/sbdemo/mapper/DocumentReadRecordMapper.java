package com.example.sbdemo.mapper;

import com.example.sbdemo.ext.bean.ReadRecord;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface DocumentReadRecordMapper {

    @Select("SELECT d.document_name, drr.document_id, count(drr.document_id) AS sum FROM document_read_record drr\n" +
            "    LEFT JOIN document d ON d.document_id = drr.document_id\n" +
            "    group by document_id ORDER BY sum DESC LIMIT 10")
    List<ReadRecord> findTopSum();
}
