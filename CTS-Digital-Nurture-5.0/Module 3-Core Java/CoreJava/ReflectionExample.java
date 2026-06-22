import java.lang.reflect.Method;

class Test {

    public void show() {

        System.out.println(
            "Reflection Method Called"
        );
    }
}

public class ReflectionExample {

    public static void main(
        String[] args
    ) throws Exception {

        Class<?> cls =
            Class.forName("Test");

        Object obj =
            cls.getDeclaredConstructor()
               .newInstance();

        Method[] methods =
            cls.getDeclaredMethods();

        for(Method m : methods) {

            System.out.println(
                "Method: "
                + m.getName()
            );

            m.invoke(obj);
        }
    }
}