import java.sql.*;

public class TransactionHandling {

    public static void main(String[] args) {

        String url =
            "jdbc:mysql://localhost:3306/bankdb";

        String user = "root";
        String password = "root";

        try {

            Connection con =
                DriverManager.getConnection(
                    url, user, password
                );

            con.setAutoCommit(false);

            PreparedStatement debit =
                con.prepareStatement(
                    "UPDATE accounts SET balance=balance-500 WHERE id=1"
                );

            PreparedStatement credit =
                con.prepareStatement(
                    "UPDATE accounts SET balance=balance+500 WHERE id=2"
                );

            debit.executeUpdate();
            credit.executeUpdate();

            con.commit();

            System.out.println(
                "Transaction Successful"
            );

            con.close();

        } catch(Exception e) {

            System.out.println(
                "Transaction Failed"
            );

            e.printStackTrace();
        }
    }
}