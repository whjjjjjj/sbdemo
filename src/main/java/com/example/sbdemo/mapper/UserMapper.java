package com.example.sbdemo.mapper;

import com.example.sbdemo.entity.Department;
import com.example.sbdemo.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

public interface UserMapper {

    @Select("<script>" +
            "SELECT * FROM user WHERE status = 1 " +
            "<when test= 'departments'!= 'null>" +
            "<foreach collection='departments' separator=',' item='department'>" +
            "#{department}" +
            "</foreach>" +
            "</when>'" +
            "</script>")
    List<User> findAll(List<Long> departments);


    @Select("SELECT * FROM user WHERE user_id = #{id} AND status = 1 LIMIT 1")
    User findOneById(Long userId);

    @Select("SELECT * FROM user WHERE user_username = #{username} AND status = 1 LIMIT 1")
    User findOneByName(String username);

    @Select("SELECT * FROM user WHERE show_id = #{showId} AND status = 1")
    User findOneByShowId(String showId);

    @Select("SELECT * FROM user " +
            "WHERE user_id = #{userId} AND status = 1 LIMIT 1")
    @Results({
            @Result(property = "department" , column = "department_id",
                    one = @One(select = "com.example.sbdemo.mapper.UserMapper.findD" ))
    })
    User findDepartmentCodeById(Long userId);

    @Select("SELECT * FROM department WHERE department_id = #{departmentId} AND status = 1 LIMIT 1")
    Department findD(Long departmentId);

    @Update("UPDATE user SET department_id = #{departmentId} WHERE user_id = #{userId} AND status = 1")
    int updateUserDepartment(User user);

    @Update("UPDATE user SET user_password = #{userPassword} AND user_salt = #{userSalt} WHERE user_id = #{userId} AND status = 1")
    int updateUserPwd(User user);

    @Update("UPDATE user SET status = #{status} WHERE user_id = #{userId}")
    int updateUserState(User user);

    @Update("UPDATE user SET role_id = #{roleId} WHERE user_id = #{userId} AND status = 1")
    int updateUserRole(User user);

    @Insert("INSERT INTO user (show_id, user_name, user_username, user_telephone, user_password, user_salt, role_id, status) VALUES (#{showId}, #{userName}, #{userUserName}" +
            ",#{userTelephone}, #{userPassword}, #{userSalt}, #{roleId}, #{status}")
    int insertUser(User user);
}
