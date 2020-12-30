package com.example.sbdemo.mapper;

import com.example.sbdemo.entity.DocumentMonthRecord;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface DocumentMonthRecordMapper {


    @Select("SELECT * FROM document_month_record WHERE year = #{year} AND month = #{month} LIMIT 1")
    DocumentMonthRecord findOneByIds(int year, int month);

    @Select("SELECT * FROM document_month_record ORDER BY create_time DESC LIMIT 6")
    List<DocumentMonthRecord> findAllForRecord();

}
