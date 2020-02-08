package Beans;

import Entities.Point;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import java.sql.*;
import java.util.LinkedList;

public class DBManager {
    public static final int serialVersionUID = 11;
    private Connection connectToDB() throws NamingException, SQLException {

        InitialContext ctx = new InitialContext();
        DataSource ds = (DataSource) ctx.lookup("java:jboss/datasources/DataSourceEx");
        Connection connection = ds.getConnection();
        Statement st = connection.createStatement();
        String sql = "create table if not exists s265076.points\n" +
                "(\n" +
                "    x double precision,\n" +
                "    y double precision,\n" +
                "    r double precision,\n" +
                "    included text\n" +
                ");";
        st.execute(sql);
        System.out.println("connected an created");
        return connection;
    }

    public void addPoint(Point point) throws SQLException, NamingException {
        Connection connection = connectToDB();
        String sql = "insert into s265076.points (x, y, r, included) VALUES (?,?,?,?)";
        PreparedStatement statement = connection.prepareStatement(sql);
        statement.setDouble(1,point.getX());
        statement.setDouble(2, point.getY());
        statement.setDouble(3, point.getR()/100);
        statement.setBoolean(4, point.isIncluded());
        statement.executeUpdate();
        System.out.println("added");
        connection.close();
    }

    public LinkedList<Point> getDbPoints() throws SQLException, NamingException {
        Connection connection = connectToDB();
        LinkedList<Point> points = new LinkedList<>();
        String sql = "select * from s265076.points;";
        Statement statement = connection.createStatement();
        ResultSet set = statement.executeQuery(sql);
        while (set.next()){
            Point point = new Point();
            point.setX(Double.parseDouble(set.getString("x")));
            point.setY(Double.parseDouble(set.getString("y")));
            point.setR(Double.parseDouble(set.getString("r"))*100);
            point.setIncluded(set.getBoolean("included"));
            points.add(point);
        }
        return points;
    }
}
