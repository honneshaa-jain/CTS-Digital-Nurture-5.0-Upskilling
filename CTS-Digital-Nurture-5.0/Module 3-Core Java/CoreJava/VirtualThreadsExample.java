public class VirtualThreadsExample {

    public static void main(String[] args) throws Exception {

        for (int i = 1; i <= 1000; i++) {

            int num = i;

            new Thread(() ->
                System.out.println("Thread " + num)
            ).start();
        }

        Thread.sleep(5000);
    }
}