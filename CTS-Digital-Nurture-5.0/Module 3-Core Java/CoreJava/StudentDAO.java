import java.sql.*;

public class StudentDAO {

    static final String URL =
        "jdbc:mysql://localhost:3306/studentdb";

    static final String USER = "root";
    static final String PASSWORD = "root";

    public void insertStudent(
        int id,
        String name
    ) {

        try {

            Connection con =
                DriverManager.getConnection(
                    URL, USER, PASSWORD
                );

            String sql =
                "INSERT INTO students VALUES (?, ?)";

            PreparedStatement ps =
                con.prepareStatement(sql);

            ps.setInt(1, id);
            ps.setString(2, name);

            ps.executeUpdate();

            System.out.println(
                "Record Inserted"
            );

            con.close();

        } catch(Exception e) {

            System.out.println(e);
        }
    }

    public void updateStudent(
        int id,
        String name
    ) {

        try {

            Connection con =
                DriverManager.getConnection(
                    URL, USER, PASSWORD
                );

            String sql =
                "UPDATE students SET name=? WHERE id=?";

            PreparedStatement ps =
                con.prepareStatement(sql);

            ps.setString(1, name);
            ps.setInt(2, id);

            ps.executeUpdate();

            System.out.println(
                "Record Updated"
            );

            con.close();

        } catch(Exception e) {

            System.out.println(e);
        }
    }

    public static void main(String[] args) {

        StudentDAO dao =
            new StudentDAO();

        dao.insertStudent(
            101,
            "John"
        );

        dao.updateStudent(
            101,
            "David"
        );
    }
}