public class BytecodeExample {

    public void display() {

        System.out.println(
            "Hello Bytecode"
        );
    }

    public static void main(
        String[] args
    ) {

        new BytecodeExample()
            .display();
    }
}