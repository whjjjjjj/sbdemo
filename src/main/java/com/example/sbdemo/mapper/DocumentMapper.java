package com.example.sbdemo.mapper;

import com.example.sbdemo.entity.Document;
import com.example.sbdemo.ext.bean.Sum;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface DocumentMapper {

    @Update("UPDATE document SET status = 0 WHERE document_id = #{documentId}")
    int deleteById(Long documentId);

    @Update("<script>" +
            " UPDATE document SET document_permission = #para(permission)\n" +
            "    <when test= 'name'!= 'null'> ,document_name = #{name}</when>" +
            "    WHERE document_id = #{documentId}" +
            "</script>")
    int change(Long documentId, Integer permission, String name);

    @Select("SELECT * FROM document WHERE document_id = #{documentId} AND status = 1 LIMIT 1")
    Document findOneById(Long documentId);

    @Select("<script>" +
            "SELECT * FROM document WHERE document_id in (" +
            "<foreach collection='ids' separator=',' item='id'>" +
            "#{id}" +
            "</foreach>" +
            "    )</script>")
    List<Document> findByIds(String[] ids);

    @Select("SELECT * FROM document WHERE status = 1 AND document_name = #{documentName}")
    Document findOneByName(String documentName);

    @Select("SELECT document_type, count(document_type) AS sum FROM document GROUP BY document_type ORDER BY sum DESC LIMIT 6")
    List<Sum> findAllTypeForRecord();

    @Update("<script>" +
            "UPDATE document SET status = #{status} WHERE document_id IN (" +
            "<foreach collection='ids' separator=',' item='id'>" +
            "#{id}" +
            "</foreach>" +
            ")<script>")
    int updateStatus(int status, String[] ids);
}
