package com.example.sbdemo.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @author Ting on 2019-05-28.
 */
public class TimeUtil {
    /**
     * 格式：默认
     */
    public static final String FORMAT_DEFAULT = "yyyy-MM-dd HH:mm:ss";
    /**
     * 格式：日期
     */
    public static final String FORMAT_DATE = "yyyy-MM-dd";
    /**
     * 格式：时间
     */
    public static final String FORMAT_TIME = "HH:mm:ss";
    /**
     * 格式：时间戳
     */
    public static final String FORMAT_STAMP = "yyyyMMddHHmmssSSS";

    /**
     * 时间单位：毫秒
     */
    public static final int MILLISECOND = Calendar.MILLISECOND;
    /**
     * 时间单位：秒
     */
    public static final int SECOND = Calendar.SECOND;
    /**
     * 时间单位：分
     */
    public static final int MINUTE = Calendar.MINUTE;
    /**
     * 时间单位：小时
     */
    public static final int HOUR = Calendar.HOUR_OF_DAY;
    /**
     * 时间单位：天
     */
    public static final int DAY = Calendar.DAY_OF_MONTH;
    /**
     * 时间单位：月
     */
    public static final int MONTH = Calendar.MONTH;
    /**
     * 时间单位：年
     */
    public static final int YEAR = Calendar.YEAR;

    /**
     * 毫秒数：1秒
     */
    public static final int MILLS_SECOND = 1000;
    /**
     * 毫秒数：1分钟
     */
    public static final int MILLS_MINUTE = 60 * 1000;
    /**
     * 毫秒数：半小时
     */
    public static final int MILLS_HALF_HOUR = 30 * 60 * 1000;
    /**
     * 毫秒数：1小时
     */
    public static final int MILLS_HOUR = 60 * 60 * 1000;
    /**
     * 毫秒数：24小时
     */
    public static final int MILLS_DAY = 24 * 60 * 60 * 1000;

    /**
     * 秒：1秒
     */
    public static final int SECOND_ONE = 1;
    /**
     * 秒：1分钟
     */
    public static final int SECOND_MINUTE = 60;
    /**
     * 秒：1小时
     */
    public static final int SECOND_HOUR = 60 * 60;
    /**
     * 秒：1天
     */
    public static final int SECOND_DAY = 24 * 60 * 60;
    /**
     * 秒：1个月
     */
    public static final int SECOND_MONTH = 30 * 24 * 60 * 60;

    // 今天、昨天、明天

    /**
     * 当前时间：默认格式
     *
     * @return
     */
    public static String now() {
        return now(FORMAT_DEFAULT);
    }

    /**
     * 当前时间，指定格式
     *
     * @param format
     * @return
     */
    public static String now(String format) {
        return formatDate(new Date(), format);
    }

    /**
     * 昨天，yyyy-MM-dd
     *
     * @return
     */
    public static String yesterday() {
        return yesterday(FORMAT_DEFAULT);
    }

    /**
     * 昨天，format
     *
     * @return
     */
    public static String yesterday(String format) {
        return formatDate(addTime(DAY, -1), format);
    }

    /**
     * 明天
     *
     * @return
     */
    public static String tomorrow() {
        return tomorrow(FORMAT_DEFAULT);
    }

    /**
     * 明天
     *
     * @param format
     * @return
     */
    public static String tomorrow(String format) {
        return formatDate(addTime(DAY, 1), format);
    }

    // 获取当前年份

    /**
     * 获取当前年份
     *
     * @return
     */
    public static int thisYear() {
        Calendar calendar = getCalendar();
        return calendar.get(Calendar.YEAR);
    }

    /**
     * 获取num年前的年份
     *
     * @param num
     * @return
     */
    public static int beforeYear(int num) {
        return afterYear(-num);
    }

    /**
     * 获取num年后的年份
     *
     * @param num
     * @return
     */
    public static int afterYear(int num) {
        Calendar calendar = getCalendar();
        calendar.add(Calendar.YEAR, num);
        return calendar.get(Calendar.YEAR);
    }

    // 当月、上月、下月

    /**
     * 这个月的第一天
     *
     * @return
     */
    public static String firstDayOfMonth() {
        return firstDayOfMonth(FORMAT_DATE);
    }

