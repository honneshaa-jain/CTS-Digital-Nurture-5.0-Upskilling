import java.util.List;

record Person(
    String name,
    int age
) {}

public class RecordsExample {

    public static void main(String[] args) {

        List<Person> persons =
            List.of(
                new Person("John", 25),
                new Person("David", 17),
                new Person("Emma", 30)
            );

        System.out.println(
            "All Persons:"
        );

        persons.forEach(
            System.out::println
        );

        System.out.println(
            "\nAge >= 18:"
        );

        persons.stream()
               .filter(
                   p -> p.age() >= 18
               )
               .forEach(
                   System.out::println
               );
    }
}