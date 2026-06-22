import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class LambdaExpressionExample {

    public static void main(String[] args) {

        List<String> list =
            new ArrayList<>();

        list.add("Orange");
        list.add("Apple");
        list.add("Banana");
        list.add("Mango");

        Collections.sort(
            list,
            (a, b) -> a.compareTo(b)
        );

        System.out.println(
            "Sorted List:"
        );

        for(String item : list) {

            System.out.println(item);
        }
    }
}