    /**
     * 这个月的第一天
     *
     * @param format
     * @return
     */
    public static String firstDayOfMonth(String format) {
        return formatDate(firstDay(), format);
    }

    /**
     * 这个月的最后一天
     *
     * @return
     */
    public static String lastDayOfMonth() {
        return lastDayOfMonth(FORMAT_DATE);
    }

    /**
     * 这个与的最后一天
     *
     * @param format
     * @return
     */
    public static String lastDayOfMonth(String format) {
        return formatDate(lastDay(), format);
    }

    /**
     * 上个月的最后一天
     *
     * @return
     */
    public static String firstDayOfPrevMonth() {
        return firstDayOfPrevMonth(FORMAT_DATE);
    }

    /**
     * 上个月的最后一天
     *
     * @param format
     * @return
     */
    public static String firstDayOfPrevMonth(String format) {
        return formatDate(firstDay(addMonth(-1)), format);
    }

    /**
     * 上个月的最后一天
     *
     * @return
     */
    public static String lastDayOfPrevMonth() {
        return lastDayOfPrevMonth(FORMAT_DATE);
    }

    /**
     * 上个月的最后一天
     *
     * @param format
     * @return
     */
    public static String lastDayOfPrevMonth(String format) {
        return formatDate(lastDay(addMonth(-1)), format);
    }

    /**
     * 下个月的第一天
     *
     * @return
     */
    public static String firstDayOfNextMonth() {
        return firstDayOfNextMonth(FORMAT_DATE);
    }

    /**
     * 下个月的第一天
     *
     * @param format
     * @return
     */
    public static String firstDayOfNextMonth(String format) {
        return formatDate(firstDay(addMonth(1)), format);
    }

    /**
     * 下个月的最后一天
     *
     * @return
     */
    public static String lastDayOfNextMonth() {
        return lastDayOfNextMonth(FORMAT_DATE);
    }

    /**
     * 下个月的最后一天
     *
     * @param format
     * @return
     */
    public static String lastDayOfNextMonth(String format) {
        return formatDate(lastDay(addMonth(1)), format);
    }

    // 本周、上周、下周（周一：num=1，一周范围：周日-周六）

    /**
     * 周一
     *
     * @return
     */
    public static String monday() {
        return week(1);
    }

    /**
     * 这周五
     *
     * @return
     */
    public static String friday() {
        return week(5);
    }

    /**
     * 周日
     *
     * @return
     */
    public static String sunday() {
        return week(7);
    }

    /**
     * 上周一
     *
     * @return
     */
    public static String mondyOfPrevWeek() {
        return prevWeek(1);
    }

    /**
     * 上周五
     *
     * @return
     */
    public static String fridayOfPrevWeek() {
        return prevWeek(5);
    }

    /**
     * 上周日
     *
     * @return
     */
    public static String sundayOfPrevWeek() {
        return prevWeek(7);
    }

    /**
     * 下周一
     *
     * @return
     */
    public static String mondayOfNextWeek() {
        return nextWeek(1);
    }

    /**
     * 下周五
     *
     * @return
     */
    public static String fridayOfNextWeek() {
        return nextWeek(5);
    }

    /**
     * 下周日
     *
     * @return
     */
    public static String sundayOfNextWeek() {
        return nextWeek(7);
    }

    /**
     * 获取这周的第几天
     *
     * @param num
     * @return
     */
    public static String week(int num) {
        num = num + 1;
        Calendar calendar = getCalendar();
        setTime(calendar, Calendar.DAY_OF_WEEK, num);
        return formatDate(calendar.getTime(), FORMAT_DATE);
    }

    public static String week(Date date, int num) {
        num = num + 1;
        Calendar calendar = getCalendar(date);
        setTime(calendar, Calendar.DAY_OF_WEEK, num);
        return formatDate(calendar.getTime(), FORMAT_DATE);
    }

    /**
     * 上周的周几
     *
     * @param num
     * @return
     */
    public static String prevWeek(int num) {
        num = num + 1;
        Calendar calendar = getCalendar();
        addTime(calendar, Calendar.WEEK_OF_YEAR, -1);
        setTime(calendar, Calendar.DAY_OF_WEEK, num);
        return formatDate(calendar.getTime(), FORMAT_DATE);
    }

