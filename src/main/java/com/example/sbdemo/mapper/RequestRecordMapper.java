package com.example.sbdemo.mapper;

import com.example.sbdemo.entity.RequestRecord;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface RequestRecordMapper {


    @Select("SELECT * FROM request_record WHERE user_id = #{userId} AND documentId = #{documentId} LIMIT 1")
    RequestRecord findOneByIds(Long userId, Long documentId);

    @Select("SELECT * FROM request_record WHERE request_id = #{requestId} LIMIT 1 ")
    RequestRecord findOneById(Long requestId);

    @Select("<script>" +
            "SELECT d.document_name,\n" +
            "    d.document_type,\n" +
            "    d.document_size,\n" +
            "    d.document_permission,\n" +
            "    rr.user_id,\n" +
            "    rr.request_id,\n" +
            "    rr.document_id,\n" +
            "    rr.request_remarks,\n" +
            "    rr.request_time,\n" +
            "    rr.examine_time,\n" +
            "    rr.examine_remarks,\n" +
            "    rr.examine_status FROM request_record rr\n" +
            "    LEFT JOIN document d ON d.document_id = rr.document_id" +
            "    WHERE user_id = #{userId} " +
            "<WHEN test='keyword' != 'null'>" +
            "AND document_name LIKE #para('%' + #{keyword}+'%')) " +
            "</WHEN>" +
            "</script>")
    List<RequestRecord> findById(String keyword, Long userId);

    @Update("UPDATE request_record SET examine_time = #{examineTime} " +
            "AND examine_remarks = #{examineRemarks}" +
            "AND examine_status = #{examineStatus}" +
            "WHERE request_id = #{requestId}")
    int updateExamine(RequestRecord requestRecord);
}
