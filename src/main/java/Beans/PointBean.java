package Beans;

import Entities.Point;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.SessionScoped;
import javax.naming.NamingException;
import java.io.Serializable;
import java.sql.*;
import java.util.LinkedList;


@ManagedBean
@SessionScoped
public class PointBean implements Serializable {
    public static final int serialVersionUID = 1;
    private Point point;
    @ManagedProperty(value = "#{DBManager}")
    private DBManager DBManager;


    public DBManager getDBManager() {
        return DBManager;
    }

    public void setDBManager(DBManager DBManager) {
        this.DBManager = DBManager;
    }

    private LinkedList<Point> points = new LinkedList<>();


    public PointBean() {
        this.point = new Point();

    }


    public void setX(double x) {
        point.setX(x);
    }

    public void setY(String y) {
        point.setY(Double.parseDouble(y));
    }

    public void setR(double r) {
        point.setR(r);
    }

    public boolean getIncluded() {
        return point.isIncluded();
    }

    public double getX() {
        return point.getX();
    }

    public String getY() {
        return String.valueOf(point.getY());
    }

    public double getR() {
        return point.getR();
    }

    public LinkedList<Point> getPoints() {
        return points;
    }

    public void checkArea() {
        double x = point.getX();
        double y = point.getY();
        double r = point.getR() / 100;
        if (x <= 0 && y >= 0 && y <= x + r / 2) point.setIncluded(true);
        else if (x >= 0 && y >= 0 && x <= r && y <= r) point.setIncluded(true);
        else if (x >= 0 && y <= 0 && y >= -Math.sqrt(r * r - x * x)) point.setIncluded(true);
        else point.setIncluded(false);
        savePoint(x, y, r);

    }


    public void savePoint(double x, double y, double r) {
        points.add(point);
        try {
            DBManager.addPoint(point);
        } catch (SQLException | NamingException e) {
            e.printStackTrace();
        }
        point = new Point(x, y, r * 100);
    }


    public void removePoints() {
        points = new LinkedList<Point>();
    }

    public void downloadPoints(){
        try {
            points = DBManager.getDbPoints();
        } catch (SQLException | NamingException e) {
            e.printStackTrace();
        }
    }





}