    /**
     * 下周的周几
     *
     * @param num
     * @return
     */
    public static String nextWeek(int num) {
        num = num + 1;
        Calendar calendar = getCalendar();
        addTime(calendar, Calendar.WEEK_OF_YEAR, 1);
        setTime(calendar, Calendar.DAY_OF_WEEK, num);
        return formatDate(calendar.getTime(), FORMAT_DATE);
    }

    // 毫秒与字符串转换

    /**
     * 毫秒转换：默认格式
     *
     * @param timeMills
     * @return
     */
    public static String mills2Time(long timeMills) {
        return mills2Time(timeMills, FORMAT_DEFAULT);
    }

    /**
     * 毫秒转换：简单格式
     *
     * @param timeMills
     * @return
     */
    public static String mills2SimpleTime(long timeMills) {
        return mills2Time(timeMills, FORMAT_DATE);
    }

    /**
     * 毫秒转换
     *
     * @param timeMills
     * @param format
     * @return
     */
    public static String mills2Time(long timeMills, String format) {
        Date date = new Date(timeMills);
        return formatDate(date, format);
    }

    /**
     * 字符串转毫秒
     *
     * @param time
     * @return
     */
    public static long time2Mills(String time) {
        return time2Mills(time, FORMAT_DEFAULT);
    }

    /**
     * 字符串转毫秒
     *
     * @param time
     * @return
     */
    public static long simpleTime2Mills(String time) {
        return time2Mills(time, FORMAT_DATE);
    }

    /**
     * 字符串转毫秒
     *
     * @param time
     * @param format
     * @return
     */
    public static long time2Mills(String time, String format) {
        Date date = getTime(time, format);
        return date == null ? 0L : date.getTime();
    }

    // 时间加减

    /**
     * 秒
     *
     * @param time
     * @param num
     * @param beforeFormat
     * @param afterFormat
     * @return
     */
    public static String addSecond(String time, int num, String beforeFormat, String afterFormat) {
        return addTime(time, SECOND, num, beforeFormat, afterFormat);
    }

    /**
     * 秒
     *
     * @param time
     * @param num
     * @param format
     * @return
     */
    public static String addSecond(String time, int num, String format) {
        return addTime(time, SECOND, num, format, format);
    }

    /**
     * 秒
     *
     * @param time
     * @param num
     * @return
     */
    public static String addSecond(String time, int num) {
        return addTime(time, SECOND, num, FORMAT_DEFAULT, FORMAT_DEFAULT);
    }

    /**
     * 分钟
     *
     * @param time
     * @param num
     * @param beforeFormat
     * @param afterFormat
     * @return
     */
    public static String addMinute(String time, int num, String beforeFormat, String afterFormat) {
        return addTime(time, MINUTE, num, beforeFormat, afterFormat);
    }

    /**
     * 小时
     *
     * @param time
     * @param num
     * @param beforeFormat
     * @param afterFormat
     * @return
     */
    public static String addHour(String time, int num, String beforeFormat, String afterFormat) {
        return addTime(time, HOUR, num, beforeFormat, afterFormat);
    }

    /**
     * 天数
     *
     * @param time
     * @param num
     * @param afterFormat
     * @return
     */
    public static String addDay(String time, int num, String beforeFormat, String afterFormat) {
        return addTime(time, DAY, num, beforeFormat, afterFormat);
    }

    /**
     * 月
     *
     * @param time
     * @param num
     * @param beforeFormat
     * @param afterFormat
     * @return
     */
    public static String addMonth(String time, int num, String beforeFormat, String afterFormat) {
        return addTime(time, MONTH, num, beforeFormat, afterFormat);
    }

    /**
     * 年
     *
     * @param time
     * @param num
     * @param beforeFormat
     * @param afterFormat
     * @return
     */
    public static String addYear(String time, int num, String beforeFormat, String afterFormat) {
        return addTime(time, YEAR, num, beforeFormat, afterFormat);
    }

