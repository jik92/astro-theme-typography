title: ORM Framework Mybatis
date: 2015/12/18 02:14:29
categories:
 - tryghost

tags:
 - java 



---

# Mybatis
## 最佳实践
```language-xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE sqlMap PUBLIC "-//iBATIS.com//DTD SQL Map 2.0//EN" "http://www.ibatis.com/dtd/sql-map-2.dtd">
<sqlMap namespace="KbObjProp">
    <!-- Alias Map Defined -->
    <typeAlias alias="KbObjProp" type="com.raycloud.express.commons.model.prop.KbObjProp"/>
    <resultMap id="kbObjProp" class="KbObjProp">
        <result property="id" column="id"/>
        <result property="cid" column="cid"/>
        <result property="pids" column="pids"/>
        <result property="status" column="status"/>
        <result property="nameAbbr" column="name_abbr"/>
        <result property="name" column="name"/>
        <result property="source" column="source"/>
        <result property="lock" column="lock"/>
        <result property="weight" column="weight"/>
        <result property="editor" column="editor"/>
        <result property="addTime" column="add_time"/>
        <result property="updTime" column="upd_time"/>
        <result property="propertyLevel" column="property_level"/>
        <result property="propertyGroupId" column="property_group_id"/>
    </resultMap>
    <sql id="Base_Column_List">
        id , cid , pids , status , name_abbr , name , source , `lock` , weight , editor , add_time , upd_time,property_level,property_group_id
    </sql>
        <sql id="kbObjPropList.where">
        <dynamic prepend=" WHERE ">
            <isNotNull property="id" prepend=" AND ">
                id=# id# 
            </isNotNull>
            <isNotNull property="cid" prepend=" AND ">
                cid=# cid# 
            </isNotNull>
            <isNotNull property="pids" prepend=" AND ">
                pids=# pids# 
            </isNotNull>
            <isNotNull property="status" prepend=" AND ">
                status=# status# 
            </isNotNull>
            <isNotNull property="nameAbbr" prepend=" AND ">
                name_abbr=# nameAbbr# 
            </isNotNull>
            <isNotNull property="name" prepend=" AND ">
                name=# name# 
            </isNotNull>
            <isNotNull property="source" prepend=" AND ">
                source=# source# 
            </isNotNull>
            <isNotNull property="lock" prepend=" AND ">
                `lock`=# lock# 
            </isNotNull>
            <isNotNull property="weight" prepend=" AND ">
                weight=# weight# 
            </isNotNull>
            <isNotNull property="editor" prepend=" AND ">
                editor=# editor# 
            </isNotNull>
        </dynamic>
    </sql>

     <select id="KbObjProp.getKbObjPropByName" resultMap="kbObjProp" parameterClass="hashMap">
        SELECT
        <include refid="Base_Column_List"/>
        FROM kb_obj_prop
        WHERE
        <iterate conjunction="OR" open="(" close=")" property="name" >
        (name= # name[].name#  and cid=  # name[].cid# )
        </iterate>

    </select>

    <update id="clear">
        TRUNCATE TABLE kb_obj_prop;
    </update>

    <sql id="limit">
        <dynamic prepend=" LIMIT  ">
            <isNotNull property="page">
                # page.startRow# ,# page.offsetRow# 
            </isNotNull>
        </dynamic>
    </sql>
</result>

```
page.java
```language-java
/**
 * 页码信息，startRow必须从1开始,page必须大于或者等于0
 *
 * @author ZuoYun
 */
public class Page implements Serializable {

    /**
     *
     */
    private static final long serialVersionUID = 1L;
    public final static int DEFAULT_PAGE_SIZE = 20;
    public final static int DEFAULT_PAGE_NUM = 1;
    protected Integer pageSize = DEFAULT_PAGE_SIZE;
    protected Integer startRow;//起始行
    protected Integer offsetRow;//结束行(闭合)
    protected Integer pageNo = DEFAULT_PAGE_NUM;

    public Integer getStartRow() {
        if (startRow == null) {
            setPageNo(pageNo);
        }
        return startRow;
    }

    public Page setStartRow(Integer startRow) {
        this.startRow = startRow;
        return this;
    }

    public Integer getOffsetRow() {
        if (null == offsetRow) {
            setPageNo(pageNo);
        }
        return offsetRow;
    }

    public Page setOffsetRow(Integer offsetRow) {
        this.offsetRow = offsetRow;
        return this;
    }

    public Page setPageNo(Integer page) {
        if (page == null || page < 0) page = DEFAULT_PAGE_NUM;
        this.pageNo = page;
        this.startRow = (page - 1) * this.pageSize;
        this.offsetRow = this.pageSize;
        return this;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public Page setPageSize(Integer pageSize) {
        if (pageSize == null || pageSize < 1) pageSize = 1;
        this.pageSize = pageSize;
        this.startRow = (pageNo - 1) * this.pageSize;
        this.offsetRow = this.pageSize;
        return this;
    }

    public Integer getPageNo() {
        return pageNo;
    }
}

```




