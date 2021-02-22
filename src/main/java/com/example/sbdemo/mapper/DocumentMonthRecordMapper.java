package com.example.sbdemo.mapper;

import com.example.sbdemo.entity.DocumentMonthRecord;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface DocumentMonthRecordMapper {


    @Select("SELECT * FROM document_month_record WHERE year = #{year} AND month = #{month} LIMIT 1")
    DocumentMonthRecord findOneByIds(int year, int month);

    @Select("SELECT * FROM document_month_record ORDER BY create_time DESC LIMIT 6")
    List<DocumentMonthRecord> findAllForRecord();

    @Insert("INSERT INTO document_month_record (year, month, upload_sum, read_sum, create_time) VALUES (" +
            "#{year}, #{month}, #{uploadSum}, #{readSum}, #{createTime}")
    int insertMonthRecord(DocumentMonthRecord monthRecord);

    @Update("UPDATE document_month_record SET read_sum = #{readSum} WHERE month_id = #{monthId}")
    int updateMonthRecordReadSum(DocumentMonthRecord monthRecord);
}