    /**
     * 指定类型
     *
     * @param time
     * @param type
     * @param num
     * @param beforeFormat
     * @param afterFormat
     * @return
     */
    public static String addTime(String time, int type, int num, String beforeFormat, String afterFormat) {
        return formatDate(addTime(getTime(time, beforeFormat), type, num), afterFormat);
    }

    // 时间差计算

    /**
     * 据当前时间天数
     *
     * @param time
     * @param format
     * @return
     */
    public static long betweenDaysFromNow(String time, String format) {
        return betweenFromNow(time, format, DAY);
    }

    /**
     * 据当前时间天数
     *
     * @param time
     * @return
     */
    public static long betweenDaysFromNow(String time) {
        return betweenFromNow(time, FORMAT_TIME, DAY);
    }

    /**
     * 与当前时间的时间差
     *
     * @param time
     * @return
     */
    public static long betweenFromNow(String time) {
        return betweenFromNow(time, FORMAT_TIME, MILLISECOND);
    }

    /**
     * 与当前时间的时间差
     *
     * @param time
     * @param format
     * @return
     */
    public static long betweenFromNow(String time, String format) {
        return betweenFromNow(time, format, MILLISECOND);
    }

    /**
     * 与当前时间的时间差
     *
     * @param time
     * @param returnType
     * @return
     */
    public static long betweenFromNow(String time, int returnType) {
        return betweenFromNow(time, FORMAT_TIME, returnType);
    }

    /**
     * 与当前时间的时间差
     *
     * @param time
     * @param format
     * @param returnType
     * @return
     */
    public static long betweenFromNow(String time, String format, int returnType) {
        Date endData = getTime(time, format);
        if (endData == null) {
            return 0L;
        }
        Date beginData = new Date();

        return endData.getTime() > beginData.getTime() ? between(beginData, endData, returnType) : between(endData, beginData, returnType);
    }

    /**
     * 天数差
     *
     * @param beginTime
     * @param endTime
     * @param format
     * @return
     */
    public static long betweenDays(String beginTime, String endTime, String format) {
        return between(beginTime, endTime, format, DAY);
    }

    /**
     * 天数差
     *
     * @param beginTime
     * @param endTime
     * @return
     */
    public static long betweenDays(String beginTime, String endTime) {
        return between(beginTime, endTime, FORMAT_TIME, DAY);
    }

    /**
     * 时间差，默认为秒
     *
     * @param beginTime
     * @param endTime
     * @return
     */
    public static long between(String beginTime, String endTime) {
        return between(beginTime, endTime, FORMAT_TIME, MILLISECOND);
    }

    /**
     * 时间差
     *
     * @param beginTime
     * @param endTime
     * @param returnType
     * @return
     */
    public static long between(String beginTime, String endTime, int returnType) {
        return between(beginTime, endTime, FORMAT_TIME, returnType);
    }

    /**
     * 时间差
     *
     * @param beginTime
     * @param endTime
     * @param format
     * @param returnType
     * @return
     */
    public static long between(String beginTime, String endTime, String format, int returnType) {
        Date beginDate = getTime(beginTime, format);
        Date endDate = getTime(endTime, format);
        if (beginDate == null || endDate == null) {
            return 0L;
        }
        return beginDate.getTime() <= endDate.getTime() ? between(beginDate, endDate, returnType) : between(endDate, beginDate, returnType);
    }

    /**
     * 时间差
     *
     * @param beginDate
     * @param endDate
     * @param returnType
     * @return
     */
    private static long between(Date beginDate, Date endDate, int returnType) {
        long differMills = between(beginDate, endDate);
        switch (returnType) {
            case YEAR:
                return betweenByField(beginDate, endDate, Calendar.YEAR);
            case MONTH:
                return betweenByField(beginDate, endDate, Calendar.YEAR) * 12 + betweenByField(beginDate, endDate, Calendar.MONTH);
            case DAY:
                return differMills / MILLS_DAY;
            case HOUR:
                return differMills / MILLS_HOUR;
            case MINUTE:
                return differMills / MILLS_MINUTE;
            case SECOND:
                return differMills / MILLS_SECOND;
            case MILLISECOND:
                return differMills;
            default:
                return 0;
        }
    }

