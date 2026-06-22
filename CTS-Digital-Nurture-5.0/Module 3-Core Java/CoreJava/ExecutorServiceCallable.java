import java.util.concurrent.*;

public class ExecutorServiceCallable {

    public static void main(
        String[] args
    ) throws Exception {

        ExecutorService service =
            Executors.newFixedThreadPool(3);

        Callable<Integer> task1 =
            () -> 10 + 20;

        Callable<Integer> task2 =
            () -> 30 + 40;

        Future<Integer> result1 =
            service.submit(task1);

        Future<Integer> result2 =
            service.submit(task2);

        System.out.println(
            "Result 1 = "
            + result1.get()
        );

        System.out.println(
            "Result 2 = "
            + result2.get()
        );

        service.shutdown();
    }
}