package com.example.sbdemo.service;

import com.example.sbdemo.entity.Department;
import com.example.sbdemo.ext.bean.TreeDepartment;
import com.example.sbdemo.ext.bean.TreeSelectDepartment;
import com.example.sbdemo.ext.log.LogKit;
import com.example.sbdemo.mapper.DepartmentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentService {

    @Autowired
    DepartmentMapper departmentMapper;

    public List<TreeDepartment> sortDepartment(List<Department> list) {
        List<TreeDepartment> list1 = new ArrayList<>();
        for (Department d : list) {
            TreeDepartment treeDepartment = new TreeDepartment();
            treeDepartment.setText(d.getDepartmentName());
            treeDepartment.setTags(d.getDepartmentId().toString());
            treeDepartment.setNodes(getChildDepartment(d));
            list1.add(treeDepartment);
        }
        return list1;
    }

    /**
     * 递归查找所有子
     *
     * @param department
     * @return
     */
    public List<TreeDepartment> getChildDepartment(Department department) {

        List<Department> list = departmentMapper.findAllByParentId(department.getDepartmentCode());
        List<TreeDepartment> treeList = new ArrayList<>();

        if (list.size() != 0) {
            for (Department dd : list) {
                TreeDepartment childTreeDepartment = new TreeDepartment();
                childTreeDepartment.setTags(dd.getDepartmentId().toString());
                childTreeDepartment.setText(dd.getDepartmentName());
                childTreeDepartment.setNodes(getChildDepartment(dd));
                treeList.add(childTreeDepartment);
            }
        }
        return treeList;
    }

    public Department findOneById(Long departmentId) {
        return departmentMapper.findOneById(departmentId);
    }

    public List<Long> selectAllChildById(Long id) {
        List<String> codes = new ArrayList<>();
        List<Long> ids = new ArrayList<>();
        Department dd = departmentMapper.findOneById(id);
        List<Department> list = departmentMapper.findAll();

        codes.add(dd.getDepartmentCode());
        ids.add(dd.getDepartmentId());

        for (Department d : list) {
            if (codes.contains(d.getParentCode())) {
                codes.add(d.getDepartmentCode());
                ids.add(d.getDepartmentId());
            }
        }
        return ids;
    }

    @Transactional(rollbackFor = Exception.class)
    public boolean updateDAndChild(Department department, String oldDepartmentCode) {
        department.setStatus(1);
        if (!oldDepartmentCode.equals(department.getDepartmentCode())) {
            List<Department> list = departmentMapper.findAllByParentId(oldDepartmentCode);
            for (Department d : list) {
                d.setParentCode(d.getDepartmentCode());
                departmentMapper.updateParentCode(d);
            }
        }
        departmentMapper.updateStatus(department);
        LogKit.ADMIN_lOG.info("修改部门" + department.getDepartmentName() + "信息");
        return true;
    }

    public List<TreeSelectDepartment> findAllForSelect() {
        List<TreeSelectDepartment> list1 = new ArrayList<>();
        List<Department> list = departmentMapper.findAll();

        for (Department l : list) {
            TreeSelectDepartment treeSelectDepartment = new TreeSelectDepartment(l.getDepartmentCode(), l.getParentCode(), l.getDepartmentName());
            list1.add(treeSelectDepartment);
        }
        return list1;
    }
}