    /**
     * 时间差
     *
     * @param beginDate
     * @param endDate
     * @return
     */
    private static long between(Date beginDate, Date endDate) {
        if (beginDate == null || endDate == null) {
            return 0L;
        }

        return endDate.getTime() - beginDate.getTime();
    }

    /**
     * 时间差，年、月
     *
     * @param beginDate
     * @param endDate
     * @param field
     * @return
     */
    private static long betweenByField(Date beginDate, Date endDate, int field) {
        if (beginDate == null || endDate == null) {
            return 0L;
        }

        Calendar beginCalendar = Calendar.getInstance();
        beginCalendar.setTime(beginDate);
        Calendar endCalendar = Calendar.getInstance();
        endCalendar.setTime(endDate);
        return endCalendar.get(field) - beginCalendar.get(field);
    }

    // 时间格式化

    /**
     * 默认格式化时间
     *
     * @param date
     * @return
     */
    private static String defaultFormatDate(Date date) {
        return formatDate(date, FORMAT_DEFAULT);
    }

    /**
     * 日期格式化时间
     *
     * @param date
     * @return
     */
    private static String dateFormateDate(Date date) {
        return formatDate(date, FORMAT_DATE);
    }

    /**
     * 格式化时间
     *
     * @param date
     * @param format
     * @return
     */
    private static String formatDate(Date date, String format) {
        if (date == null) {
            return null;
        }

        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.format(date);
    }

    /**
     * 格式化时间（毫秒）
     *
     * @param timeMills
     * @param format
     * @return
     */
    private static String formatData(long timeMills, String format) {
        Date date = new Date(timeMills);
        return formatDate(date, format);
    }

    // 格式化时间转换date

