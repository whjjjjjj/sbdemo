package com.example.sbdemo.mapper;

import com.example.sbdemo.entity.Department;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

public interface DepartmentMapper {

//    @Select("<script>" +
//            "SELECT * FROM document" +
//            "WHERE status = 1 " +
//            "<when test= 'parentCode!='null'> AND parentCode = #{parentCode}<WHEN>" )
//    List<Department> findAll();

    @Select("SELECT * FROM department WHERE status = 1")
    List<Department> findAll();

    @Select("SELECT * FROM department WHERE status = 1 AND parent_code = #{parentCode}")
    List<Department> findAllByParentId(String parentCode);

    @Select("SELECT * FROM department WHERE status = 1 AND department_id = #{departmentId} LIMIT 1 ORDER BY level ASC")
    Department findOneById(Long departmentId);

    @Select("SELECT * FROM department WHERE status = 1 AND department_code = #{departmentCode} LIMIT 1 ORDER BY level ASC")
    Department findOneByCode(String departmentCode);

    @Update("<script>" +
            "UPDATE department SET status = 0" +
            "WHERE department_id IN(" +
            "<foreach collection='ids' separator=',' item='id'>" +
            "#{id}" +
            "</foreach>" +
            ")</script>")
    int delChild(List<Long> ids);
}