    /**
     * 转换成date
     *
     * @param time
     * @param format
     * @return
     */
    public static Date getTime(String time, String format) {
        try {
            return new SimpleDateFormat(format).parse(time);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Date getTime(String time) {
        return getTime(time, FORMAT_DEFAULT);
    }

    public static Date getTimeWithDate(String time) {
        return getTime(time, FORMAT_DATE);
    }

    /**
     * 时间格式转换
     *
     * @param time
     * @param beforeFormat
     * @param format
     * @return
     */
    public static String formatConvert(String time, String beforeFormat, String format) {
        Date date = getTime(time, beforeFormat);
        return formatDate(date, format);
    }

    // 时间加减

    /**
     * 加减：年
     *
     * @param date
     * @param num
     * @return
     */
    public static Date addYear(Date date, int num) {
        return addTime(date, YEAR, num);
    }

    public static Date addYear(int num) {
        return addYear(new Date(), num);
    }

    public static Date addMonth(Date date, int num) {
        return addTime(date, MONTH, num);
    }

    public static Date addMonth(int num) {
        return addMonth(new Date(), num);
    }

    public static Date addDay(Date date, int num) {
        return addTime(date, DAY, num);
    }

    public static Date addDay(int num) {
        return addDay(new Date(), num);
    }

    public static Date addHour(Date date, int num) {
        return addTime(date, HOUR, num);
    }

    public static Date addHour(int num) {
        return addHour(new Date(), num);
    }

    public static Date addMinute(Date date, int num) {
        return addTime(date, MINUTE, num);
    }

    public static Date addMinute(int num) {
        return addMinute(new Date(), num);
    }

    public static Date addSecond(Date date, int num) {
        return addTime(date, SECOND, num);
    }

    public static Date addSecond(int num) {
        return addSecond(new Date(), num);
    }

    /**
     * 时间加减
     *
     * @param date
     * @param type
     * @param num
     * @return
     */
    public static Date addTime(Date date, int type, int num) {
        if (date == null) {
            return null;
        }
        try {
            Calendar calendar = getCalendar(date);
            addTime(calendar, type, num);
            return calendar.getTime();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static Date addTime(int type, int num) {
        return addTime(new Date(), type, num);
    }

    // 时间设置

    /**
     * 第一天
     *
     * @param date
     * @return
     */
    public static Date firstDay(Date date) {
        if (date == null) {
            return null;
        }

        try {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.set(Calendar.DATE, 1);
            return calendar.getTime();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    public static Date firstDay() {
        return firstDay(new Date());
    }

    /**
     * 最后一天
     *
     * @param date
     * @return
     */
    public static Date lastDay(Date date) {
        if (date == null) {
            return null;
        }

        try {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DATE));
            return calendar.getTime();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static Date lastDay() {
        return lastDay(new Date());
    }

    /**
     * 一天的开始时间
     *
     * @param date
     * @return
     */
    public static Date beginDay(Date date) {
        Calendar calendar = getCalendar(date);
        return null;
    }

    /**
     * 一天的结束时间
     *
     * @param date
     * @return
     */
    public static Date endDay(Date date) {
        return null;
    }

    // calendar操作

    /**
     * 获取calendar
     *
     * @param date
     * @return
     */
    public static Calendar getCalendar(Date date) {
        if (date == null) {
            return null;
        }

        try {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            return calendar;
        } catch (Exception e) {
            return null;
        }
    }

    public static Calendar getCalendar() {
        return getCalendar(new Date());
    }

    public static void firstDay(Calendar calendar) {
        setTime(calendar, Calendar.DATE, 1);
    }

    public static void lastDay(Calendar calendar) {
        setMaxTime(calendar, Calendar.DATE);
    }

    public static void setTime(Calendar calendar, int type, int num) {
        if (calendar == null) {
            return;
        }
        calendar.set(type, num);
    }

    public static void setMaxTime(Calendar calendar, int type) {
        if (calendar == null) {
            return;
        }
        calendar.set(type, calendar.getActualMaximum(type));
    }

    public static void addDay(Calendar calendar, int num) {
        addTime(calendar, DAY, num);
    }

    public static void addMonth(Calendar calendar, int num) {
        addTime(calendar, MONTH, num);
    }

    public static void addYear(Calendar calendar, int num) {
        addTime(calendar, YEAR, num);
    }

    public static void addTime(Calendar calendar, int type, int num) {
        if (calendar == null) {
            return;
        }

        calendar.add(type, num);
    }

    // 时间格式校验

    /**
     * 时间格式是否正确
     *
     * @param time
     * @param format
     * @return
     */
    public static boolean isTimeFormat(String time, String format) {
        return getTime(time, format) != null;
    }

    /**
     * 时间格式是否正确，且时间是今天
     *
     * @param time
     * @param format
     * @return
     */
    public static boolean isTimeToday(String time, String format) {
        long days = betweenFromNow(time, format, DAY);
        return days == 0;
    }

    public static void main(String[] args) {
        System.out.println(System.currentTimeMillis());
// System.out.println(System.currentTimeMillis());
// System.out.println(now("yyyyMMddHHmmssSSS") + ".pdf");
        System.out.println(mills2Time(1546426176746L));
    }

    // 获取部分日期

    /**
     * 从时间错获取年份
     *
     * @param timestamp
     * @return
     */
    public static int getYear(long timestamp) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date(timestamp));
        return calendar.get(Calendar.YEAR);
    }

    /**
     * 从时间戳获取月份
     *
     * @param timestamp
     * @return
     */
    public static int getMonth(long timestamp) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date(timestamp));
        return calendar.get(Calendar.MONTH) + 1;
    }

    /**
     * 获取星期几
     *
     * @param date
     * @return
     */
    public static String getDayOfWeekByDate(String date) {
        String dayOfweek = "-1";
        try {
            SimpleDateFormat myFormatter = new SimpleDateFormat("yyyy-MM-dd");
            Date myDate = myFormatter.parse(date);
            SimpleDateFormat formatter = new SimpleDateFormat("E");
            String str = formatter.format(myDate);
            dayOfweek = str;

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return dayOfweek;
    }

    /**
     * 获取上月考勤月
     *
     * @param checkMonth
     * @return
     */
    public static String getLastCheckMonth(String checkMonth) {
        String[] date = checkMonth.split("-");
        int year = Integer.valueOf(date[0]);
        int month = Integer.valueOf(date[1]);
        if (month == 1) {
            year = year - 1;
            return year + "-12";
        } else {
            month = month - 1;
            return year + (month > 9 ? "-" : "-0") + month;
        }
    }

}
